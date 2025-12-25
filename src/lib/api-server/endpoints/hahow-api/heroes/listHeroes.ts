/*
 * @Author: JoeChen
 * @Date: 2025-12-23 21:38:37
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-25 17:10:49
 * @Description:
 */

// modules
import { AxiosResponse } from "axios";
import ApiRequester from "@/lib/api-server/apiRequester";

export interface IResponseDto {
  id: string;
  name: string;
  image: string;
}

const RequestHahowAPIUrl = "/heroes";

export type TResponse = AxiosResponse<IResponseDto[]>;

export default async function getHeroes(): Promise<TResponse> {
  return ApiRequester<TResponse>({
    method: "get",
    url: RequestHahowAPIUrl,
  });
}
