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
