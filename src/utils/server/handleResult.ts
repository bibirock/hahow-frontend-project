/*
 * @Author: JoeChen
 * @Date: 2025-12-23 22:01:22
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-24 16:34:23
 * @Description:
 */

// modules
import { AxiosError } from "axios";
import { NextResponse } from "next/server";

// types
import { IBaseResponse } from "@/lib/api-types/common";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleAxiosError = (e: AxiosError<any>): IBaseResponse<null> => {
  const status = e.response?.status || 500;
  const statusText = e.response?.statusText || "Internal Server Error";

  return {
    result: null,
    error: {
      code: status.toString(),
      message: e.response?.data?.message || statusText,
    },
  };
};

export const createErrorResponse = (
  code: string = "400",
  message: string = "Request failed"
): IBaseResponse<null> => {
  return {
    result: null,
    error: {
      code,
      message,
    },
  };
};

export const createErrorResponseList = <T>(
  code: string = "400",
  message: string = "Request failed"
): IBaseResponse<{ count: number; data: T[] }> => {
  return {
    result: null,
    error: {
      code,
      message,
    },
  };
};

export const handleSuccess = <T>(result: T): IBaseResponse<T> => {
  return {
    result,
    error: null,
  };
};

export const handleError = (e: unknown): NextResponse<IBaseResponse<null>> => {
  if (e instanceof AxiosError) {
    const axiosError = e as AxiosError;
    const status = axiosError.response?.status;

    // 根據 HTTP 狀態碼設定錯誤訊息
    const errorResponse = handleAxiosError(axiosError);

    return NextResponse.json(errorResponse, { status: status || 500 });
  }

  // 處理非 Axios 錯誤，統一回傳 500 錯誤，防止洩漏內部資訊
  const errorMsg = e instanceof Error ? e.message : "Unknown error occurred";
  return NextResponse.json(createErrorResponse("500", errorMsg), {
    status: 500,
  });
};
