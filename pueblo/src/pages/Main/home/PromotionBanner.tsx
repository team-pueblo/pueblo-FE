import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { promotions } from "./homeContent";
import * as S from "./Home.styled";

export default function PromotionBanner() {
  const [index, setIndex] = useState(0);
  const promotion = promotions[index];
  const move = (offset: number) => setIndex((current) => (current + offset + promotions.length) % promotions.length);

  return <S.Hero aria-label="pueblo 기획전" aria-roledescription="캐러셀">
    <S.HeroLink to={promotion.to} aria-label={`${promotion.title.replace("\n", " ")} 기획전 보기`}>
      <S.HeroImage src={promotion.image} alt="" $campaign={promotion.campaign} fetchPriority="high" />
      <S.HeroCopy><h1>{promotion.title}</h1><p>{promotion.description}</p></S.HeroCopy>
    </S.HeroLink>
    <S.Arrow type="button" $direction="previous" onClick={() => move(-1)} aria-label="이전 기획전"><ChevronLeft size={40} strokeWidth={1.3} /></S.Arrow>
    <S.Arrow type="button" $direction="next" onClick={() => move(1)} aria-label="다음 기획전"><ChevronRight size={40} strokeWidth={1.3} /></S.Arrow>
    <S.Pagination role="status" aria-live="polite" aria-atomic="true"><span className="sr-only" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clipPath: "inset(50%)" }}>기획전 </span>{index + 1} / {promotions.length}</S.Pagination>
  </S.Hero>;
}
