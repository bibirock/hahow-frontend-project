/*
 * @Author: JoeChen
 * @Date: 2025-12-23 22:49:33
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-25 17:10:06
 * @Description: 統一匯出 Client 端的 API Endpoint
 */

import ListHeroes from "@/lib/api-client/endpoints/hahow-api/heroes/listHeroes";
import GetHeroDetail from "@/lib/api-client/endpoints/hahow-api/heroes/getHeroDetail";
import GetHeroProfile from "@/lib/api-client/endpoints/hahow-api/heroes/getHeroProfile";
import PatchHeroProfile from "@/lib/api-client/endpoints/hahow-api/heroes/patchHeroProfile";

const NextHahowApi = {
  Heroes: {
    ListHeroes,
    GetHeroDetail,
    GetHeroProfile,
    PatchHeroProfile,
  },
};

export { NextHahowApi };
