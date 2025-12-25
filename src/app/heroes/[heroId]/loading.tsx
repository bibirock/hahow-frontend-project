"use client";
import styled, { keyframes } from "styled-components";

// #region Style

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const Container = styled.div`
  max-width: 872px;
  margin: 0 auto;
  padding: 2.5rem;
  border: 2px solid white;
  border-radius: 4px;
  background-color: #2d2d2d;
  display: flex;
  gap: 3rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 2rem;
  align-items: flex-end;
  min-width: 200px;

  @media (max-width: 768px) {
    align-items: stretch;
  }
`;

const SkeletonPulse = styled.div`
  display: block;
  height: 100%;
  width: 100%;
  background: linear-gradient(to right, #3d3d3d 8%, #4d4d4d 18%, #3d3d3d 33%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.2s linear infinite forwards;
`;

const SkeletonRow = styled.div`
  height: 60px;
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  background-color: #3d3d3d;
`;

const SkeletonPoints = styled.div`
  height: 100px;
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  background-color: #3d3d3d;
`;

const SkeletonButton = styled.div`
  height: 50px;
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  background-color: #3d3d3d;
`;

// #endregion

export default function Loading() {
  return (
    <Container>
      <LeftSection>
        {[1, 2, 3, 4].map((i) => (
          <SkeletonRow key={i}>
            <SkeletonPulse />
          </SkeletonRow>
        ))}
      </LeftSection>
      <RightSection>
        <SkeletonPoints>
          <SkeletonPulse />
        </SkeletonPoints>
        <SkeletonButton>
          <SkeletonPulse />
        </SkeletonButton>
      </RightSection>
    </Container>
  );
}
