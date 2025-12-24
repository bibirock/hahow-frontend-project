/*
 * @Author: JoeChen
 * @Date: 2025-12-24
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-24 19:25:32
 * @Description: Points display component
 */

import styled from "styled-components";

const PointsSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PointsLabel = styled.span`
  font-size: 1rem;
  font-weight: 500;
`;

const PointsValue = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
`;

interface IPointsDisplayProps {
  remainingPoints: number;
}

export default function PointsDisplay({
  remainingPoints,
}: IPointsDisplayProps) {
  return (
    <PointsSection>
      <PointsLabel>剩餘點數:</PointsLabel>
      <PointsValue>{remainingPoints}</PointsValue>
    </PointsSection>
  );
}
