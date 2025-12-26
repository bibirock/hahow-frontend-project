/*
 * @Author: JoeChen
 * @Date: 2025-12-24
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-26 10:58:47
 * @Description: Ability control component with increment/decrement buttons
 */

import styled from "styled-components";

// design tokens
import { colors } from "@/styles/tokens";

// #region Style

const AbilityRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 2rem;
  padding: 1rem 0;

  @media (max-width: 640px) {
    gap: 1rem;
  }
`;

const AbilityLabel = styled.span`
  font-size: 1.125rem;
  min-width: 60px;
  color: ${colors.text.primary};
`;

const AbilityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ControlButton = styled.button`
  width: 50px;
  height: 50px;
  border: 2px solid ${colors.border.primary};
  border-radius: 8px;
  background-color: ${colors.background.primary};
  color: ${colors.text.primary};
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${colors.background.hover};
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    background-color: ${colors.background.active};
  }
`;

const AbilityValue = styled.span`
  font-size: 1.25rem;
  font-weight: 500;
  min-width: 30px;
  text-align: center;
  color: ${colors.text.primary};
`;

// #endregion

interface IAbilityControlProps {
  label: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  canIncrement: boolean;
  canDecrement: boolean;
}

export default function AbilityControl({
  label,
  value,
  onIncrement,
  onDecrement,
  canIncrement,
  canDecrement,
}: IAbilityControlProps) {
  return (
    <AbilityRow>
      <AbilityLabel>{label}</AbilityLabel>
      <AbilityControls>
        <ControlButton
          onClick={onDecrement}
          disabled={!canDecrement}
          aria-label={`Decrement ${label}`}
        >
          -
        </ControlButton>
        <AbilityValue>{value}</AbilityValue>
        <ControlButton
          onClick={onIncrement}
          disabled={!canIncrement}
          aria-label={`Increment ${label}`}
        >
          +
        </ControlButton>
      </AbilityControls>
    </AbilityRow>
  );
}
