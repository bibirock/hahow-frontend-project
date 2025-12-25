/*
 * @Author: JoeChen
 * @Date: 2025-12-24
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-24 19:25:32
 * @Description: Points display component
 */

import styled from "styled-components";

// #region Style

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-end;

  @media (max-width: 768px) {
    align-items: stretch;
  }
`;

const PointsSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PointsLabel = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: white;
`;

const PointsValue = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
`;

const WarningMessage = styled.p`
  font-size: 0.875rem;
  color: #dc2626;
  margin: 0;
`;

// #endregion

interface IPointsDisplayProps {
  remainingPoints: number;
}

export default function PointsDisplay({
  remainingPoints,
}: IPointsDisplayProps) {
  return (
    <Container>
      <PointsSection>
        <PointsLabel>剩餘點數:</PointsLabel>
        <PointsValue>{remainingPoints}</PointsValue>
      </PointsSection>
      {remainingPoints > 0 && (
        <WarningMessage>必須使用完剩餘點數才能儲存</WarningMessage>
      )}
    </Container>
  );
}
