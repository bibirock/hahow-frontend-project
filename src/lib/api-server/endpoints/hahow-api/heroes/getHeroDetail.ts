/*
 * @Author: JoeChen
 * @Date: 2025-12-24
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-25 17:11:08
 * @Description: Server-side endpoint to get single hero details
 */

// modules
import { AxiosResponse } from "axios";
import ApiRequester from "@/lib/api-server/apiRequester";

export interface IResponseDto {
  id: string;
  name: string;
  image: string;
}

export type TResponse = AxiosResponse<IResponseDto>;

export default async function getHeroDetail(
  heroId: string
): Promise<TResponse> {
  const RequestHahowAPIUrl = `/heroes/${heroId}`;

  return ApiRequester<TResponse>({
    method: "get",
    url: RequestHahowAPIUrl,
  });
}
