/*
 * @Author: JoeChen
 * @Date: 2025-12-24
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-25 17:19:17
 * @Description:
 */

// types
import {
  TPatchResponse,
  IResponseDto,
} from "@/app/api/hahow/heroes/[heroId]/profile/dto";

// utils
import { createErrorResponse } from "@/utils/server/handleResult";

export default async function patchHeroProfile(
  heroId: string,
  payload: IResponseDto
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
