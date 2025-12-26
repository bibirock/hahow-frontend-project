/*
 * @Author: Joe.Chen
 * @Date: 2025-12-23 21:10:00
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-25 15:49:13
 * @Description:
 */

// module
import { AxiosError } from "axios";

// types
import { IErrorType } from "@/lib/api-types/common";
import { IBaseResponse } from "@/lib/api-types/common";

export class AxiosErrorHandler {
  handleRequestInterceptorError(
    res: IBaseResponse<IErrorType>
  ): Promise<unknown> {
    const errorMsg = res?.error?.message;
    console.error(`Request error: ${JSON.stringify(errorMsg)}`);
    return Promise.reject(res);
  }

  handleResponseError(error: AxiosError): void {
    if (!error.response) {
      console.error(
        `Network error: ${error.message} (${error.code || "UNKNOWN"})`
      );
      return;
    }

    const errorMsg = error.response.data;
    const status = error.response.status;
    const statusMessage = error.response.statusText;

    console.error(
      `Response error: ${JSON.stringify(errorMsg)} ` +
        `status: ${status} ${statusMessage}`
    );
  }

  logRequest(url: string, data: unknown): void {
    console.info(`request url: ${url}: request body: ${JSON.stringify(data)}`);
  }
}
