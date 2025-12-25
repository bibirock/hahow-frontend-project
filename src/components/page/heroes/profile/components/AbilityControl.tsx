/*
 * @Author: JoeChen
 * @Date: 2025-12-24
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-25 23:24:06
 * @Description: Ability control component with increment/decrement buttons
 */

import styled from "styled-components";

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
  color: white;
`;

const AbilityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ControlButton = styled.button`
  width: 50px;
  height: 50px;
  border: 2px solid white;
  border-radius: 8px;
  background-color: #2d2d2d;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #3d3d3d;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    background-color: #4d4d4d;
  }
`;

const AbilityValue = styled.span`
  font-size: 1.25rem;
  font-weight: 500;
  min-width: 30px;
  text-align: center;
  color: white;
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
          onClick={onIncrement}
          disabled={!canIncrement}
          aria-label={`Increment ${label}`}
        >
          +
        </ControlButton>
        <AbilityValue>{value}</AbilityValue>
        <ControlButton
          onClick={onDecrement}
          disabled={!canDecrement}
          aria-label={`Decrement ${label}`}
        >
          -
        </ControlButton>
      </AbilityControls>
    </AbilityRow>
  );
}
