/*
 * @Author: JoeChen
 * @Date: 2025-12-24
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-24 18:36:02
 * @Description: Hero List component
 */

// modules
import styled from "styled-components";

// components
import HeroCard from "./HeroCard";

// types
import { IHeroesItem } from "@/lib/api-server/endpoints/hahow-api/heroes/listHeroes";

// #region Style

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: flex-start;
  max-width: fit-content;
  margin: 0 auto;
`;

const CardWrapper = styled.div`
  /* 大螢幕：固定寬度，由左到右排列 */
  width: 200px;

  /* 小螢幕：每行1個 */
  @media (max-width: 510px) {
    width: 100%;
  }
`;

// #endregion

interface IHeroListProps {
  heroes: IHeroesItem[];
  activeHeroId?: string | null;
}

export default function HeroList({ heroes, activeHeroId }: IHeroListProps) {
  if (heroes.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "2rem", color: "#6b7280" }}>
        No heroes found
      </div>
    );
  }

  return (
    <ListContainer>
      {heroes.map((hero) => (
        <CardWrapper key={hero.id}>
          <HeroCard hero={hero} isActive={activeHeroId === hero.id} />
        </CardWrapper>
      ))}
    </ListContainer>
  );
}
