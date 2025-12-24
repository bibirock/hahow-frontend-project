/*
 * @Author: JoeChen
 * @Date: 2025-12-24
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-24 19:02:20
 * @Description: Hero profile page with server-side data fetching
 */

// api
import { HahowApi } from "@/lib/api-server/endpoints";

// components
import PageView from "@/components/page/heroes/profile/PageView";

interface IHeroProfilePageProps {
  params: Promise<{
    heroId: string;
  }>;
}

export default async function HeroProfilePage({
  params,
}: IHeroProfilePageProps) {
  const { heroId } = await params;

  try {
    // Fetch both hero details and profile in parallel
    const [heroDetailRes, profileRes] = await Promise.all([
      HahowApi.Heroes.GetHeroDetailServer(heroId),
      HahowApi.Heroes.GetHeroProfileServer(heroId),
    ]);

    const heroDetail = heroDetailRes.data;
    const profile = profileRes.data;

    if (!heroDetail || !profile) {
      return (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          Hero not found
        </div>
      );
    }

    return <PageView heroId={heroId} hero={heroDetail} profile={profile} />;
  } catch (error) {
    console.error("Error fetching hero profile:", error);
    return (
      <div style={{ textAlign: "center", padding: "2rem", color: "#ef4444" }}>
        Failed to load hero profile
      </div>
    );
  }
}
