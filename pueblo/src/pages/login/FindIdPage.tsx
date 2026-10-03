import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PageStyled,
  CardStyled,
  TitleStyled,
  FormStyled,
  FieldStyled,
  LabelStyled,
  PhoneInputContainer,
  PhoneInput,
  VerificationContainer,
  VerificationInput,
  VerifyButton,
  ButtonContainer,
  SendButton,
  NextButton,
} from "./FindIdPage.styled";

const FindIdPage: React.FC = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState({
    first: "",
    second: "",
    third: "",
  });
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const handlePhoneChange = (part: keyof typeof phoneNumber, value: string) => {
    setPhoneNumber(prev => ({
      ...prev,
      [part]: value,
    }));
  };

  const handleSendCode = () => {
    // TODO: 인증번호 발송 API 호출
    alert("인증번호가 발송되었습니다.");
    setIsCodeSent(true);
  };

  const handleVerifyCode = () => {
    // TODO: 인증번호 확인 API 호출
    alert("인증번호가 확인되었습니다.");
  };

  const handleNext = () => {
    if (isCodeSent) {
      // TODO: 인증번호 확인 후 다음 단계로
      navigate("/find-id-result");
    }
  };

  const handleBack = () => {
    navigate("/login");
  };

  return (
    <PageStyled>
      <CardStyled>
        <TitleStyled>아이디 찾기</TitleStyled>
        
        <FormStyled>
          <FieldStyled>
            <LabelStyled>핸드폰 번호</LabelStyled>
            <PhoneInputContainer>
              <PhoneInput
                type="text"
                placeholder="010"
                value={phoneNumber.first}
                onChange={(e) => handlePhoneChange("first", e.target.value)}
                maxLength={3}
              />
              <PhoneInput
                type="text"
                placeholder="0000"
                value={phoneNumber.second}
                onChange={(e) => handlePhoneChange("second", e.target.value)}
                maxLength={4}
              />
              <PhoneInput
                type="text"
                placeholder="0000"
                value={phoneNumber.third}
                onChange={(e) => handlePhoneChange("third", e.target.value)}
                maxLength={4}
              />
            </PhoneInputContainer>
          </FieldStyled>

          <ButtonContainer>
            <SendButton type="button" onClick={handleSendCode}>
              인증번호 재발송
            </SendButton>
            
            {isCodeSent && (
              <VerificationContainer>
                <VerificationInput
                  type="text"
                  placeholder="인증번호를 입력하세요"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
                <VerifyButton type="button" onClick={handleVerifyCode}>
                  확인
                </VerifyButton>
              </VerificationContainer>
            )}
            
            <NextButton 
              type="button" 
              onClick={handleNext}
              disabled={!isCodeSent}
              $disabled={!isCodeSent}
            >
              다음
            </NextButton>
          </ButtonContainer>
        </FormStyled>

      </CardStyled>
    </PageStyled>
  );
};

export default FindIdPage;
