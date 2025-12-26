/*
 * @Author: JoeChen
 * @Date: 2025-12-24
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-26 12:04:57
 * @Description: Hero profile page with server-side data fetching
 */

// modules
import { Metadata, ResolvingMetadata } from "next";
import { cache } from "react";

// api
import { HahowApi } from "@/lib/api-server/endpoints";
import PageView from "@/components/page/heroes/profile/PageView";
import ErrorRetry from "@/components/common/ErrorRetry";

// 使用快取保留重複 id 會取用快取的結果，減少重複請求
const getHeroDetail = cache((heroId: string) =>
  HahowApi.Heroes.GetHeroDetailServer(heroId)
);
const getHeroProfile = cache((heroId: string) =>
  HahowApi.Heroes.GetHeroProfileServer(heroId)
);

interface IHeroProfilePageProps {
  params: Promise<{
    heroId: string;
  }>;
}

export async function generateMetadata(
  { params }: IHeroProfilePageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { heroId } = await params;

  try {
    const heroDetailRes = await getHeroDetail(heroId);
    const heroDetail = heroDetailRes.data;

    if (!heroDetail || !heroDetail.name) {
      return {
        title: "Hero not found",
        description: "陳智文的面試專案 - Hahow Heroes",
      };
    }

    return {
      title: `${heroDetail.name}'s profile`,
      description: `View ${heroDetail.name}'s hero profile and abilities - 陳智文的面試專案`,
    };
  } catch {
    const parentMetadata = await parent;
    return {
      title: parentMetadata.title?.absolute || "Hahow Heroes",
      description: "陳智文的面試專案 - Hahow Heroes",
    };
  }
}

export default async function HeroProfilePage({
  params,
}: IHeroProfilePageProps) {
  const { heroId } = await params;

  let data;

  try {
    data = await Promise.all([getHeroDetail(heroId), getHeroProfile(heroId)]);
  } catch (e) {
    return <ErrorRetry />;
  }

  const [heroDetailRes, profileRes] = data;
  const heroDetail = heroDetailRes.data;
  const profile = profileRes.data;

  if (!heroDetail || !profile) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        找不到 Hero 資料
      </div>
    );
  }

  return <PageView heroId={heroId} hero={heroDetail} profile={profile} />;
}
