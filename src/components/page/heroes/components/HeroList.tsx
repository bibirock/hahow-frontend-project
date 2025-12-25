/*
 * @Author: JoeChen
 * @Date: 2025-12-24
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-25 23:36:21
 * @Description: Hero List component
 */

// modules
import styled from "styled-components";

// components
import HeroCard from "./HeroCard";

// types
import { IResponseDto } from "@/lib/api-server/endpoints/hahow-api/heroes/listHeroes";

// design tokens
import { colors } from "@/styles/tokens";

// #region Style

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 872px;
  margin: 0 auto;

  /* 小螢幕：每行1個 */
  @media (max-width: 510px) {
    grid-template-columns: 1fr;
  }
`;

const CardWrapper = styled.div`
  width: 100%;
`;

// #endregion

interface IHeroListProps {
  heroes: IResponseDto[];
  activeHeroId?: string | null;
}

export default function HeroList({ heroes, activeHeroId }: IHeroListProps) {
  if (heroes.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "2rem",
          color: colors.text.secondary,
        }}
      >
        資料異常，請稍候再試
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
