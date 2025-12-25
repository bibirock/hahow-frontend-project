/**
 * Design Tokens - Colors
 *
 * 此檔案定義專案中所有使用的色碼，採用深色主題配色方案
 */

export const colors = {
  /**
   * 基礎色彩
   */
  base: {
    white: "#ffffff",
    black: "#000000",
  },

  /**
   * 灰階色系 - 主要用於背景與互動狀態
   * 漸層：深 → 中 → 淺
   */
  gray: {
    /** 深灰色 - 主要背景色 */
    900: "#2d2d2d",
    /** 中灰色 - Hover 狀態背景 */
    800: "#3d3d3d",
    /** 淺灰色 - Active 狀態背景 */
    700: "#4d4d4d",
    /** 次要提示文字 */
    500: "#6b7280",
    /** 更淺的次要提示文字 */
    400: "#9ca3af",
  },

  /**
   * 品牌色系
   */
  brand: {
    /** 主要強調色 */
    primary: "#ff6600",
    /** 橙色 30% 透明度 - 用於陰影效果 */
    primaryShadow: "rgba(255, 102, 0, 0.3)",
  },

  /**
   * 語義化色彩
   */
  semantic: {
    /** 錯誤狀態 */
    error: "#ef4444",
    /** 警告狀態 */
    warning: "#ff6600",
    /** 警告文字（使用 CSS 顏色名稱） */
    warningText: "orange",
  },

  /**
   * 陰影色系
   */
  shadow: {
    /** 白色 10% 透明度 - 預設卡片陰影 */
    light: "rgba(255, 255, 255, 0.1)",
    /** 白色 20% 透明度 - Hover 卡片陰影 */
    medium: "rgba(255, 255, 255, 0.2)",
    /** 橙色 30% 透明度 - 選中卡片陰影 */
    primary: "rgba(255, 102, 0, 0.3)",
  },

  /**
   * 文字色系
   */
  text: {
    /** 主要文字顏色 */
    primary: "#ffffff",
    /** 次要提示文字 */
    secondary: "#6b7280",
    /** 更淺的次要文字 */
    tertiary: "#9ca3af",
    /** 錯誤訊息文字 */
    error: "#ef4444",
    /** 警告訊息文字 */
    warning: "orange",
  },

  /**
   * 背景色系
   */
  background: {
    /** 主要背景色 */
    primary: "#2d2d2d",
    /** Hover 狀態背景 */
    hover: "#3d3d3d",
    /** Active 狀態背景 */
    active: "#4d4d4d",
  },

  /**
   * 邊框色系
   */
  border: {
    /** 主要邊框顏色 */
    primary: "#ffffff",
    /** 選中狀態邊框 */
    selected: "#ff6600",
  },
} as const;

export type Colors = typeof colors;
