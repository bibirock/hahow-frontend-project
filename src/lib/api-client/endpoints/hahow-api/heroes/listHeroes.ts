/*
 * @Author: JoeChen
 * @Date: 2025-12-23 22:38:32
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-23 22:59:04
 * @Description:
 */

// types
import { TResponse, IHeroesItem } from "@/app/api/hahow/heroes/list/dto";

// utils
import { createErrorResponseList } from "@/utils/server/handleResult";

export const RequestHaHowAPIUrl = "/api/hahow/heroes/list";

export default async function list(): Promise<TResponse> {
  const response = await fetch(RequestHaHowAPIUrl);

  if (!response.ok) {
    return createErrorResponseList<IHeroesItem>();
  }

  return response.json();
}
