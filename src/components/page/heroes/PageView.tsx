/*
 * @Author: JoeChen
 * @Date: 2025-12-24
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-25 17:11:18
 * @Description: Heroes layout component with persistent hero list
 */

"use client";

// modules
import styled from "styled-components";
import { usePathname } from "next/navigation";

// components
import HeroList from "./components/HeroList";

// types
import { IResponseDto } from "@/lib/api-server/endpoints/hahow-api/heroes/listHeroes";

// #region Style

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const HeroListSection = styled.div`
  margin-bottom: 2rem;
`;

const ContentSection = styled.div`
  margin-top: 2rem;
`;

// #endregion

interface IHeroesLayoutProps {
  heroes: IResponseDto[];
  children: React.ReactNode;
}

export default function HeroesLayout({ heroes, children }: IHeroesLayoutProps) {
  const pathname = usePathname();

  // 提取當前活躍的 heroId
  const heroIdMatch = pathname.match(/^\/heroes\/([^/]+)$/);
  const activeHeroId = heroIdMatch ? heroIdMatch[1] : null;

  return (
    <Container>
      <HeroListSection>
        <HeroList heroes={heroes} activeHeroId={activeHeroId} />
      </HeroListSection>
      <ContentSection>{children}</ContentSection>
    </Container>
  );
}
