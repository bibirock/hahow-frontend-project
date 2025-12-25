/*
 * @Author: JoeChen
 * @Date: 2025-12-24
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-25 17:16:20
 * @Description: DTO for hero profile endpoint
 */

import { IBaseResponse } from "@/lib/api-types/common";

export interface IGetRequestDto {
  heroId: string;
}

export interface IResponseDto {
  str: number;
  int: number;
  agi: number;
  luk: number;
}

export interface IRequestDto {
  heroId: string;
  body: IResponseDto;
}

export type TGetResponse = IBaseResponse<IResponseDto>;
export type TPatchResponse = IBaseResponse<string>;
