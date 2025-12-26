/*
 * @Author: JoeChen
 * @Date: 2025-12-24
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-24 17:08:16
 * @Description: Client-side endpoint to get hero profile
 */

// types
import { TGetResponse } from "@/app/api/hahow/heroes/[heroId]/profile/dto";

// utils
import { createErrorResponse } from "@/utils/server/handleResult";

export default async function getHeroProfile(
  heroId: string
): Promise<TGetResponse> {
  if (heroId === "" || !heroId) {
    return createErrorResponse();
  }

  const RequestNextAPIUrl = `/api/hahow/heroes/${heroId}/profile`;

  const response = await fetch(RequestNextAPIUrl);

  if (!response.ok) {
    return createErrorResponse();
  }

  return response.json();
}
