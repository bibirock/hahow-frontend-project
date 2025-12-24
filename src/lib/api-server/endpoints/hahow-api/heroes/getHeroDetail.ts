/*
 * @Author: JoeChen
 * @Date: 2025-12-24
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-24 17:02:33
 * @Description: Server-side endpoint to get single hero details
 */

// modules
import { AxiosResponse } from "axios";
import ApiRequester from "@/lib/api-server/apiRequester";

export interface IHeroDetail {
  id: string;
  name: string;
  image: string;
}

export type TResponse = AxiosResponse<IHeroDetail>;

export default async function getHeroDetail(
  heroId: string
): Promise<TResponse> {
  const RequestHahowAPIUrl = `/heroes/${heroId}`;

  return ApiRequester<TResponse>({
    method: "get",
    url: RequestHahowAPIUrl,
  });
}
