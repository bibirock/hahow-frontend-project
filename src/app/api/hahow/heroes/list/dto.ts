/*
 * @Author: JoeChen
 * @Date: 2025-12-23 21:58:31
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-23 21:58:40
 * @Description:
 */

import { IBaseResponse, IBaseListResult } from "@/lib/api-types/common";

export interface IHeroesItem {
  id: string;
  name: string;
  image: string;
}

export type TResponse = IBaseResponse<IBaseListResult<IHeroesItem>>;
