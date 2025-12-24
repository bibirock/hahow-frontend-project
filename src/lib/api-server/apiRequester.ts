/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: Joe.Chen
 * @Date: 2025-12-23 21:39:12
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-24 16:59:42
 * @Description:
 */

// modules
import { AxiosRequestConfig } from "axios";
import { hahowAPIAxiosInstance } from "./axiosInstance";

type ApiMethod = "get" | "post" | "put" | "delete" | "patch";

interface ApiCallOptions extends Omit<AxiosRequestConfig, "method" | "url"> {
  method: ApiMethod;
  url: string;
  params?: Record<string, any>;
  data?: Record<string, any>;
}

async function ApiRequester<T>(options: ApiCallOptions): Promise<T> {
  try {
    const { method, url, params, data, ...config } = options;
    const response = await hahowAPIAxiosInstance({
      method,
      url,
      params,
      data,
      ...config,
    });

    return response as T;
  } catch (e: any) {
    return e.response as T;
  }
}

export default ApiRequester;
