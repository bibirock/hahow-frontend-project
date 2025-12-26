/*
 * @Author: JoeChen
 * @Date: 2025-12-23 21:14:27
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-25 14:30:45
 * @Description: 定義通用的 API 回應型別
 */

export interface IErrorType {
  code?: number;
  message?: string;
}

export interface IBaseResponse<T> {
  error: null | IErrorType;
  result: null | T;
}

export interface IBaseResponseWithError {
  error: IErrorType;
  result: null;
}

export interface IBaseListResult<T> {
  count: number;
  data: T[];
}

export interface IBaseListResponse<T> {
  error: null | IErrorType;
  result: null | IBaseListResult<T>;
}
