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

The codebase implements a **two-tier API architecture** with distinct HTTP clients for each layer:

#### Layer Overview

1. **Server-Side API Layer** (`src/lib/api-server/`)
   - Directly calls external APIs (Hahow API) from Next.js server components/API routes
   - **Uses Axios** via `hahowAPIAxiosInstance` configured with `process.env.HAHOW_URL`
   - Implements axios interceptors via `AxiosConfig` class for logging and error handling
   - Functions return `AxiosResponse<T>` types
   - **Why Axios**: Complex HTTP needs (interceptors, request/response transformation, automatic retries, token refresh)

2. **Client-Side API Layer** (`src/lib/api-client/`)
   - Calls Next.js internal API routes (prefixed with `/api`)
   - **Uses native `fetch()`** instead of axios
   - Functions return standardized `IBaseResponse<T>` wrapper type
   - **Why Fetch**: Lightweight, native browser API, sufficient for simple internal API calls, smaller bundle size

3. **Next.js API Routes** (`src/app/api/`)
   - Bridge between client and server layers
   - Use server-side API functions to fetch data
   - Transform responses using `handleSuccess()` and `handleError()` utilities
   - Return JSON with consistent error handling

#### Design Rationale: Why Different HTTP Clients?

**Server-side uses Axios because:**
- ✅ Complex interceptor logic needed (logging, token refresh, retry)
- ✅ Centralized error handling for external API calls
- ✅ Request/response transformation
- ✅ Better TypeScript support for complex scenarios
- ✅ No bundle size concerns (runs on server)

**Client-side uses Fetch because:**
- ✅ Only calls internal `/api` routes (no complex HTTP needs)
- ✅ Smaller bundle size (native browser API)
- ✅ Next.js optimizations (automatic request deduplication)
- ✅ Simpler error handling (just check `response.ok`)
- ✅ All complex logic already handled server-side

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

   **Important**: Next.js 15+ requires proper handler signatures:
   - Routes **without params**: Can omit all parameters
   - Routes **with dynamic params** (e.g., `[heroId]`): Must include both `request` and `params` parameters
   - If you don't use `request`, prefix it with `_` (e.g., `_request`)

   Examples:

   ```typescript
   // Route without params: /api/heroes/list
   import { NextResponse } from "next/server";
   import { HahowApi } from "@/lib/api-server/endpoints";
   import { handleError, handleSuccess } from "@/utils/server/handleResult";

   export async function GET(): Promise<NextResponse> {
     try {
       const response = await HahowApi.Heroes.ListHeroes();
       return NextResponse.json(handleSuccess(response.data));
     } catch (e) {
       return handleError(e);  // Error already logged in interceptor
     }
   }
   ```

   ```typescript
   // Route with params: /api/heroes/[heroId]/profile
   import { NextRequest, NextResponse } from "next/server";
   import { HahowApi } from "@/lib/api-server/endpoints";
   import { handleError, handleSuccess } from "@/utils/server/handleResult";

   export async function GET(
     _request: NextRequest,  // Prefix with _ if unused
     { params }: { params: Promise<{ heroId: string }> }
   ): Promise<NextResponse> {
     try {
       const { heroId } = await params;  // Await the params Promise
       const response = await HahowApi.Heroes.GetProfile(heroId);
       return NextResponse.json(handleSuccess(response.data));
     } catch (e) {
       return handleError(e);
     }
   }

   export async function PATCH(
     request: NextRequest,  // Used for request body
     { params }: { params: Promise<{ heroId: string }> }
   ): Promise<NextResponse> {
     try {
       const { heroId } = await params;
       const body = await request.json();
       const response = await HahowApi.Heroes.UpdateProfile(heroId, body);
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

### Error Handling Architecture

The project implements a **layered error handling strategy** with clear separation of concerns:

#### Error Flow

```
External API Error
    ↓
Axios Interceptor (logs request/response errors)
    ↓
ApiRequester (propagates error without catching)
    ↓
API Route handler (catches error)
    ↓
handleError() (transforms to standard format)
    ↓
