/*
 * @Author: JoeChen
 * @Date: 2025-12-24
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-24 19:02:01
 * @Description: Layout for heroes section with persistent hero list
 */

// api
import { HahowApi } from "@/lib/api-server/endpoints";

// components
import HeroesLayout from "@/components/page/heroes/PageView";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const res = await HahowApi.Heroes.ListHeroesServer();
  const heroesData = res.data || [];

  return <HeroesLayout heroes={heroesData}>{children}</HeroesLayout>;
}
