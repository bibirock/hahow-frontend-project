/*
 * @Author: JoeChen
 * @Date: 2025-12-24 17:23:11
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-24 17:38:56
 * @Description:
 */

// components
import PageView from "@/components/page/heroes/PageView";

// api
import { HahowApi } from "@/lib/api-server/endpoints";

// types
import { IHeroesItem } from "@/lib/api-server/endpoints/hahow-api/heroes/listHeroes";

export interface IPageViewProps {
  heroes: IHeroesItem[];
}

export default async function HeroesPage() {
  const res = await HahowApi.Heroes.ListHeroesServer();

  const heroesData = res.data || [];

  const props: IPageViewProps = {
    heroes: heroesData,
  };

  return <PageView data={props} />;
}