Client (receives standardized error response)
```

#### Key Components

1. **Axios Interceptor** (`src/utils/server/axiosConfig.ts`)
   - **Request Interceptor**: Logs all outgoing requests with URL and body
   - **Response Interceptor**: Logs all errors from external APIs
   - Uses `AxiosErrorHandler` class for centralized error logging
   - Does NOT transform errors, only logs them

2. **ApiRequester** (`src/lib/api-server/apiRequester.ts`)
   - **Does NOT catch errors** - lets them propagate naturally
   - Returns `Promise<T>` which can throw AxiosError
   - Errors flow up to API route handlers

3. **API Route Handlers** (`src/app/api/**/route.ts`)
   - Wrap server API calls in try-catch blocks
   - Use `handleError(e)` to transform errors into standardized responses
   - Pattern:
     ```typescript
     try {
       const response = await HahowApi.Heroes.YourEndpoint();
       return NextResponse.json(handleSuccess(response.data));
     } catch (e) {
       return handleError(e);  // Transforms error, does NOT log again
     }
     ```

4. **handleError Utility** (`src/utils/server/handleResult.ts`)
   - **For AxiosError**: Only transforms to `IBaseResponse` format (logging already done in interceptor)
   - **For non-Axios errors**: Logs AND transforms (these bypass interceptor)
   - Prevents information leakage by normalizing error messages
   - Returns appropriate HTTP status codes

5. **Client-side Error Handling** (`src/lib/api-client/endpoints/`)
   - Uses `createErrorResponse()` or `createErrorResponseList()` helpers
   - Checks `response.ok` status
   - Returns standardized `IBaseResponse` format

#### Error Handling Guidelines

**DO:**
- ✅ Let `ApiRequester` propagate errors without catching
- ✅ Use try-catch in API route handlers
- ✅ Call `handleError(e)` to transform errors to standard format
- ✅ Log errors in interceptor (for external API calls)
- ✅ Log non-Axios errors in `handleError()` (for internal errors)

**DON'T:**
- ❌ Catch errors in `ApiRequester` (let them propagate)
- ❌ Log AxiosError in `handleError()` (already logged in interceptor)
- ❌ Expose internal error details to client
- ❌ Use different response formats across endpoints

#### Extending the Interceptor (Token Refresh / Retry Logic)

The Axios interceptor architecture (`src/utils/server/axiosConfig.ts`) is designed to be easily extended for advanced features:

**Example: Adding Token Refresh on 401 Error**

```typescript
// In src/utils/server/axiosConfig.ts
this.axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // Log the error first
    this.errorHandler.handleResponseError(error);

    // Handle 401 Unauthorized - token expired
    if (error.response?.status === 401) {
      try {
        // 1. Refresh the token
        const newToken = await this.refreshToken();

        // 2. Update the original request with new token
        const originalRequest = error.config;
        if (originalRequest) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          // 3. Retry the original request
          return this.axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // Token refresh failed - redirect to login or handle accordingly
        console.error('Token refresh failed:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    // For other errors, reject as normal
    return Promise.reject(error);
  }
);
```

**Example: Adding Retry Logic for Network Errors**

```typescript
this.axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    this.errorHandler.handleResponseError(error);

    const config = error.config as any;

    // Initialize retry count
    config._retryCount = config._retryCount || 0;

    // Retry on network errors or 5xx server errors
    const shouldRetry =
      !error.response || // Network error
      (error.response.status >= 500 && error.response.status < 600);

    if (shouldRetry && config._retryCount < 3) {
      config._retryCount++;

      // Exponential backoff: 1s, 2s, 4s
      const delay = Math.pow(2, config._retryCount - 1) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));

      console.log(`Retrying request (attempt ${config._retryCount}/3)...`);
      return this.axiosInstance(config);
    }

    return Promise.reject(error);
  }
);
```

These patterns can be implemented in the existing `AxiosConfig` class without affecting other parts of the codebase.

## Configuration

- **Path alias**: `@/*` maps to `src/*`
- **Environment variables**: Define in `.env.local` (see `.env.example`)
  - `HAHOW_URL`: Base URL for Hahow API
- **Styling**: TailwindCSS v4 + styled-components

## TypeScript

- Target: ES2017
- Strict mode enabled
- JSX runtime: react-jsx (automatic)
