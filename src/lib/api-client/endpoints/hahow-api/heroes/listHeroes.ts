/*
 * @Author: JoeChen
 * @Date: 2025-12-23 22:38:32
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-24 17:10:46
 * @Description:
 */

// types
import { TGetResponse } from "@/app/api/hahow/heroes/list/dto";

// utils
import { createErrorResponse } from "@/utils/server/handleResult";

export default async function list(): Promise<TGetResponse> {
  const RequestNextAPIUrl = "/api/hahow/heroes/list";

  const response = await fetch(RequestNextAPIUrl);

  if (!response.ok) {
    return createErrorResponse();
  }

  return response.json();
}
