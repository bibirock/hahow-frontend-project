/*
 * @Author: JoeChen
 * @Date: 2025-12-24
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-24 17:01:42
 * @Description: Server-side endpoint to patch hero profile
 */

// modules
import { AxiosResponse } from "axios";
import ApiRequester from "@/lib/api-server/apiRequester";

export interface IPatchProfilePayload {
  str: number;
  int: number;
  agi: number;
  luk: number;
}

export type TResponse = AxiosResponse<string>;

export default async function patchHeroProfile(
  heroId: string,
  payload: IPatchProfilePayload
): Promise<TResponse> {
  const RequestHahowAPIUrl = `/heroes/${heroId}/profile`;

  return ApiRequester<TResponse>({
    method: "patch",
    url: RequestHahowAPIUrl,
    data: payload,
  });
}
