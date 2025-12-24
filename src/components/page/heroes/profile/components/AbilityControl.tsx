/*
 * @Author: JoeChen
 * @Date: 2025-12-24
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-24 19:39:12
 * @Description: Ability control component with increment/decrement buttons
 */

import styled from "styled-components";

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
  font-weight: 600;
  font-size: 1.125rem;
  min-width: 60px;
`;

const AbilityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ControlButton = styled.button`
  width: 50px;
  height: 50px;
  border: 2px solid black;
  border-radius: 4px;
  background-color: #fff;
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #f3f4f6;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    background-color: #e5e7eb;
  }
`;

const AbilityValue = styled.span`
  font-size: 1.25rem;
  font-weight: 500;
  min-width: 30px;
  text-align: center;
`;

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
