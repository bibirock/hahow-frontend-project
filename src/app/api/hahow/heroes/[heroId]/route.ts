/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: JoeChen
 * @Date: 2025-12-24
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-24
 * @Description: Next.js API route for single hero detail
 */

// module
import { NextRequest, NextResponse } from "next/server";
import { HahowApi } from "@/lib/api-server/endpoints";

// utils
import { handleError, handleSuccess } from "@/utils/server/handleResult";

// types
import { IRequestDto } from "./dto";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const requestData: IRequestDto = await request.json();

    const response = await HahowApi.Heroes.GetHeroDetailServer(
      requestData.heroId
    );

    return NextResponse.json(handleSuccess(response.data));
  } catch (e: any) {
    return handleError(e);
  }
}
