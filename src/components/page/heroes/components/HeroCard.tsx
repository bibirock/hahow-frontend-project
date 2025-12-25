/*
 * @Author: JoeChen
 * @Date: 2025-12-24
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-25 17:13:32
 * @Description: Hero Card component
 */

// modules
import Link from "next/link";
import styled from "styled-components";

// types
import { IResponseDto } from "@/lib/api-server/endpoints/hahow-api/heroes/listHeroes";

// #region Style

const StyledCard = styled(Link)<{ $isActive?: boolean }>`
  display: flex;
  flex-direction: column;
  border: ${(props) =>
    props.$isActive ? "3px solid #ff6600" : "1px solid black"};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${(props) =>
    props.$isActive
      ? "0 4px 6px -1px rgba(255, 102, 0, 0.3)"
      : "0 1px 3px 0 rgba(0, 0, 0, 0.1)"};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  aspect-ratio: 1;
  width: 100%;
  overflow: hidden;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 1rem;
`;

const HeroName = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
`;

// #endregion

interface IHeroCardProps {
  hero: IResponseDto;
  isActive?: boolean;
}

export default function HeroCard({ hero, isActive = false }: IHeroCardProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // 如果點擊的是已選中的英雄，阻止導航
    if (isActive) {
      e.preventDefault();
    }
  };

  return (
    <StyledCard
      href={`/heroes/${hero.id}`}
      $isActive={isActive}
      onClick={handleClick}
    >
      <ImageContainer>
        <HeroImage src={hero.image} alt={hero.name} />
      </ImageContainer>
      <CardContent>
        <HeroName>{hero.name}</HeroName>
      </CardContent>
    </StyledCard>
  );
}
