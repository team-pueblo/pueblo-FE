import styled from "styled-components";
import { ChevronDown } from "lucide-react";
import type { Product } from "./catalogApi";

const Information = styled.section`
  margin-top: 28px;
  color: #222;
  details { border-bottom: 1px solid #e5e5e5; }
  details:first-child { border-top: 1px solid #e5e5e5; }
  summary { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 22px 0; cursor: pointer; list-style: none; font-size: 14px; }
  summary::-webkit-details-marker { display: none; }
  summary:focus-visible { outline: 2px solid #222; outline-offset: 4px; }
  summary svg { flex-shrink: 0; }
  details[open] summary svg { transform: rotate(180deg); }
  p { margin: 0; padding: 0 0 24px; font-size: 13px; line-height: 1.9; white-space: pre-line; overflow-wrap: anywhere; }
  @media(max-width:768px) { margin-top: 24px; summary { padding: 18px 0; } }
`;

export default function ProductInformation({ product }: { product: Product }) {
  const developmentOnly = product.policy?.dataUsage === "LOCAL_DEVELOPMENT_ONLY";
  const policy = developmentOnly ? {} : product.policy;
  const sections = [
    { title: "상세 정보", text: (!developmentOnly && product.description?.trim()) || `${product.brand?.name ?? "pueblo"} · ${product.name}\n소재, 원산지 등 상세 정보는 준비 중입니다. 구매 전 상품 정보를 확인해주세요.` },
    { title: "배송 안내", text: policy?.shipping || "배송비와 배송 조건은 주문 시 확인해주세요.\n상품 준비 상황과 배송 지역에 따라 배송 일정이 달라질 수 있습니다." },
    { title: "반품 안내", text: policy?.returns || "교환·반품을 원하시면 주문 내역을 확인한 뒤 문의해주세요.\n상품 상태와 반품 사유에 따라 가능 여부 및 배송비가 달라질 수 있습니다. 구매 전 장바구니의 환불/교환 정책을 확인해주세요." },
    { title: "A/S 안내", text: policy?.service || "A/S 가능 여부와 접수 방법은 브랜드 및 상품에 따라 다릅니다.\n주문번호와 상품 상태를 확인한 뒤 문의해주세요." },
    { title: "세탁 및 취급 시 주의사항", text: policy?.care || "제품의 소재와 혼용률에 따라 세탁 및 취급 방법이 다릅니다.\n반드시 상품에 부착된 케어라벨과 제조사의 안내를 확인한 후 세탁·관리해주세요." },
  ];
  return <Information aria-label="상품 상세 및 이용 안내">
    {sections.map(section => <details key={section.title} open>
      <summary>{section.title}<ChevronDown size={16} aria-hidden="true" /></summary>
      <p>{section.text}</p>
    </details>)}
  </Information>;
}
