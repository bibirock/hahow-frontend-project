/*
 * @Author: JoeChen
 * @Date: 2025-12-23 22:01:22
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-25 14:33:03
 * @Description:
 */

// modules
import { AxiosError } from "axios";
import { NextResponse } from "next/server";

// types
import { IBaseResponse, IBaseResponseWithError } from "@/lib/api-types/common";

export const handleAxiosError = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  e: AxiosError<any>
): IBaseResponseWithError => {
  const status = e.response?.status || 500;
  const statusText = e.response?.statusText || "Internal Server Error";

  return {
    result: null,
    error: {
      code: status,
      message: e.response?.data?.message || statusText,
    },
  };
};

export const createErrorResponse = (
  code: number = 400,
  message: string = "Request failed"
): IBaseResponseWithError => {
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

/**
 * 處理 API route 錯誤並轉換為統一的 NextResponse 格式
 * 注意：Axios 錯誤已經在 interceptor 中記錄過 log，此處只做格式轉換
 */
export const handleError = (
  e: unknown
): NextResponse<IBaseResponseWithError> => {
  if (e instanceof AxiosError) {
    const axiosError = e as AxiosError;
    const status = axiosError.response?.status;

    // Axios 錯誤已在 interceptor 記錄，此處只轉換格式
    const errorResponse = handleAxiosError(axiosError);

    return NextResponse.json(errorResponse, { status: status || 500 });
  }

  // 處理非 Axios 錯誤（例如程式邏輯錯誤）
  // 這類錯誤不會經過 interceptor，需要在此記錄
  const errorMsg = e instanceof Error ? e.message : "Unknown error occurred";
  console.error(`Non-Axios error in API route: ${errorMsg}`, e);

  // 統一回傳 500 錯誤，防止洩漏內部資訊
  return NextResponse.json(createErrorResponse(500, errorMsg), {
    status: 500,
  });
};
