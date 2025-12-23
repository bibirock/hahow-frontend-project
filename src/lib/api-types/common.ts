/*
 * @Author: JoeChen
 * @Date: 2025-12-23 21:14:27
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-23 23:04:02
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

export interface IBaseListResult<T> {
  count: number;
  data: T[];
}
