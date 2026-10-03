import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PageStyled,
  CardStyled,
  TitleStyled,
  FormStyled,
  FieldStyled,
  LabelStyled,
  InputStyled,
  GenderButtonContainer,
  GenderButton,
  FileUploadContainer,
  FileInput,
  FileLabel,
  ButtonContainer,
  SignupButton,
} from "./SignupPage.styled";

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    birthDate: "",
    height: "",
    weight: "",
    userId: "",
    gender: "",
    fullBodyPhoto: null as File | null,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGenderChange = (gender: string) => {
    setFormData(prev => ({
      ...prev,
      gender: gender,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "image/jpeg") {
      setFormData(prev => ({
        ...prev,
        fullBodyPhoto: file,
      }));
    } else {
      alert("JPG 파일만 업로드 가능합니다.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 필수 필드 검증 (전신사진 제외)
    if (!formData.id || !formData.password || !formData.birthDate || !formData.height || !formData.weight || !formData.userId || !formData.gender) {
      alert("필수 필드를 모두 입력해주세요.");
      return;
    }

    // TODO: 회원가입 API 호출
    alert("회원가입이 완료되었습니다!");
    navigate("/login");
  };

  const handleBack = () => {
    navigate("/login");
  };

  return (
    <PageStyled>
      <CardStyled>
        <TitleStyled>회원가입</TitleStyled>
        
        <FormStyled onSubmit={handleSubmit}>
          <FieldStyled>
            <LabelStyled>아이디 *</LabelStyled>
            <InputStyled
              type="text"
              placeholder="아이디를 입력하세요"
              value={formData.id}
              onChange={(e) => handleInputChange("id", e.target.value)}
              required
            />
          </FieldStyled>

          <FieldStyled>
            <LabelStyled>비밀번호 *</LabelStyled>
            <InputStyled
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              required
            />
          </FieldStyled>

          <FieldStyled>
            <LabelStyled>생년월일 *</LabelStyled>
            <InputStyled
              type="date"
              value={formData.birthDate}
              onChange={(e) => handleInputChange("birthDate", e.target.value)}
              required
            />
          </FieldStyled>

          <FieldStyled>
            <LabelStyled>키 *</LabelStyled>
            <InputStyled
              type="number"
              placeholder="키 (cm)"
              value={formData.height}
              onChange={(e) => handleInputChange("height", e.target.value)}
              required
            />
          </FieldStyled>

          <FieldStyled>
            <LabelStyled>몸무게 *</LabelStyled>
            <InputStyled
              type="number"
              placeholder="몸무게 (kg)"
              value={formData.weight}
              onChange={(e) => handleInputChange("weight", e.target.value)}
              required
            />
          </FieldStyled>

          <FieldStyled>
            <LabelStyled>유저아이디 *</LabelStyled>
            <InputStyled
              type="text"
              placeholder="유저아이디를 입력하세요"
              value={formData.userId}
              onChange={(e) => handleInputChange("userId", e.target.value)}
              required
            />
          </FieldStyled>

          <FieldStyled>
            <LabelStyled>성별 *</LabelStyled>
            <GenderButtonContainer>
              <GenderButton
                type="button"
                $selected={formData.gender === "male"}
                onClick={() => handleGenderChange("male")}
              >
                남성
              </GenderButton>
              <GenderButton
                type="button"
                $selected={formData.gender === "female"}
                onClick={() => handleGenderChange("female")}
              >
                여성
              </GenderButton>
            </GenderButtonContainer>
          </FieldStyled>

          <FieldStyled>
            <LabelStyled>전신 사진 (선택 사항)</LabelStyled>
            <FileUploadContainer>
              <FileInput
                type="file"
                id="fullBodyPhoto"
                accept=".jpg,.jpeg"
                onChange={handleFileChange}
              />
              <FileLabel htmlFor="fullBodyPhoto">
                {formData.fullBodyPhoto ? formData.fullBodyPhoto.name : "업로드할 파일을 선택해주세요"}
              </FileLabel>
            </FileUploadContainer>
          </FieldStyled>

          <ButtonContainer>
            <SignupButton type="submit">
              회원가입
            </SignupButton>
          </ButtonContainer>
        </FormStyled>
      </CardStyled>
    </PageStyled>
  );
};

export default SignupPage;
