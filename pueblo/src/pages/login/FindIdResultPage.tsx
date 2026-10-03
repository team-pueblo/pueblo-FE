import React from "react";
import { useNavigate } from "react-router-dom";
import {
  PageStyled,
  CardStyled,
  TitleStyled,
  MessageStyled,
  IdDisplayStyled,
  ButtonContainer,
  FindPasswordButton,
  LoginButton,
} from "./FindIdResultPage.styled";

const FindIdResultPage: React.FC = () => {
  const navigate = useNavigate();

  const handleFindPassword = () => {
    navigate("/reset-password");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <PageStyled>
      <CardStyled>
        <TitleStyled>아이디 찾기</TitleStyled>
        
        <MessageStyled>
          고객님의 아이디입니다! 지금 다시 로그인해보세요.
        </MessageStyled>

        <IdDisplayStyled>
          suk9246507@gmail.com
        </IdDisplayStyled>

        <ButtonContainer>
          <FindPasswordButton type="button" onClick={handleFindPassword}>
            비밀번호 찾기
          </FindPasswordButton>
          <LoginButton type="button" onClick={handleLogin}>
            로그인 →
          </LoginButton>
        </ButtonContainer>
      </CardStyled>
    </PageStyled>
  );
};

export default FindIdResultPage;
