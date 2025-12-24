# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16.1.1 frontend project using React 19, TypeScript, and styled-components. The project implements a dual-layer API architecture for interfacing with the Hahow API.

## Development Commands

```bash
# Development
npm run start:dev          # Start Next.js development server (port 3000)

# Production
npm run build              # Build for production
npm run start              # Start production server

# Linting
npm run lint               # Run ESLint
```

## Architecture

### Dual API Layer Pattern

The codebase implements a two-tier API architecture:

1. **Server-Side API Layer** (`src/lib/api-server/`)
   - Directly calls external APIs (Hahow API) from Next.js server components/API routes
   - Uses `hahowAPIAxiosInstance` configured with `process.env.HAHOW_URL`
   - Implements axios interceptors via `AxiosConfig` class
   - Functions return `AxiosResponse<T>` types

2. **Client-Side API Layer** (`src/lib/api-client/`)
   - Calls Next.js internal API routes (prefixed with `/api`)
   - Uses `nextAPIaxiosInstance` with baseURL `/api`
   - Uses native `fetch()` instead of axios
   - Functions return standardized `IBaseResponse<T>` wrapper type

3. **Next.js API Routes** (`src/app/api/`)
   - Bridge between client and server layers
   - Use server-side API functions to fetch data
   - Transform responses using `handleSuccess()` and `handleError()` utilities
   - Return JSON with consistent error handling

### API Layer Structure

```
Client Component
    ↓ (calls via fetch)
src/lib/api-client/endpoints/
    ↓ (fetches from)
src/app/api/[...route]/route.ts
    ↓ (uses)
src/lib/api-server/endpoints/
    ↓ (calls external API)
External API (Hahow)
```

### Adding New API Endpoints

When adding a new endpoint, follow this pattern:

1. **Define DTO** in `src/app/api/[path]/dto.ts`:
```typescript
import { IBaseResponse, IBaseListResult } from "@/lib/api-types/common";

export interface IYourDataItem {
  // fields
}

export type TResponse = IBaseResponse<IBaseListResult<IYourDataItem>>;
```

2. **Server-side endpoint** in `src/lib/api-server/endpoints/`:
```typescript
import ApiRequester from "@/lib/api-server/apiRequester";
import { AxiosResponse } from "axios";

export default async function yourEndpoint(): Promise<AxiosResponse<T>> {
  return ApiRequester<AxiosResponse<T>>({
    method: "get",
    url: "/your-path",
  });
}
```

3. **Export from index** in `src/lib/api-server/endpoints/index.ts`:
```typescript
export const HahowApi = {
  Heroes: {
    YourEndpoint,
  },
};
```

4. **Next.js API route** in `src/app/api/[path]/route.ts`:
```typescript
import { NextResponse } from "next/server";
import { HahowApi } from "@/lib/api-server/endpoints";
import { handleError, handleSuccess } from "@/utils/server/handleResult";

export async function GET() {
  try {
    const response = await HahowApi.Heroes.YourEndpoint();
    return NextResponse.json(handleSuccess(response.data));
  } catch (e) {
    return handleError(e);
  }
}
```

5. **Client-side endpoint** in `src/lib/api-client/endpoints/`:
```typescript
import { createErrorResponseList } from "@/utils/server/handleResult";

export default async function yourEndpoint(): Promise<TResponse> {
  const response = await fetch("/api/your-path");
  if (!response.ok) {
    return createErrorResponseList<IYourDataItem>();
  }
  return response.json();
}
```

6. **Export from index** in `src/lib/api-client/endpoints/index.ts`:
```typescript
export const NextHahowApi = {
  Heroes: {
    YourEndpoint,
  },
};
```

### Response Type Standards

All API responses follow the `IBaseResponse<T>` pattern:

```typescript
{
  result: T | null,
  error: {
    code: string,
    message: string
  } | null
}
```

For list responses, use `IBaseListResult<T>`:

```typescript
{
  count: number,
  data: T[]
}
```

### Error Handling

- Server-side: Use `handleError(e)` utility which handles both AxiosError and generic Error types
- Client-side: Use `createErrorResponse()` or `createErrorResponseList()` helpers
- All errors are normalized to prevent information leakage

## Configuration

- **Path alias**: `@/*` maps to `src/*`
- **Environment variables**: Define in `.env.local` (see `.env.example`)
  - `HAHOW_URL`: Base URL for Hahow API
- **Styling**: TailwindCSS v4 + styled-components

## TypeScript

- Target: ES2017
- Strict mode enabled
- JSX runtime: react-jsx (automatic)
