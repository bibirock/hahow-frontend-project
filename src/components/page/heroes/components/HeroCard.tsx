/*
 * @Author: JoeChen
 * @Date: 2025-12-24
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-24 18:35:48
 * @Description: Hero Card component
 */

// modules
import Link from "next/link";
import styled from "styled-components";

// types
import { IHeroesItem } from "@/lib/api-server/endpoints/hahow-api/heroes/listHeroes";

const StyledCard = styled(Link)`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

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

interface IHeroCardProps {
  hero: IHeroesItem;
}

export default function HeroCard({ hero }: IHeroCardProps) {
  return (
    <StyledCard href={`/heroes/${hero.id}`}>
      <ImageContainer>
        <HeroImage src={hero.image} alt={hero.name} />
      </ImageContainer>
      <CardContent>
        <HeroName>{hero.name}</HeroName>
      </CardContent>
    </StyledCard>
  );
}
