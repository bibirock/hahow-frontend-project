/*
 * @Author: JoeChen
 * @Date: 2025-12-26
 * @Description: Error retry component with retry button
 */
"use client";

// modules
import { useRouter } from "next/navigation";
import styled from "styled-components";

// design tokens
import { colors } from "@/styles/tokens";

// #region Style

const Container = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${colors.text.error};
`;

const Title = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
`;

const RetryButton = styled.button`
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: ${colors.background.hover};
  color: ${colors.base.white};
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${colors.brand.primary};
  }

  &:active {
    background-color: ${colors.background.active};
  }
`;

// #endregion

export default function ErrorRetry() {
  const router = useRouter();

  const handleRetry = () => {
    // 重新整理當前頁面，觸發 Server Component 重新 fetch 資料
    router.refresh();
  };

  return (
    <Container>
      <Title>載入失敗，請稍後再試</Title>
      <RetryButton onClick={handleRetry}>重試</RetryButton>
    </Container>
  );
}
