/*
 * @Author: JoeChen
 * @Date: 2025-12-23 21:14:27
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-24 16:36:20
 * @Description: 定義通用的 API 回應型別
 */

export interface IErrorType {
  code?: string;
  message?: string;
}

export interface IBaseResponse<T> {
  error: null | IErrorType;
  result: null | T;
}

export interface IBaseListResponse<T> {
  error: null | IErrorType;
  result: null | {
    count: number;
    data: T[];
  };
}
