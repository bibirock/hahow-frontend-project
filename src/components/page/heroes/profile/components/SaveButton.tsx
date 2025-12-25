/*
 * @Author: JoeChen
 * @Date: 2025-12-24
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-24 19:25:37
 * @Description: Save button component
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

const StyledSaveButton = styled.button`
  padding: 0.875rem 3rem;
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  background-color: #e5e7eb;
  border: 2px solid #333;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #d1d5db;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    background-color: #9ca3af;
  }
`;

const HintMessage = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
  text-align: right;

  @media (max-width: 768px) {
    text-align: left;
  }
`;

// #endregion

interface ISaveButtonProps {
  onClick: () => void;
  disabled: boolean;
  isSaving: boolean;
  hasChanges: boolean;
  remainingPoints: number;
}

export default function SaveButton({
  onClick,
  disabled,
  isSaving,
  hasChanges,
  remainingPoints,
}: ISaveButtonProps) {
  const getHintMessage = () => {
    if (isSaving) return null;
    if (!hasChanges) return "尚未進行任何變更";
    if (remainingPoints > 0) return null; // 這個提示已在 PointsDisplay 顯示
    return null;
  };

  const hintMessage = getHintMessage();

  return (
    <Container>
      <StyledSaveButton onClick={onClick} disabled={disabled}>
        {isSaving ? "儲存中..." : "儲存"}
      </StyledSaveButton>
      {hintMessage && <HintMessage>{hintMessage}</HintMessage>}
    </Container>
  );
}
