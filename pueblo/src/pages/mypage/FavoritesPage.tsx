import React, { useMemo, useState } from "react";
import {
  TabsRow,
  Tab,
  FiltersRow,
  Chip,
  RadioGroup,
  RadioItem,
  List,
  Row,
  Left,
  Thumb,
  Info,
  Brand,
  Name,
  SizeText,
  Right,
  Price,
  LikeButton,
} from "./FavoritesPage.styled.ts";
import { LikeIcon } from "./LikeIcon";
import {
  ContainerStyled,
  ContentWrapperStyled,
  SidebarStyled,
  MainContentStyled,
  PageTitleStyled,
} from "./MyPage.styled";
import { SidebarNavigation } from "./SidebarNavigation";

interface FavoriteItem {
  id: number;
  image: string;
  brand: string;
  name: string;
  size?: string;
  price: number;
}

const MOCK_FAVORITES: FavoriteItem[] = [
  {
    id: 1,
    image:
      "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA4MzFfMjAz%2FMDAxNzU2NjM1ODY1NDIx.TlfzjTeKCYXNj2Crnkdaq-BY21mWlWe-dqv1IwukzmMg.tTOwjy5yj9sYOcQJarmsqRAk_e5Qlw1M8b5vmU-0XPQg.JPEG%2FF891D715%25A3%25AD0F10%25A3%25AD41CB%25A3%25ADBD4D%25A3%25AD50CD86E6A76E.jpg&type=sc960_832",
    brand: "Adidas",
    name: "Adidas Adizero EVO SL Cloud White Core Black",
    size: "285",
    price: 152000,
  },
  {
    id: 2,
    image:
      "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA5MTFfMTA0%2FMDAxNzU3NTcyODMzMjk3.-oWQl8Gy651xjL-d_krR3owKzUYvMlntN530s8hQJGkg.Zw20GZJuCOs09ArCbZlCHmM-CEAqnlPoWQaGu7P7gvUg.PNG%2F0002.png&type=sc960_832",
    brand: "Pop Mart",
    name: "Pop Mart Labubu The Monsters Highlight Series Sealed Case (Bundle of 2/1 Blind Box)",
    size: "ONE SIZE",
    price: 56000,
  },
  {
    id: 3,
    image:
      "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA5MTFfMTA0%2FMDAxNzU3NTcyODMzMjk3.-oWQl8Gy651xjL-d_krR3owKzUYvMlntN530s8hQJGkg.Zw20GZJuCOs09ArCbZlCHmM-CEAqnlPoWQaGu7P7gvUg.PNG%2F0002.png&type=sc960_832",
    brand: "Pop Mart",
    name: "Pop Mart Labubu The Monsters Highlight Series Serenity Keyring (Opened Case)",
    size: "ONE SIZE",
    price: 28000,
  },
];

const FavoritesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("상품");
  const items = useMemo(() => MOCK_FAVORITES, []);

  return (
    <ContainerStyled>
      <ContentWrapperStyled>
        <SidebarStyled>
          <PageTitleStyled>관심</PageTitleStyled>
          <SidebarNavigation />
        </SidebarStyled>
        <MainContentStyled>
          <TabsRow>
            {(["상품", "스타일", "브랜드", "최근 본 상품"] as const).map((t) => (
              <Tab key={t} $active={t === activeTab} onClick={() => setActiveTab(t)}>
                {t}
              </Tab>
            ))}
          </TabsRow>

          <FiltersRow>
            <div>
              <Chip $active>전체</Chip>
              <Chip>신발</Chip>
              <Chip>컬렉터블</Chip>
              <Chip>아우터</Chip>
              <Chip>패션잡화</Chip>
            </div>
            <RadioGroup>
              <RadioItem>
                <input type="radio" name="status" defaultChecked />
                <span>정가 이하</span>
              </RadioItem>
              <RadioItem>
                <input type="radio" name="status2" />
                <span>품절 제외</span>
              </RadioItem>
            </RadioGroup>
          </FiltersRow>

          <List>
            {items.map((item) => (
              <Row key={item.id}>
                <Left>
                  <Thumb src={item.image} alt={item.name} />
                  <Info>
                    <Brand>{item.brand}</Brand>
                    <Name>{item.name}</Name>
                    {item.size && <SizeText>{item.size}</SizeText>}
                  </Info>
                </Left>
                <Right>
                  <Price>{item.price.toLocaleString("ko-KR")}원</Price>
                  <LikeButton aria-label="관심 해제">
                    <LikeIcon isFilled size={18} color="#ef4444" strokeColor="#ef4444" />
                  </LikeButton>
                </Right>
              </Row>
            ))}
          </List>
        </MainContentStyled>
      </ContentWrapperStyled>
    </ContainerStyled>
  );
};

export default FavoritesPage;


