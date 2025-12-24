/*
 * @Author: JoeChen
 * @Date: 2025-12-24
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-24 17:08:50
 * @Description: DTO for single hero endpoint
 */

import { IBaseResponse } from "@/lib/api-types/common";

export interface IHeroDetail {
  id: string;
  name: string;
  image: string;
}

export interface IRequestDto {
  heroId: string;
}

export type TGetResponse = IBaseResponse<IHeroDetail>;
