/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: JoeChen
 * @Date: 2025-12-24
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-25 15:14:01
 * @Description: Next.js API route for hero profile (GET and PATCH)
 */

// module
import { NextRequest, NextResponse } from "next/server";
import { HahowApi } from "@/lib/api-server/endpoints";

// utils
import { handleError, handleSuccess } from "@/utils/server/handleResult";

// types
import { IPatchRequestDto, TGetResponse, TPatchResponse } from "./dto";
import { IBaseResponseWithError } from "@/lib/api-types/common";

export async function GET(
  _request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ heroId: string }>;
  }
): Promise<NextResponse<TGetResponse | IBaseResponseWithError>> {
  try {
    const { heroId } = await params;

    const response = await HahowApi.Heroes.GetHeroProfileServer(heroId);

    return NextResponse.json(handleSuccess(response.data));
  } catch (e: any) {
    return handleError(e);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ heroId: string }> }
): Promise<NextResponse<TPatchResponse | IBaseResponseWithError>> {
  try {
    const { heroId } = await params;
    const requestData: IPatchRequestDto = await request.json();

    const response = await HahowApi.Heroes.PatchHeroProfileServer(
      heroId,
      requestData.body
    );

    return NextResponse.json(handleSuccess(response.data));
  } catch (e: any) {
    return handleError(e);
  }
}
