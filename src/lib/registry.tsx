/*
 * @Author: JoeChen
 * @Date: 2025-12-24
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-24
 * @Description: Styled-components registry for SSR support
 *
 * 運作原理：
 * 1. Server 端：ServerStyleSheet 攔截所有 styled-components 產生的樣式
 * 2. 收集樣式：透過 StyleSheetManager 包裝 children，追蹤渲染過程中產生的 CSS
 * 3. 注入 HTML：getStyleElement() 將收集到的樣式轉為 <style> 標籤，插入到 <head>
 * 4. Client 端：Hydration 時，styled-components 接手管理這些樣式
 */

"use client";

import { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  // 建立 ServerStyleSheet 實例用於收集樣式
  const [sheet] = useState(() => new ServerStyleSheet());

  // 使用 useServerInsertedHTML 將收集到的樣式注入到 HTML
  useServerInsertedHTML(() => {
    const styles = sheet.getStyleElement();
    sheet.instance.clearTag();
    return <>{styles}</>;
  });

  // Client 端直接渲染 children
  if (typeof window !== "undefined") return <>{children}</>;

  // Server 端使用 StyleSheetManager 包裝以收集樣式
  return <StyleSheetManager sheet={sheet.instance}>{children}</StyleSheetManager>;
}
