/*
 * @Author: JoeChen
 * @Date: 2025-12-24 17:48:21
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-25 15:08:56
 * @Description:
 */

// modules
import { ToastContainer } from "react-toastify";
import StyledComponentsRegistry from "@/lib/registry";

// types
import type { Metadata } from "next";

// styles
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: {
    default: "Hahow Heroes",
    template: "%s - Hahow Heroes",
  },
  description: "陳智文的面試專案 - Hahow Heroes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body>
        <StyledComponentsRegistry>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
