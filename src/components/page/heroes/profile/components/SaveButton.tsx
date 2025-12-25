/*
 * @Author: JoeChen
 * @Date: 2025-12-24
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-25 23:24:11
 * @Description: Save button component
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

const StyledSaveButton = styled.button`
  padding: 0.875rem 3rem;
  font-size: 1rem;
  font-weight: 500;
  color: ${colors.text.primary};
  background-color: ${colors.background.primary};
  border: 2px solid ${colors.border.primary};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${colors.background.hover};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    background-color: ${colors.background.active};
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
}: ISaveButtonProps) {
  return (
    <Container>
      <StyledSaveButton onClick={onClick} disabled={disabled}>
        {isSaving ? "儲存中..." : "儲存"}
      </StyledSaveButton>
    </Container>
  );
}
