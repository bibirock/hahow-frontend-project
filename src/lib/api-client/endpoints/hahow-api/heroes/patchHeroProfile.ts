/*
 * @Author: JoeChen
 * @Date: 2025-12-24
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-24 17:07:54
 * @Description: Client-side endpoint to patch hero profile
 */

// types
import {
  TPatchResponse,
  IPatchProfilePayload,
} from "@/app/api/hahow/heroes/[heroId]/profile/dto";

// utils
import { createErrorResponse } from "@/utils/server/handleResult";

export default async function patchHeroProfile(
  heroId: string,
  payload: IPatchProfilePayload
): Promise<TPatchResponse> {
  if (heroId === "" || !heroId) {
    return createErrorResponse();
  }

  const RequestNextAPIUrl = `/api/hahow/heroes/${heroId}/profile`;

  const response = await fetch(RequestNextAPIUrl, {
    method: "PATCH",
    body: JSON.stringify({
      heroId,
      body: payload,
    }),
  });

  if (!response.ok) {
    return createErrorResponse();
  }

  return response.json();
}
