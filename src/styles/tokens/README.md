# Design Tokens

此目錄包含專案的 Design Tokens，用於統一管理所有設計相關的常數（色彩、字型、間距等）。

## 色彩系統 (Colors)

### 使用方式

#### 在 TypeScript/React 組件中使用

```typescript
import { colors } from "@/styles/tokens";

// 在 styled-components 中使用
const Button = styled.button`
  background-color: ${colors.background.primary};
  color: ${colors.text.primary};
  border: 2px solid ${colors.border.primary};

  &:hover {
    background-color: ${colors.background.hover};
  }
`;

// 在 inline styles 中使用
<div style={{ color: colors.text.error }}>錯誤訊息</div>
```

#### 在 CSS 檔案中使用

全域 CSS 變數已定義於 `src/app/globals.css`，可直接在 CSS 中使用：

```css
.my-element {
  background-color: var(--color-background-primary);
  color: var(--color-text-primary);
  border: 2px solid var(--color-border-primary);
}

.my-element:hover {
  background-color: var(--color-background-hover);
}
```

### 色彩分類

#### 基礎色彩 (base)

- `base.white` - 純白色 (#ffffff)
- `base.black` - 純黑色 (#000000)

#### 灰階色系 (gray)

用於背景與互動狀態的漸層系統：

- `gray.900` - 深灰色，主要背景色 (#2d2d2d)
- `gray.800` - 中灰色，Hover 狀態背景 (#3d3d3d)
- `gray.700` - 淺灰色，Active 狀態背景 (#4d4d4d)
- `gray.500` - 次要提示文字 (#6b7280)
- `gray.400` - 更淺的次要提示文字 (#9ca3af)

#### 品牌色系 (brand)

- `brand.primary` - 主要強調色，品牌橙色 (#ff6600)
- `brand.primaryShadow` - 橙色陰影效果 (rgba(255, 102, 0, 0.3))

#### 語義化色彩 (semantic)

根據用途定義的色彩：

- `semantic.error` - 錯誤狀態 (#ef4444)
- `semantic.warning` - 警告狀態 (#ff6600)
- `semantic.warningText` - 警告文字 (orange)

#### 陰影色系 (shadow)

用於 box-shadow 的色彩：

- `shadow.light` - 預設卡片陰影 (rgba(255, 255, 255, 0.1))
- `shadow.medium` - Hover 卡片陰影 (rgba(255, 255, 255, 0.2))
- `shadow.primary` - 選中卡片陰影 (rgba(255, 102, 0, 0.3))

#### 文字色系 (text)

- `text.primary` - 主要文字顏色 (#ffffff)
- `text.secondary` - 次要提示文字 (#6b7280)
- `text.tertiary` - 更淺的次要文字 (#9ca3af)
- `text.error` - 錯誤訊息文字 (#ef4444)
- `text.warning` - 警告訊息文字 (orange)

#### 背景色系 (background)

- `background.primary` - 主要背景色 (#2d2d2d)
- `background.hover` - Hover 狀態背景 (#3d3d3d)
- `background.active` - Active 狀態背景 (#4d4d4d)

#### 邊框色系 (border)

- `border.primary` - 主要邊框顏色 (#ffffff)
- `border.selected` - 選中狀態邊框 (#ff6600)

## 最佳實踐

### ✅ 建議做法

#### 1. 使用語義化命名

```typescript
// 好
color: ${colors.text.error}

// 避免
color: ${colors.semantic.error}  // 應該用 text.error
```

#### 2. 保持一致性

```typescript
// 好 - 所有按鈕使用相同的背景色系統
background-color: ${colors.background.primary};
&:hover { background-color: ${colors.background.hover}; }
&:active { background-color: ${colors.background.active}; }
```

#### 3. 避免硬編碼色碼

```typescript
// 好
color: ${colors.text.primary}

// 避免
color: #ffffff
```

### ❌ 避免做法

1. 不要在組件中直接使用 hex 色碼
2. 不要混用 CSS 變數和 TypeScript tokens（選擇其中一種方式）
3. 不要為了相同的用途使用不同的 token

## 擴展 Design Tokens

如需新增色彩，請修改 [colors.ts](./colors.ts)：

```typescript
export const colors = {
  // ... 現有的色彩定義

  // 新增色彩分類
  success: {
    primary: "#10b981",
    light: "#34d399",
    dark: "#059669",
  },
} as const;
```

同時記得在 [globals.css](../../app/globals.css) 中新增對應的 CSS 變數：

```css
:root {
  /* ... 現有的變數 */

  /* 成功色系 */
  --color-success-primary: #10b981;
  --color-success-light: #34d399;
  --color-success-dark: #059669;
}
```

## 配色方案

此專案採用**深色主題**配色方案：

- **主色調**：深灰色系漸層 (#2d2d2d → #3d3d3d → #4d4d4d)
- **強調色**：橙色 (#ff6600)
- **文字色**：白色 (#ffffff)
- **錯誤色**：紅色 (#ef4444)
