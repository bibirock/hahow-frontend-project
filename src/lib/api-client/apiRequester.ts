/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: Joe.Chen
 * @Date: 2025-12-23 21:39:12
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-23 22:33:38
 * @Description:
 */

import { AxiosRequestConfig } from "axios";
import { nextAPIaxiosInstance } from "./axiosInstance";

type ApiMethod = "get" | "post" | "put" | "delete";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ApiCallOptions<T> extends Omit<AxiosRequestConfig, "method" | "url"> {
  method: ApiMethod;
  url: string;
  params?: Record<string, any>;
  data?: Record<string, any>;
}

async function ApiRequester<T>(options: ApiCallOptions<T>): Promise<T> {
  try {
    const { method, url, params, data, ...config } = options;
    const response = await nextAPIaxiosInstance({
      method,
      url,
      params,
      data,
      ...config,
    });

    return response.data as T;
  } catch (e: any) {
    console.log(e);
    return e.response as T;
  }
}

export default ApiRequester;
