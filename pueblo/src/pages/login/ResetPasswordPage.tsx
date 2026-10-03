import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PageStyled,
  CardStyled,
  IconContainer,
  VideoIcon,
  TitleStyled,
  DescriptionStyled,
  FormStyled,
  FieldStyled,
  LabelStyled,
  InputStyled,
  ButtonContainer,
  PrimaryButtonStyled,
  OutlineButtonStyled,
} from "./ResetPasswordPage.styled";

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 필수 필드 검증
    if (!formData.email) {
      alert("이메일을 입력해주세요.");
      return;
    }

    // TODO: 비밀번호 재설정 API 호출
    alert("비밀번호 재설정 링크가 이메일로 발송되었습니다!");
    navigate("/login");
  };

  const handleBack = () => {
    navigate("/login");
  };

  return (
    <PageStyled>
      <CardStyled>
        <IconContainer>
          <VideoIcon autoPlay muted loop>
            <source src="/images/safety_lock.mp4" type="video/mp4" />
          </VideoIcon>
        </IconContainer>
        
        <TitleStyled>
          F!tNow 계정의<br />
          비밀번호를 재설정합니다
        </TitleStyled>
        <DescriptionStyled>
          임시 비밀번호를 받을 이메일 계정을 입력해주세요.
        </DescriptionStyled>
        
        <FormStyled onSubmit={handleSubmit}>
          <FieldStyled>
            <LabelStyled>이메일</LabelStyled>
            <InputStyled
              type="email"
              placeholder="이메일을 입력하세요"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
            />
          </FieldStyled>

          <ButtonContainer>
            <OutlineButtonStyled type="button" onClick={handleBack}>
              로그인으로 돌아가기
            </OutlineButtonStyled>
            <PrimaryButtonStyled type="submit">
              다음
            </PrimaryButtonStyled>
          </ButtonContainer>
        </FormStyled>
      </CardStyled>
    </PageStyled>
  );
};

export default ResetPasswordPage;
