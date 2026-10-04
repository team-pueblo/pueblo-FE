# Sentry 설정

앱은 `src/monitoring.ts`에서 Sentry를 초기화하고 React 19 루트 오류 핸들러를 연결합니다.
브라우저의 처리되지 않은 오류·Promise rejection과 React 오류를 수집합니다.

## 환경변수

`.env.example`을 `.env.local`로 복사한 뒤 Sentry 프로젝트의 Settings → Client Keys (DSN) 값을 입력하세요.

| 변수 | 용도 |
| --- | --- |
| `VITE_SENTRY_DSN` | 오류를 받을 프로젝트의 DSN. 비어 있으면 비활성화 |
| `VITE_SENTRY_ENABLED` | 로컬 개발에서도 테스트할 때만 `true` |
| `VITE_SENTRY_ENVIRONMENT` | `production` 또는 `preview` 등. 기본값은 Vite mode |
| `VITE_SENTRY_RELEASE` | 선택 항목. 배포 커밋 SHA 등 릴리스 식별자 |

Vercel에서는 프로젝트 Settings → Environment Variables에 DSN과 환경 이름을 등록하고 재배포하세요.
Vite 환경변수는 빌드할 때 적용됩니다. 로컬에서는 값을 바꾼 후 개발 서버를 재시작하세요.
`VITE_` 변수는 브라우저에 공개됩니다. Sentry DSN은 공개 클라이언트 설정이며, 인증 토큰은 이 변수들에 넣지 않습니다.

## 수집 범위와 확인

- DSN 없는 환경에서는 SDK를 초기화하지 않습니다.
- 개발 환경에서는 DSN과 `VITE_SENTRY_ENABLED=true`가 모두 필요합니다.
- SDK 11의 `dataCollection` 설정으로 사용자 정보, 쿠키, HTTP 헤더·본문, URL 쿼리 수집을 끕니다.
- Session Replay, 성능 추적, 소스맵 업로드는 설정하지 않았습니다.
- 테스트 DSN을 넣고 로컬에서 일시적인 UI 클릭 핸들러에 `throw new Error("pueblo Sentry test")`를 추가하여 실행한 후 Sentry Issues에서 확인하세요. 테스트 코드는 확인 후 제거합니다.
- 실제 DSN을 받기 전에는 원격 이벤트 수신 검증을 수행할 수 없습니다.

공식 가이드: https://docs.sentry.io/platforms/javascript/guides/react/

## Vercel 빌드

- Root Directory: `pueblo`
- Build Command: `npm run build`
- Output Directory: `dist`

의존성 설치 경고만으로 배포 실패를 판단하지 말고, 이후 TypeScript/Vite 빌드 결과를 확인하세요.

## 처리한 오류의 수동 수집

`catch`에서 사용자 안내로 처리한 실패는 `captureException`으로 전송합니다.

| feature | action | 수집 지점 |
| --- | --- | --- |
| auth | login | 로그인 통신·응답 파싱·HTTP 5xx·저장 실패 |
| cart | add | 상품 상세에서 장바구니 추가 실패 |
| cart | save | 장바구니 변경 저장 실패 |
| favorites | save | 상품 상세에서 관심 등록/해제 저장 실패 |
| favorites | remove | 관심목록에서 삭제 저장 실패 |

부가 정보는 고정된 feature/action 태그만 추가합니다. 이메일·비밀번호·토큰·응답 본문·로컬 저장 데이터는 extra/context에 추가하지 않습니다. 원래 예외 객체는 원인 추적을 위해 전달하므로 예외 메시지에도 민감한 값을 포함하지 않아야 합니다.

정상적인 로그인 거부 응답(예: JSON 401), 장바구니 수량 상한, 클립보드 권한 거부, 복구 가능한 로컬 데이터 파싱 실패는 수동 오류 이벤트로 보내지 않습니다. HTTP 5xx는 본문을 파싱하기 전에 고정 형식의 예외로 변환해 한 번 수집합니다.

배포 후 확인:

1. 테스트 환경에서 로그인 요청을 HTTP 500으로 응답하도록 설정합니다.
2. 로그인 화면의 오류 안내가 유지되고, Sentry 이벤트에 `feature:auth`, `action:login`이 있는지 확인합니다.
3. 정상 JSON 401 응답에서는 수동 오류 이벤트가 생성되지 않는지 확인합니다.
4. 테스트 환경에서 Storage.setItem이 실패하도록 한 후 장바구니·관심목록 변경 시 해당 태그와 오류 안내를 확인합니다.

로컬에서는 기존 안내대로 DSN과 개발 수집 활성화 설정이 필요합니다. 운영 사용자에게 의도적인 오류를 발생시키는 테스트 버튼은 추가하지 않습니다.
