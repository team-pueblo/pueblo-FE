import React, { useState, useCallback } from "react";
import {
  WishlistSectionStyled,
  SectionHeader,
  SectionTitle,
  MoreLink,
  ProductGrid,
} from "./WishlistSection.styled";
import { Link } from "react-router-dom";
import { ProductCard } from "./ProductCard";

interface Product {
  id: number;
  image: string;
  brand: string;
  name: string;
  price: number;
  isQuickDelivery?: boolean;
}

interface WishlistSectionProps {
  products?: Product[];
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    image: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA4MzFfMjAz%2FMDAxNzU2NjM1ODY1NDIx.TlfzjTeKCYXNj2Crnkdaq-BY21mWlWe-dqv1IwukzmMg.tTOwjy5yj9sYOcQJarmsqRAk_e5Qlw1M8b5vmU-0XPQg.JPEG%2FF891D715%25A3%25AD0F10%25A3%25AD41CB%25A3%25ADBD4D%25A3%25AD50CD86E6A76E.jpg&type=sc960_832",
    brand: "FILA",
    name: "휠라 X 봉태규 콜라보 하레핀 브라운&퍼플",
    price: 117000,
    isQuickDelivery: true,
  },
  {
    id: 2,
    image: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA5MTFfMTA0%2FMDAxNzU3NTcyODMzMjk3.-oWQl8Gy651xjL-d_krR3owKzUYvMlntN530s8hQJGkg.Zw20GZJuCOs09ArCbZlCHmM-CEAqnlPoWQaGu7P7gvUg.PNG%2F0002.png&type=sc960_832",
    brand: "FILA",
    name: "Adidas Adizero EVO SL Cloud White Core Black",
    price: 169000,
    isQuickDelivery: true,
  },
  {
    id: 3,
    image: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA5MTFfMTA0%2FMDAxNzU3NTcyODMzMjk3.-oWQl8Gy651xjL-d_krR3owKzUYvMlntN530s8hQJGkg.Zw20GZJuCOs09ArCbZlCHmM-CEAqnlPoWQaGu7P7gvUg.PNG%2F0002.png&type=sc960_832",
    brand: "FILA",
    name: "Pop Mart Labubu The Monsters Highlight Series Sealed Case (Bundle of 2/...)",
    price: 60000,
  },
  {
    id: 4,
    image: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA5MTFfMTA0%2FMDAxNzU3NTcyODMzMjk3.-oWQl8Gy651xjL-d_krR3owKzUYvMlntN530s8hQJGkg.Zw20GZJuCOs09ArCbZlCHmM-CEAqnlPoWQaGu7P7gvUg.PNG%2F0002.png&type=sc960_832",
    brand: "FILA",
    name: "Pop Mart Labubu The Monsters Highlight Series Serenity Keyring (Opened...)",
    price: 29000,
  },
  {
    id: 5,
    image: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA5MTFfMTA0%2FMDAxNzU3NTcyODMzMjk3.-oWQl8Gy651xjL-d_krR3owKzUYvMlntN530s8hQJGkg.Zw20GZJuCOs09ArCbZlCHmM-CEAqnlPoWQaGu7P7gvUg.PNG%2F0002.png&type=sc960_832",
    brand: "FILA",
    name: "Pop Mart Labubu Coca Cola Series Surprise Shake Keyring (Opened Case)",
    price: 62000,
  },
  {
    id: 6,
    image: "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fkream-phinf.pstatic.net%2FMjAyNTA5MTdfMjg5%2FMDAxNzU4MDY3ODY2MTA0.xeayWF7fji0B2p9eTmDybKl0JW4IFaryFuhuPItD6_og.7MZNNzY6lWOEit9k5OXso8sS_Zm95syAMMl2mQM9rF0g.JPEG%2Fp_ca31c9ff7c8b432bac920339cd2b2b4f.jpeg%3Ftype%3Dl_webp&type=sc960_832",
    brand: "FILA",
    name: " 하레핀 1998 베이지 | FILA Harepin 1998 Beige",
    price: 184000,
  },
  {
    id: 7,
    image: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA5MTFfMTEx%2FMDAxNzU3NTcyODI0NDMy.GA1K2RFn_R_fNeRfGC6mXrfAQAI3XmJpR3YHJVEWv6gg.Obc1PJWlZInZcUgvjNaOgN99p3otredlCyIk8KhBkNAg.PNG%2F0013.png&type=sc960_832",
    brand: "FILA",
    name: " 하레핀 1998 베이지 | FILA Harepin 1998 Red",
    price: 202010,
    isQuickDelivery: true,
  },
  {
    id: 8,
    image: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA5MTFfMjc2%2FMDAxNzU3NTcyODM3Mjcx.VOsKcTxqVEmgy0GCI3RvdPUZOX2jvS02PP_UkPc3c_Eg.TPjLOAlHo_YUxPHJPtCas8C5DIRCQGueFpyCgO0Dqwgg.PNG%2F0010.png&type=sc960_832",
    brand: "FILA",
    name: " 하레핀 1998 옐로우 | FILA Harepin 1998 Yellow",
    price: 184000,
    isQuickDelivery: true,
  },
];

export const WishlistSection: React.FC<WishlistSectionProps> = ({
  products = MOCK_PRODUCTS,
}) => {
  const [items, setItems] = useState<Product[]>(products);

  const handleRemove = useCallback((id: number) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <WishlistSectionStyled>
      <SectionHeader>
        <SectionTitle>관심 상품</SectionTitle>
        <MoreLink as={Link} to="/mypage/favorites">더보기 &gt;</MoreLink>
      </SectionHeader>
      
      <ProductGrid>
        {items.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            brand={product.brand}
            name={product.name}
            price={product.price}
            isQuickDelivery={product.isQuickDelivery}
            onRemove={() => handleRemove(product.id)}
          />
        ))}
      </ProductGrid>
    </WishlistSectionStyled>
  );
};
