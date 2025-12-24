/*
 * @Author: JoeChen
 * @Date: 2025-12-24
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-24 19:38:47
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
import { IHeroProfile } from "@/app/api/hahow/heroes/[heroId]/profile/dto";
import { IHeroDetail } from "@/lib/api-server/endpoints/hahow-api/heroes/getHeroDetail";

// api
import { NextHahowApi } from "@/lib/api-client/endpoints";

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

interface IHeroProfileViewProps {
  heroId: string;
  hero: IHeroDetail;
  profile: IHeroProfile;
}

type AbilityKey = "str" | "int" | "agi" | "luk";

const ABILITY_LABELS: Record<AbilityKey, string> = {
  str: "STR",
  int: "INT",
  agi: "AGI",
  luk: "LUK",
};

export default function HeroProfileView({
  heroId,
  profile,
}: IHeroProfileViewProps) {
  const [abilities, setAbilities] = useState<IHeroProfile>(profile);
  const [isSaving, setIsSaving] = useState(false);

  const initialTotal = profile.str + profile.int + profile.agi + profile.luk;
  const currentTotal =
    abilities.str + abilities.int + abilities.agi + abilities.luk;
  const remainingPoints = initialTotal - currentTotal;

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

      if (response.error) {
        toast.error(response.error.message || "儲存失敗，請稍後再試");
      } else {
        toast.success("儲存成功！");
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
        {(Object.keys(ABILITY_LABELS) as AbilityKey[]).map((key) => (
          <AbilityControl
            key={key}
            label={ABILITY_LABELS[key]}
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
          disabled={isSaving}
          isSaving={isSaving}
        />
      </RightSection>
    </ProfileContainer>
  );
}
