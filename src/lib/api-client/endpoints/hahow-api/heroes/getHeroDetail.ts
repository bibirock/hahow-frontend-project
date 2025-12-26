/*
 * @Author: JoeChen
 * @Date: 2025-12-24
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-25 17:10:29
 * @Description:
 */

// types
import { TGetResponse } from "@/app/api/hahow/heroes/[heroId]/dto";

// utils
import { createErrorResponse } from "@/utils/server/handleResult";

export default async function getHeroDetail(
  heroId: string
): Promise<TGetResponse> {
  if (heroId === "" || !heroId) {
    return createErrorResponse();
  }

  const RequestNextAPIUrl = `/api/hahow/heroes/${heroId}`;

  const response = await fetch(RequestNextAPIUrl, {
    body: JSON.stringify({ heroId }),
  });

  if (!response.ok) {
    return createErrorResponse();
  }

  return response.json();
}
