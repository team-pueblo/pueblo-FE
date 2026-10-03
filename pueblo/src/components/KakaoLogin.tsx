import React from 'react';
import styled from 'styled-components';

const KakaoButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: #FEE500;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 500;
  color: #000000;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #FDD835;
  }

  &:active {
    background-color: #FBC02D;
  }
`;

const KakaoIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const KakaoLogin: React.FC = () => {
  const handleKakaoLogin = () => {
    // TODO: 카카오 로그인 API 연동
    alert('카카오 로그인 기능은 준비 중입니다.');
  };

  return (
    <KakaoButton onClick={handleKakaoLogin}>
      <KakaoIcon src="/images/kakao_oauth.png" alt="카카오 로그인" />
      카카오로 로그인
    </KakaoButton>
  );
};

export default KakaoLogin;