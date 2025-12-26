/*
 * @Author: JoeChen
 * @Date: 2025-12-24
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-26 11:43:12
 * @Description: Points display component
 */

import styled from "styled-components";

// design tokens
import { colors } from "@/styles/tokens";

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
  color: ${colors.text.primary};
`;

const PointsValue = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${colors.text.primary};
`;

const WarningMessage = styled.p`
  font-size: 0.875rem;
  color: ${colors.text.warning};
  margin: 0;
  text-align: right;

  @media (max-width: 768px) {
    text-align: left;
  }
`;

const HintMessage = styled.p`
  font-size: 0.875rem;
  color: ${colors.text.tertiary};
  margin: 0;
  text-align: right;

  @media (max-width: 768px) {
    text-align: left;
  }
`;

// #endregion

interface IPointsDisplayProps {
  remainingPoints: number;
  hasChanges: boolean;
}

export default function PointsDisplay({
  remainingPoints,
  hasChanges,
}: IPointsDisplayProps) {
  return (
    <Container>
      <PointsSection>
        <PointsLabel>剩餘點數:</PointsLabel>
        <PointsValue>{remainingPoints}</PointsValue>
      </PointsSection>
      {remainingPoints > 0 && (
        <WarningMessage>
          需使用完剩餘點數才能儲存，否則 Hero 會哭哭呦！
        </WarningMessage>
      )}
      {!hasChanges && remainingPoints === 0 && (
        <HintMessage>
          Hero 的能力必須平均分配，您需要移除其他點數才能進行分配與儲存。
        </HintMessage>
      )}
    </Container>
  );
}
