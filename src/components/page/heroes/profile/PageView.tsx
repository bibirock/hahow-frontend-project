/*
 * @Author: JoeChen
 * @Date: 2025-12-24
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-25 17:14:32
 * @Description: Hero profile view component with ability controls
 */

"use client";

// modules
import { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

// components
import AbilityControl from "./components/AbilityControl";
import PointsDisplay from "./components/PointsDisplay";
import SaveButton from "./components/SaveButton";

// types
import { IResponseDto as HeroProfile } from "@/app/api/hahow/heroes/[heroId]/profile/dto";
import { IResponseDto as HeroDetail } from "@/lib/api-server/endpoints/hahow-api/heroes/getHeroDetail";

// api
import { NextHahowApi } from "@/lib/api-client/endpoints";

// #region Style

const ProfileContainer = styled.div`
  max-width: 872px;
  margin: 0 auto;
  padding: 2.5rem;
  border: 2px solid #333;
  border-radius: 4px;
  background-color: #fff;
  display: flex;
  gap: 3rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 2rem;
  align-items: flex-end;

  @media (max-width: 768px) {
    align-items: stretch;
  }
`;

// #endregion

interface IHeroProfileViewProps {
  heroId: string;
  hero: HeroDetail;
  profile: HeroProfile;
}

// 從 DTO 動態推導能力值的 key，當 API 新增欄位時會自動更新
type AbilityKey = keyof HeroProfile;

// 將能力值 key 轉換為顯示標籤（自動轉大寫）
const getAbilityLabel = (key: AbilityKey): string => {
  return key.toUpperCase();
};

// 動態計算能力值總和
const calculateTotal = (profile: HeroProfile): number => {
  return Object.values(profile).reduce((sum, val) => sum + val, 0);
};

export default function HeroProfileView({
  heroId,
  profile,
}: IHeroProfileViewProps) {
  const [initialProfile, setInitialProfile] = useState<HeroProfile>(profile);
  const [abilities, setAbilities] = useState<HeroProfile>(profile);
  const [isSaving, setIsSaving] = useState(false);

  // 初始化能力值總和（動態計算）
  const initialTotal = calculateTotal(initialProfile);

  // 計算目前能力值總和（動態計算）
  const currentTotal = calculateTotal(abilities);

  // 計算剩餘點數
  const remainingPoints = initialTotal - currentTotal;

  // 檢查能力值是否有變動（動態比較）
  const hasChanges = (Object.keys(abilities) as AbilityKey[]).some(
    (key) => abilities[key] !== initialProfile[key]
  );

  const handleIncrement = (ability: AbilityKey) => {
    setAbilities((prev) => ({
      ...prev,
      [ability]: prev[ability] + 1,
    }));
  };

  const handleDecrement = (ability: AbilityKey) => {
    if (abilities[ability] > 0) {
      setAbilities((prev) => ({
        ...prev,
        [ability]: prev[ability] - 1,
      }));
    }
  };

  const handleSave = async () => {
    if (currentTotal !== initialTotal) {
      toast.error(`能力值總和必須維持 ${initialTotal}，目前為 ${currentTotal}`);
      return;
    }

    const hasNegative = Object.values(abilities).some((val) => val < 0);
    if (hasNegative) {
      toast.error("能力值不能小於 0");
      return;
    }

    setIsSaving(true);

    try {
      const response = await NextHahowApi.Heroes.PatchHeroProfile(
        heroId,
        abilities
      );

      if (response?.error) {
        toast.error(response.error.message || "儲存失敗，請稍後再試");
      } else {
        toast.success("儲存成功！");

        // 儲存成功後，更新初始資料以反映最新狀態
        const updatedProfileResponse = await NextHahowApi.Heroes.GetHeroProfile(
          heroId
        );

        if (updatedProfileResponse.result && !updatedProfileResponse.error) {
          setInitialProfile(updatedProfileResponse.result);
          setAbilities(updatedProfileResponse.result);
        }
      }
    } catch (err) {
      toast.error(`儲存失敗，請稍後再試 ${err}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ProfileContainer>
      <LeftSection>
        {(Object.keys(abilities) as AbilityKey[]).map((key) => (
          <AbilityControl
            key={key}
            label={getAbilityLabel(key)}
            value={abilities[key]}
            onIncrement={() => handleIncrement(key)}
            onDecrement={() => handleDecrement(key)}
            canIncrement={remainingPoints > 0}
            canDecrement={abilities[key] > 0}
          />
        ))}
      </LeftSection>

      <RightSection>
        <PointsDisplay remainingPoints={remainingPoints} />
        <SaveButton
          onClick={handleSave}
          disabled={isSaving || !hasChanges}
          isSaving={isSaving}
        />
      </RightSection>
    </ProfileContainer>
  );
}
