/*
 * @Author: Joe.Chen
 * @Date: 2025-12-23 21:10:00
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-23 21:29:31
 * @Description:
 */

// module
import { AxiosError } from "axios";
import { NextResponse } from "next/server";

// types
import { IErrorType } from "@/lib/api-types/common";
import { IBaseResponse } from "@/lib/api-types/common";

export class AxiosErrorHandler {
  constructor(private hahowWebUrl: string) {}

  handleRequestError(): void {
    const url = `${this.hahowWebUrl}/`;
    NextResponse.redirect(url);
  }

  handleRequestInterceptorError(
    res: IBaseResponse<IErrorType>
  ): Promise<never> {
    const errorMsg = res?.error?.message;
    console.error(`Request error: ${JSON.stringify(errorMsg)}`);
    return Promise.reject(res);
  }

  handleResponseError(error: AxiosError): void {
    const errorMsg = error.response?.data;
    const status = error.response?.status;
    const statusMessage = error.response?.statusText;

    console.error(
      `Response error: ${JSON.stringify(errorMsg)} ` +
        `status: ${status} ${statusMessage}`
    );
  }

  logRequest(url: string, data: unknown): void {
    console.info(`request url: ${url}: request body: ${JSON.stringify(data)}`);
  }
}
