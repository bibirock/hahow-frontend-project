/*
 * @Author: JoeChen
 * @Date: 2025-12-23 21:08:18
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-26 12:09:27
 * @Description: 這個設定檔分別設置了 Axios 攔截器，及實現了錯誤處理機制
 * 錯誤處理機制，使用的是退避指數策略，讓 API 自動重試
 * 1. 後端錯誤，重試 5 次
 * 2. 網路錯誤，重試 3 次
 */

// modules
import {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

// utils
import { AxiosErrorHandler } from "@/utils/errorHandler";

// types
import { IErrorType } from "@/lib/api-types/common";
interface IRetryConfig extends InternalAxiosRequestConfig {
  _retryCount?: number;
}

export class AxiosConfig {
  private errorHandler: AxiosErrorHandler;

  // 錯誤重試延遲時間：1秒、2秒、3秒、4秒、5秒
  private readonly BACKEND_ERROR_RETRY_DELAYS = [1000, 2000, 3000, 4000, 5000];
  // 指數退避延遲：1秒、3秒、5秒
  private readonly NETWORK_ERROR_RETRY_DELAYS = [1000, 3000, 5000];

  constructor(private axiosInstance: AxiosInstance) {
    this.errorHandler = new AxiosErrorHandler();
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
      (response) => this.handleBackendError(response),
      (error: AxiosError) => this.handleNetworkError(error)
    );
  }

  /**
   * 由於 Hahow API 有時會在回應中出現 code 1000 的後端錯誤，
   * 即使 HTTP 狀態碼為 200，因此需要特別處理這種情況並進行重試
   */
  private async handleBackendError(
    response: AxiosResponse
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<AxiosResponse | any> {
    // 檢查回應是否有後端錯誤（代碼 1000），即使狀態碼為 200
    const responseData = response.data as IErrorType | undefined;
    const config = response.config as IRetryConfig;

    if (responseData?.code === 1000) {
      return this.retryBackendRequest(config, response);
    }

    return response;
  }

  private async retryBackendRequest(
    config: IRetryConfig,
    response: AxiosResponse
  ): Promise<unknown> {
    // 初始化重試次數
    if (!config._retryCount) {
      config._retryCount = 0;
    }

    // 最多重試 5 次
    if (config._retryCount < this.BACKEND_ERROR_RETRY_DELAYS.length) {
      const delay = this.BACKEND_ERROR_RETRY_DELAYS[config._retryCount];
      config._retryCount++;

      await this.delay(delay);

      console.log(
        `[Axios] Backend error (code 1000), retrying (attempt ${config._retryCount}/${this.BACKEND_ERROR_RETRY_DELAYS.length}) after ${delay}ms: ${config.url}`
      );
      return this.axiosInstance(config);
    }

    // 所有重試皆已耗盡，建立適當的 AxiosError 以確保被捕獲
    console.error(
      `[Axios] Backend error persists after ${this.BACKEND_ERROR_RETRY_DELAYS.length} retries: ${config.url}`
    );

    const axiosError = new AxiosError(
      (response.data as IErrorType).message || "Backend error after retries",
      "BACKEND_ERROR",
      config,
      config,
      response
    );

    return Promise.reject(axiosError);
  }

  private async handleNetworkError(error: AxiosError): Promise<unknown> {
    this.errorHandler.handleResponseError(error);

    const config = error.config as IRetryConfig | undefined;

    if (!config) {
      return Promise.reject(error);
    }

    // 初始化重試次數
    if (!config._retryCount) {
      config._retryCount = 0;
    }

    // 發生超時或伺服器錯誤（5xx）時重試
    const shouldRetry =
      error.code === "ECONNABORTED" || // 超時
      (error.response?.status && error.response.status >= 500); // 伺服器錯誤

    // 最多重試 3 次
    if (
      shouldRetry &&
      config._retryCount < this.NETWORK_ERROR_RETRY_DELAYS.length
    ) {
      const delay = this.NETWORK_ERROR_RETRY_DELAYS[config._retryCount];
      config._retryCount++;

      await this.delay(delay);

      console.log(
        `[Axios] Retrying request (attempt ${config._retryCount}/${this.NETWORK_ERROR_RETRY_DELAYS.length}) after ${delay}ms: ${config.url}`
      );
      return this.axiosInstance(config);
    }

    return Promise.reject(error);
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
