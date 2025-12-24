/*
 * @Author: JoeChen
 * @Date: 2025-12-24
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-24 17:02:16
 * @Description: Server-side endpoint to get hero profile
 */

// modules
import { AxiosResponse } from "axios";
import ApiRequester from "@/lib/api-server/apiRequester";

export interface IHeroProfile {
  str: number;
  int: number;
  agi: number;
  luk: number;
}

export type TResponse = AxiosResponse<IHeroProfile>;

export default async function getHeroProfile(
  heroId: string
): Promise<TResponse> {
  const RequestHahowAPIUrl = `/heroes/${heroId}/profile`;

  return ApiRequester<TResponse>({
    method: "get",
    url: RequestHahowAPIUrl,
  });
}
