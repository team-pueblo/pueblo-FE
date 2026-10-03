// 1) React / 라이브러리
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// 2) 절대경로 import
import KakaoLogin from "../../components/KakaoLogin";
import { checkTokenExpiration } from "../../utils/auth";

// 3) 상대경로 import (부모 → 자식)

// 4) styled-components 마지막
import {
  PageStyled,
  CardStyled,
  TitleStyled,
  ErrorTextStyled,
  FormStyled,
  FieldStyled,
  LabelStyled,
  InputStyled,
  RowStyled,
  CheckboxLabelStyled,
  LinkGroupStyled,
  ActionsStyled,
  PrimaryButtonStyled,
  OutlineButtonStyled,
  NoticeStyled,
} from "./LoginPage.styled";

// ===== Constants =====
const MAX_EMAIL_LEN = 50;
const MAX_PASSWORD_LEN = 100;

// ===== Types =====
type LoginUser = {
  id: number | string;
  email: string;
  name?: string;
  [key: string]: unknown;
};

type LoginSuccess = {
  token: string;
  user: LoginUser;
  message?: string;
};

type LoginFail = {
  message: string;
};

type LoginResponse = LoginSuccess | LoginFail;

// ===== Hook example (naming rule: use prefix) =====
const useRememberedEmail = () => {
  const [email, setEmail] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem("remember_email");
    if (saved) {
      setEmail(saved);
      setRemember(true);
    }
  }, []);

  const persist = (value: string, enabled: boolean) => {
    if (enabled) {
      localStorage.setItem("remember_email", value);
    } else {
      localStorage.removeItem("remember_email");
    }
  };

  return { email, setEmail, remember, setRemember, persist };
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const { email, setEmail, remember, setRemember, persist } = useRememberedEmail();
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("이메일을 입력해주세요.");
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError("올바른 이메일을 입력해주세요.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,20}$/;
    if (!password) {
      setPasswordError("비밀번호를 입력해주세요.");
      return false;
    }
    if (!passwordRegex.test(password)) {
      setPasswordError("영문, 숫자, 특수문자를 조합해서 입력해주세요. (8-20자)");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const isFormValid = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,20}$/;
    
    return email && emailRegex.test(email) && password && passwordRegex.test(password);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (value) {
      validateEmail(value);
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (value) {
      validatePassword(value);
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email) || !validatePassword(password)) {
      return;
    }

    persist(email, remember);

    try {
      setLoading(true);

      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data: LoginResponse = await response.json();

      if (response.ok && "token" in data) {
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({ ...data.user, isSocialLogin: false }),
        );
        checkTokenExpiration();
        alert("로그인 성공!");
        navigate("/");
      } else {
        setError(("message" in data && data.message) || "로그인에 실패했습니다.");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.";
      console.error("로그인 오류:", err);
      setError("서버와의 통신 중 오류가 발생했습니다. " + msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => navigate("/signup");

  return (
    <PageStyled>
      <CardStyled>
        <TitleStyled>로그인</TitleStyled>
        {error && <ErrorTextStyled role="alert">{error}</ErrorTextStyled>}

        <FormStyled onSubmit={handleSubmit} noValidate>
          <FieldStyled>
            <LabelStyled htmlFor="email">아이디</LabelStyled>
            <InputStyled
              id="email"
              type="email"
              placeholder="이메일을 입력해주세요."
              value={email}
              onChange={handleEmailChange}
              maxLength={MAX_EMAIL_LEN}
              required
              autoComplete="email"
              inputMode="email"
            />
            {emailError && <ErrorTextStyled role="alert">{emailError}</ErrorTextStyled>}
          </FieldStyled>

          <FieldStyled>
            <LabelStyled htmlFor="password">비밀번호</LabelStyled>
            <InputStyled
              id="password"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              value={password}
              onChange={handlePasswordChange}
              maxLength={MAX_PASSWORD_LEN}
              required
              autoComplete="current-password"
            />
            {passwordError && <ErrorTextStyled role="alert">{passwordError}</ErrorTextStyled>}
          </FieldStyled>

          <RowStyled>
            <CheckboxLabelStyled htmlFor="remember">
              <input
                id="remember"
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span>아이디 저장</span>
            </CheckboxLabelStyled>

            <LinkGroupStyled>
              <button type="button" onClick={() => navigate("/find-id")}>
                아이디 찾기
              </button>
              <span className="divider">|</span>
              <button type="button" onClick={() => navigate("/reset-password")}>
                비밀번호 찾기
              </button>
            </LinkGroupStyled>
          </RowStyled>

          <ActionsStyled>
            <PrimaryButtonStyled 
              type="submit" 
              disabled={loading || !isFormValid()} 
              $loading={loading}
            >
              {loading ? "로그인 중..." : "로그인"}
            </PrimaryButtonStyled>
          </ActionsStyled>
        </FormStyled>

        <div style={{ marginTop: "0.75rem" }}>
          <KakaoLogin />
        </div>

        <div style={{ marginTop: "1rem" }}>
          <OutlineButtonStyled type="button" onClick={handleSignUp}>
            회원가입
          </OutlineButtonStyled>
        </div>

        <NoticeStyled>
          신규회원 가입하고 <span className="emph">10% 할인 쿠폰</span> 받아보세요.
        </NoticeStyled>
      </CardStyled>
    </PageStyled>
  );
};

export default LoginPage;
