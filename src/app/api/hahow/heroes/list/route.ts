/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: JoeChen
 * @Date: 2025-12-23 21:58:13
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-24 17:14:56
 * @Description:
 */

// module
import { NextResponse } from "next/server";
import { HahowApi } from "@/lib/api-server/endpoints";

// types
import { IBaseResponseWithError } from "@/lib/api-types/common";
import { TGetResponse } from "./dto";

// utils
import { handleError, handleSuccess } from "@/utils/server/handleResult";

export async function GET(): Promise<
  NextResponse<TGetResponse | IBaseResponseWithError>
> {
  try {
    const response = await HahowApi.Heroes.ListHeroesServer();

    return NextResponse.json(
      handleSuccess({
        count: response.data.length,
        data: response.data,
      })
    );
  } catch (e: any) {
    return handleError(e);
  }
}
