/*
 * @Author: JoeChen
 * @Date: 2025-12-23 21:08:18
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-23 23:04:16
 * @Description:
 */

// modules
import { AxiosInstance, AxiosError } from "axios";

// utils
import { AxiosErrorHandler } from "@/utils/errorHandler";

export class AxiosConfig {
  private errorHandler: AxiosErrorHandler;

  constructor(
    private axiosInstance: AxiosInstance,
    hahowWebUrl: string = process.env.HAHOW_URL!
  ) {
    this.errorHandler = new AxiosErrorHandler(hahowWebUrl);
    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const data = config.params || config.data;
        this.errorHandler.logRequest(config.url!, data);
        return config;
      },
      (error) => this.errorHandler.handleRequestInterceptorError(error)
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        this.errorHandler.handleResponseError(error);

        return Promise.reject(error);
      }
    );
  }
}
