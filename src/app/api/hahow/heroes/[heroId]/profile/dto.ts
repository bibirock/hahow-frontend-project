/*
 * @Author: JoeChen
 * @Date: 2025-12-24
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-24 16:22:42
 * @Description: DTO for hero profile endpoint
 */

import { IBaseResponse } from "@/lib/api-types/common";

export interface IHeroProfile {
  str: number;
  int: number;
  agi: number;
  luk: number;
}

export interface IGetRequestDto {
  heroId: string;
}

export interface IPatchProfilePayload {
  str: number;
  int: number;
  agi: number;
  luk: number;
}

export interface IPatchRequestDto {
  heroId: string;
  body: IPatchProfilePayload;
}

export type TGetResponse = IBaseResponse<IHeroProfile>;
export type TPatchResponse = IBaseResponse<string>;
