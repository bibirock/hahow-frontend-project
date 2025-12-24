/*
 * @Author: JoeChen
 * @Date: 2025-12-24
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-24 18:34:42
 * @Description: Heroes page view component
 */

"use client";

// modules
import styled from "styled-components";

// types
import { IPageViewProps } from "@/app/heroes/page";

// components
import HeroList from "./components/HeroList";

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

export default function PageView({ data }: { data: IPageViewProps }) {
  const { heroes } = data;

  return (
    <Container>
      <HeroList heroes={heroes} />
    </Container>
  );
}
