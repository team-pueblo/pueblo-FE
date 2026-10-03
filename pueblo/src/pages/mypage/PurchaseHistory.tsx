import React from "react";
import { PurchaseHistoryStyled, SectionTitleStyled, StatsGridStyled, StatCardStyled, StatNumberStyled, StatLabelStyled, PurchaseListStyled } from "./PurchaseHistory.styled";
import { PurchaseItem } from "./PurchaseItem";
interface PurchaseStats {
  total: number;
  shipping: number;
  delivered: number;
}

interface PurchaseHistoryProps {
  stats?: PurchaseStats;
}

const MOCK_PURCHASES = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400",
    name: "Supreme Mesh Mini Duffle Bag Black - 25SS",
    size: '275mm',
    status: "기한만료" as const,
    statusColor: "error" as const,
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=400",
    name: "Ader Error Sig; TRS Tag T-Shirt 01 Noir",
    size: "L",
    status: "배송완료" as const,
    statusColor: "secondary" as const,
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=400",
    name: "Stussy Pigment Dyed Classic Gear T-Shirt Natural",
    size: 'M',
    status: "기한만료" as const,
    statusColor: "error" as const,
  },
];

export const PurchaseHistory: React.FC<PurchaseHistoryProps> = ({
  stats = {
    total: 169,
    shipping: 151,
    delivered: 18,
  },
}) => {
  return (
    <PurchaseHistoryStyled>
      <SectionTitleStyled>구매 내역</SectionTitleStyled>
      
      <StatsGridStyled>
        <StatCardStyled>
          <StatLabelStyled>전체</StatLabelStyled>
          <StatNumberStyled>{stats.total}</StatNumberStyled>
        </StatCardStyled>
        <StatCardStyled>
          <StatLabelStyled>배송중</StatLabelStyled>
          <StatNumberStyled>{stats.shipping}</StatNumberStyled>
        </StatCardStyled>
        <StatCardStyled>
          <StatLabelStyled>배송완료</StatLabelStyled>
          <StatNumberStyled>{stats.delivered}</StatNumberStyled>
        </StatCardStyled>
      </StatsGridStyled>

      <PurchaseListStyled>
        {MOCK_PURCHASES.map((purchase) => (
          <PurchaseItem
            key={purchase.id}
            imageUrl={purchase.imageUrl}
            name={purchase.name}
            size={purchase.size}
            status={purchase.status}
            statusColor={purchase.statusColor}
          />
        ))}
      </PurchaseListStyled>
    </PurchaseHistoryStyled>
  );
};
