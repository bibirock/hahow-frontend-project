/*
 * @Author: JoeChen
 * @Date: 2025-12-24
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-24 19:25:37
 * @Description: Save button component
 */

import styled from "styled-components";

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

interface ISaveButtonProps {
  onClick: () => void;
  disabled: boolean;
  isSaving: boolean;
}

export default function SaveButton({
  onClick,
  disabled,
  isSaving,
}: ISaveButtonProps) {
  return (
    <StyledSaveButton onClick={onClick} disabled={disabled}>
      {isSaving ? "儲存中..." : "儲存"}
    </StyledSaveButton>
  );
}
