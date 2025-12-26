# Hahow Frontend Project

一個使用 Next.js 16、React 19 和 TypeScript 構建的現代化前端專案，實現了 BFF (Backend For Frontend) 架構的雙層 API 設計模式。

## 目錄

- [快速開始](#快速開始)
- [專案架構](#專案架構)
- [設計理念](#設計理念)
- [Design Tokens 設計系統](#design-tokens-設計系統)
- [第三方套件說明](#第三方套件說明)
- [註解原則](#註解原則)
- [開發過程遇到的問題與解決方案](#開發過程遇到的問題與解決方案)

---

## 快速開始

### 推薦安裝延伸模組

- 請安裝推薦延伸模組，以自動切換 Node.js 版本：
  - [vsc-nvm](https://marketplace.visualstudio.com/items?itemName=henrynguyen5-vsc.vsc-nvm)
- 請安裝推薦的延伸模組來保持專案品質及風格：
  - [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
  - [File Header Comment](https://marketplace.visualstudio.com/items?itemName=OBKoro1.korofileheader)
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [Markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)

#### 環境需求

- Node.js >= 20.9.0

### 安裝與執行

```bash
# 1. 安裝依賴
npm install

# 2. 設定環境變數
cp .env.example .env.local
# 編輯 .env.local，設定 HAHOW_URL，可直接參考 .env.example

# 3. 啟動開發伺服器
npm run start:dev

# 4. 在瀏覽器開啟 http://localhost:3000 ，將會自動導向 /heroes 頁面
```

### 可用指令

```bash
npm run start:dev    # 啟動開發伺服器 (port 3000)
npm run build        # 建置生產版本
npm run start        # 啟動生產伺服器 （重要，用於生產環境檢查）
npm run lint         # 執行 ESLint 程式碼檢查
```

---

## 專案架構

### 資料夾結構

```text
src/
├── app/                          # Next.js App Router 頁面與路由
│   ├── api/                      # Next.js API Routes (BFF 中介層)
│   │   └── hahow/                # Hahow API 相關端點
│   │       └── [endpoint]/
│   │           ├── route.ts      # API 路由處理器
│   │           └── dto.ts        # API 資料型別定義
│   ├── heroes/                   # Heroes 相關頁面
│   │   └── [heroId]/             # heroes 詳細頁面
│   ├── layout.tsx                # 全域 Layout
│   └── page.tsx                  # 首頁
│
├── components/                   # React 元件
│   └── page/                     # 頁面級元件
│       └── heroes/               # Heroes 頁面相關元件
│
├── lib/                          # 核心函式庫
│   ├── api-server/               # Server-side API Layer
│   │   ├── apiRequester.ts       # Axios 請求封裝
│   │   ├── hahowAPIAxiosInstance.ts  # Axios 實例配置
│   │   └── endpoints/            # Server 端 API 端點
│   │       └── hahow-api/
│   │           └── heroes/       # Heroes 相關 API
│   │
│   ├── api-client/               # Client-side API Layer
│   │   └── endpoints/            # Client 端 API 端點
│   │       └── hahow-api/
│   │           └── heroes/       # Heroes 相關 API
│   │
│   └── api-types/                # API 共用型別定義
│       └── common.ts             # 通用型別 (IBaseResponse, IBaseListResult)
│
└── utils/                        # 工具函式
    └── server/                   # Server-side 工具
        ├── axiosConfig.ts        # Axios 攔截器配置
        └── handleResult.ts       # 統一回應格式處理
```

### Application 邏輯架構

本專案採用 **BFF (Backend For Frontend) 雙層 API 架構**，將 API 呼叫分為兩個獨立的層次：

```text
┌─────────────────────────────────────────────────────────────┐
│                      Client Component                        │
│                    (React 19 Components)                     │
└─────────────────────────┬───────────────────────────────────┘
                          │ fetch()
                          ↓
┌─────────────────────────────────────────────────────────────┐
│            Client-side API Layer (api-client/)               │
│  • 使用原生 fetch API                                         │
│  • 呼叫 Next.js 內部 /api 路由                                │
│  • 回傳 IBaseResponse<T> 統一格式                            │
└─────────────────────────┬───────────────────────────────────┘
                          │ HTTP (內部路由)
                          ↓
┌─────────────────────────────────────────────────────────────┐
│          Next.js API Routes (app/api/**/route.ts)            │
│  • BFF 中介層                                                │
│  • 統一錯誤處理 (handleSuccess/handleError)                  │
│  • 資料轉換與整合                                            │
└─────────────────────────┬───────────────────────────────────┘
                          │ 呼叫 Server API
                          ↓
┌─────────────────────────────────────────────────────────────┐
│           Server-side API Layer (api-server/)                │
│  • 使用 Axios                                                │
│  • 實作攔截器 (Interceptor)                                  │
│  • 指數型退避重試策略                                        │
│  • 請求/回應日誌記錄                                         │
│  • 回傳 AxiosResponse<T>                                     │
└─────────────────────────┬───────────────────────────────────┘
                          │ HTTPS
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                   External API (Hahow API)                   │
└─────────────────────────────────────────────────────────────┘
```

#### 資料流向範例

以獲取英雄列表為例：

1. **Client Component** 呼叫 `NextHahowApi.Heroes.ListHeroes()`
2. **Client API Layer** 使用 `fetch('/api/hahow/heroes/list')`
3. **Next.js API Route** 接收請求，呼叫 `HahowApi.Heroes.ListHeroes()`
4. **Server API Layer** 使用 Axios 發送請求到 `${HAHOW_URL}/heroes`
5. **Axios Interceptor** 記錄請求日誌、錯誤處理、重試邏輯
6. 回應資料層層返回，經過格式轉換與錯誤處理

---

## 設計理念

### 1. BFF (Backend For Frontend) 架構

#### 為什麼使用 BFF？

##### 安全性提升

- 避免真實後端 API 路徑暴露在前端程式碼中
- 在雲端環境下可設定只允許前端專案的 server-side 呼叫，例如限制後端 ECS 接收的來源
- 可在 BFF 層實作 API Key、Token 管理，避免敏感資訊洩漏，使用 http-only 餵給前端，防止 XSS 攻擊，前端在呼叫 API 時會自動帶上 cookie

##### 效能優化

- Server-side 呼叫 API 比 client-side 更快速穩定
- 避免受到使用者網路環境的影響（弱網、高延遲）
- Server 端網路環境穩定，延遲低

##### BFF API 整合能力

- 可同時呼叫多個後端微服務
- 將多個 API 整合成一個端點給前端呼叫
- 減少前端的網路請求次數
- 去除前端不需要的資料欄位，縮小封包大小

### 2. 雙層 API Layer 設計

#### 為什麼 Client-side 使用 Fetch？

在 BFF 架構下，client-side 只需呼叫內部的 `/api` 路由，情況相對單純：

- **輕量化**: 原生瀏覽器 API，不需額外引入套件，減少 bundle size
- **Next.js 優化**: 自動請求去重 (Request Deduplication)
- **簡單的錯誤處理**: 只需檢查 `response.ok` 狀態
- **所有複雜邏輯已在 Server-side 處理完成**

#### 為什麼 Server-side 使用 Axios？

Server-side 需要處理與外部 API 的複雜互動：

- **攔截器機制**: 統一的請求/回應攔截器
- **重試策略**: 實作指數型退避重試 (Exponential Backoff)
- **日誌記錄**: 詳細記錄所有請求與錯誤，方便追蹤問題
- **錯誤處理**: 集中式錯誤處理與轉換
- **型別支援**: 更完善的 TypeScript 型別定義
- **無 Bundle Size 考量**: 在伺服器端執行，不影響前端效能

### 3. 統一回應格式

所有 API 回應都遵循 `IBaseResponse<T>` 格式：

```typescript
interface IBaseResponse<T> {
  result: T | null;
  error: {
    code: string;
    message: string;
  } | null;
}
```

**優點**:

- 前端只需檢查 `error` 欄位判斷是否有錯誤
- 統一的錯誤處理流程
- 型別安全，避免 runtime 錯誤
- 方便進行統一的 toast 提示

### 4. 型別分離管理

- **Server API**: 使用 `AxiosResponse<T>` 型別
- **Client API**: 使用 `IBaseResponse<T>` 型別
- **DTO**: 每個 API Route 都有獨立的 `dto.ts` 定義請求/回應型別

**優點**:

- 保留修改彈性，server 與 client 可獨立調整
- 清楚的型別邊界
- 易於維護與重構

### 5. 錯誤處理分層

```text
External API Error
    ↓
Axios Interceptor (記錄 request/response 錯誤)
    ↓
ApiRequester (傳遞錯誤，不捕獲)
    ↓
API Route Handler (捕獲錯誤)
    ↓
handleError() (轉換為標準格式)
    ↓
Client (接收標準化錯誤回應)
```

- **Axios Interceptor**: 負責日誌記錄
- **handleError()**: 負責格式轉換，避免重複記錄
- **CloudWatch 整合**: 在雲端環境可透過 CloudWatch 查詢 logs

---

## Design Tokens 設計系統

### 概述

本專案採用 **Design Tokens** 集中管理所有設計相關的常數（色彩），確保整個專案的設計一致性與可維護性。

### 色彩系統

#### 檔案位置

- **TypeScript Tokens**: `src/styles/tokens/colors.ts`
- **CSS 變數**: `src/app/globals.css`
- **完整文件**: [src/styles/tokens/README.md](src/styles/tokens/README.md)

---

## 第三方套件說明

### 核心框架

#### Next.js 16

- **用途**: React 框架，提供 SSR、SSG、API Routes 等功能
- **為何使用**:
  - 內建 API Routes 可實現 BFF 架構
  - App Router 提供更好的路由與 layout 管理
  - 自動程式碼分割，優化效能
  - 支援 Server Components，減少 client bundle size

### HTTP 請求

#### Axios 1.13.2

- **用途**: Server-side HTTP client
- **為何使用**:
  - 強大的攔截器機制，可統一處理請求/回應
  - 方便實作重試策略與錯誤處理
  - 完善的型別定義
  - 自動 JSON 資料轉換
- **使用場景**: 僅在 server-side (`api-server/`) 使用

#### Native Fetch API

- **用途**: Client-side HTTP client
- **為何使用**:
  - 原生 API，無需額外套件
  - Next.js 內建優化 (請求去重)
  - 適合簡單的 API 呼叫
  - 減少 bundle size
- **使用場景**: 僅在 client-side (`api-client/`) 使用

### UI/UX

#### styled-components 6.1.19

- **用途**: CSS-in-JS 解決方案
- **為何使用**:
  - 元件化的樣式管理
  - 支援動態樣式與主題
  - TypeScript 型別支援
  - 避免全域 CSS 污染

#### react-toastify 11.0.5

- **用途**: Toast 通知元件
- **為何使用**:
  - 統一的使用者提示體驗

### 開發工具

#### ESLint 9.x + eslint-config-next

- **用途**: 程式碼品質檢查
- **為何使用**:
  - 統一程式碼風格
  - 自動發現潛在問題
  - Next.js 官方配置，符合最佳實踐
  - 整合 TypeScript 規則

---

## 註解原則

### 何時寫註解？

我在程式碼中遵循以下註解原則：

- 需要特別說明檔案用途時，會在 header 註解中說明

  ```typescript
  /*
  * 運作原理：
  * 1. Server 端：ServerStyleSheet 攔截所有 styled-components 產生的樣式
  * 2. 收集樣式：透過 StyleSheetManager 包裝 children，追蹤渲染過程中產生的 CSS
  * 3. 注入 HTML：getStyleElement() 將收集到的樣式轉為 <style> 標籤，插入到 <head>
  * 4. Client 端：Hydration 時，styled-components 接手管理這些樣式
  */
  ```

- 分類 import 區塊，方便後續維護，也能一眼看出要找的 import 在哪裡

```typescript
// modules
import styled from "styled-components";
import { usePathname } from "next/navigation";

// components
import HeroList from "./components/HeroList";

// types
import { IHeroesItem } from "@/lib/api-server/endpoints/hahow-api/heroes/listHeroes";
```

- 說明操作原因或操作步驟

```typescript
export default function HeroesPage() {
  // 列表由 layout 處理，這裡回傳 null 即可
  return null;
}

// 使用快取保留重複 id 會取用快取的結果，減少重複請求
const getHeroDetail = cache((heroId: string) =>
  HahowApi.Heroes.GetHeroDetailServer(heroId)
);
const getHeroProfile = cache((heroId: string) =>
  HahowApi.Heroes.GetHeroProfileServer(heroId)
);
```

## 開發過程遇到的問題與解決方案

**問題**:

- 後端 API 似乎有時會有錯誤

**解決方案**:

- 使用指數退避呼叫請求方法，並配合錯誤提示，請使用者在操作一次

## 使用的 AI 工具與情境

### Claude Code \ copilot

- 在架構設計好之後，使用 AI 完成重複性工作，例如 api 層級規劃、錯誤處理
- 簡單樣式的實現
- 與 AI 的互動基本上要將任務拆成粒子化，才可以保證每次答案較為精確
- 問題及實作方法要描述清楚，避免通靈成分太多，造成幻覺
- 檢視每次生成的程式碼是否合理

## 專案特色說明

1. **SSR 技術**: 讓 HTML 不再是 js 運作時動態掛載，透過伺服器渲染加強 SEO 分數，可查看頁面原始碼來檢視
2. **BFF 架構**: 提升安全性、效能與 API 整合能力
3. **雙層 API 設計**: Client 使用 Fetch，Server 使用 Axios，各司其職
4. **統一回應格式**: 簡化前端錯誤處理邏輯
5. **型別分離管理**: Server 與 Client API 型別獨立，保留彈性
6. **完善的錯誤處理**: 分層處理，避免重複記錄，方便追蹤
7. **指數型退避重試**: 提升 API 呼叫穩定性
8. **CloudWatch 整合**: 雲端環境下可透過 CloudWatch 查詢 logs
9. **Design Tokens 設計系統**: 集中管理色彩等設計常數，確保一致性與可維護性
