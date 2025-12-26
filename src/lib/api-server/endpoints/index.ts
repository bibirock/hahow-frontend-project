/*
 * @Author: JoeChen
 * @Date: 2025-12-23 21:53:53
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-24
 * @Description:
 */

import ListHeroesServer from "./hahow-api/heroes/listHeroes";
import GetHeroDetailServer from "./hahow-api/heroes/getHeroDetail";
import GetHeroProfileServer from "./hahow-api/heroes/getHeroProfile";
import PatchHeroProfileServer from "./hahow-api/heroes/patchHeroProfile";

const HahowApi = {
  Heroes: {
    ListHeroesServer,
    GetHeroDetailServer,
    GetHeroProfileServer,
    PatchHeroProfileServer,
  },
};

export { HahowApi };
