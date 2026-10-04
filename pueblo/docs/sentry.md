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

## 공통 Axios 클라이언트와 수동 수집

API 호출은 `src/api/client.ts`의 `api` 인스턴스를 사용합니다. 기본 baseURL은 `/api`, timeout은 15초입니다. 별도 API 서버는 `VITE_API_BASE_URL`에 경로 prefix까지 설정합니다. 인증 헤더/쿠키 정책은 백엔드 계약 확정 후 추가합니다.

```ts
await api.post("/login", { email, password }, {
  monitoring: {
    endpoint: "/api/login", // 사용자 값이 없는 고정 경로 템플릿
    feature: "auth",
    action: "login",
    critical: true,
  },
});
```

새 API의 monitoring.endpoint에는 `/api/orders/{id}` 같은 고정 템플릿을 사용합니다. 원본 URL·사용자 식별자를 넣지 않습니다. metadata가 없으면 `unknown-endpoint`로 표시되므로 신규 요청에는 반드시 작성합니다. `shouldSkipErrorLogging`은 경로·메서드·상태·응답 코드를 함께 검증합니다. 현재 POST /api/login의 400·401 중 code=INVALID_CREDENTIALS 또는 정확한 안내 메시지가 일치하는 경우만 제외합니다. 백엔드 계약 확정 후 정책을 재검수하며 모르는 응답은 수집합니다.

### Level

| 상황 | Level |
| --- | --- |
| React 루트의 복구되지 않은 렌더링 실패 | fatal |
| critical로 지정한 API의 5xx: 현재 로그인 | fatal |
| 그 밖의 예상하지 못한 API 오류·로컬 저장 실패 | error |
| 타임아웃·네트워크 단절, React 복구 가능한 오류 | warning |
| 검수한 업무 오류 조건, Axios 요청 취소 | 수동 이벤트 제외 |

타임아웃도 필수 흐름에 지속적으로 영향을 주면 장애일 수 있습니다. warning은 무시 대상이라는 뜻이 아니며 발생 추세를 확인합니다. 브라우저 전역의 처리되지 않은 오류는 기존 Sentry 기본 수집을 유지합니다.

### 이름·Scope·Fingerprint

- 이름 예: `[503 Error] - POST /api/login`, `[TIMEOUT Error] - POST /api/login`.
- API 오류는 원본 AxiosError를 Sentry에 전달하지 않습니다. 별도 Error를 만들어 request/config/response/cause와 그 안의 비밀번호·토큰 전송을 피합니다. 이에 따라 원본 Axios 스택 대신 공통 수집 지점의 스택을 사용합니다.
- withScope 안에서 level, feature, action, endpoint, method, status, page를 설정합니다. 실제 화면 ID·브랜드 slug는 route 템플릿으로 치환합니다.
- API context는 경로 템플릿·메서드·상태·설정 timeout만 포함합니다. query context는 config.params의 정수 page/size만 허용하며 원본 URL의 쿼리, 검색어, 본문, 헤더는 복사하지 않습니다.
- fingerprint는 API·메서드·정규화 경로·상태/실패 종류입니다. 릴리즈·상품 ID·쿼리 값으로 이슈가 나뉘지 않습니다.
- 인터셉터에서 처리한 동일 오류 객체는 화면 catch의 captureHandledError에서 다시 수집하지 않습니다.
- non-fatal 수동 이벤트는 동일 브라우저 탭에서 같은 키를 30초에 한 번만 전송합니다. 최대 100개 키를 보관합니다. fatal은 시간 제한 없이 전송합니다.
- 브라우저 새로고침 시 제한 상태가 초기화됩니다. 전역 오류까지 제한하는 기능이 아니며, 수집 건수는 실제 실패 횟수보다 작으므로 실패율 지표로 직접 사용하지 않습니다.
- 로컬 저장 실패는 feature/action/page를 붙입니다. 원래 예외 객체를 보내므로 예외 메시지에 개인정보를 포함하지 않습니다.

### 릴리즈와 실행 환경

`VITE_SENTRY_RELEASE`가 있으면 우선 사용하고, 없으면 Vercel 빌드의 `VERCEL_GIT_COMMIT_SHA`를 릴리즈로 넣습니다. 둘 다 없으면 릴리즈는 미지정입니다. Preview에서는 `VITE_SENTRY_ENVIRONMENT=preview`를 지정해 운영 알림과 분리합니다.

OS·브라우저 정보는 SDK와 Sentry의 기본 환경 분석을 활용합니다. 웹 환경에서 정확한 기종이 항상 제공되는 것은 아닙니다. 사용자 이메일이나 별도 기기 식별자를 추가로 수집하지 않습니다.

## Inbound Filters 형식

프로젝트 설정의 **Inbound Filters → Error Messages** 입력란에 아래 파일 내용을 한 줄씩 붙여넣습니다. 이 저장소 변경만으로 Sentry 서버 설정이 바뀌지는 않습니다. 실제 프로젝트 적용은 아직 하지 않았습니다.

[붙여넣기용 필터 목록](./sentry-inbound-filters.txt)

```text
CanceledError: canceled
*POST /api/login request failed (NETWORK)
*POST /api/login request failed (TIMEOUT)
```

첫 줄은 Axios 취소, 나머지는 현재 연동된 로그인 API의 응답 없는 네트워크·타임아웃 오류만 제외하는 패턴입니다. 사용자 요청에 따라 서버 감시는 별도 모니터링으로 담당한다는 운영 전제의 적용 후보입니다. 실제 서버 감시가 구성됐는지는 확인하지 않았습니다. 적용하면 이 경로의 CORS/서버 지연도 Sentry에서는 볼 수 없으므로 별도 감시 담당과 범위를 확인해야 합니다.

400·401·404는 Inbound Filters에 상태만으로 등록하지 않습니다. 응답 본문 조건이 필요한 업무 오류는 `shouldSkipErrorLogging`에서 검수합니다. 제시된 구매수량/장바구니 수량 오류는 해당 API와 토스트 처리가 아직 없으므로 규칙을 임의로 추가하지 않았습니다. 연결 후 정확한 endpoint, method, status, 업무 코드와 함께 추가합니다.

Sentry 메시지 필터는 정규식이 아닌 glob이며, 메시지 또는 `exception.type: exception.value` 형식과 비교합니다. 새로 유입되는 이벤트에 적용되고 기존 이슈를 삭제하지 않습니다. 제공 여부는 프로젝트 플랜·권한에서 확인합니다. [공식 필터 안내](https://www.sentry.help/en/articles/13964412-how-can-i-configure-inbound-filters-by-message)

다음 광범위 패턴은 기본 목록에 포함하지 않습니다.

| 제외하지 않는 패턴 | 이유 |
| --- | --- |
| `ChunkLoadError*` | 배포 후 청크 유실로 화면이 열리지 않는 장애를 숨길 수 있음 |
| `*Network Error*`, `*Failed to fetch*` | CORS·서버·배포 설정 문제와 단말 단절을 메시지만으로 구분할 수 없음 |
| `*400*`, `*401*` | 로그인 외 필수 API의 계약·인증 장애까지 숨길 수 있음 |
| `*Timeout*` | 위에서 검수한 특정 API 이외의 타임아웃까지 무차별 제외하지 않음 |

필터 변경마다 이유·담당자·추가일·검토일을 기록하고 1주 후 재검토합니다. 조건부 필터링은 클라이언트 인터셉터에서 처리하며 메시지 패턴으로 level·endpoint 등의 복합 조건을 흉내 내지 않습니다.

## Alerts 운영 초안

실제 알림 규칙·수신 채널은 아직 설정하지 않았습니다. 아래 임계치는 운영 트래픽을 보며 조정할 초기 제안입니다.

| 규칙 | 대상 및 임계치 | 대응 |
| --- | --- | --- |
| Critical | production, level:fatal, 최초 1건 | 담당자 즉시 확인. 반복 알림 간격 30분 제안 |
| Error 증가 | production, level:error, 동일 이슈 5분 내 10건 이상 | 릴리즈·API·영향 화면 확인 |
| Warning 증가 | production, level:warning, 동일 이슈 10분 내 20건 이상 | 네트워크/서버 지연 추세 확인. 즉시 호출 대신 운영 채널 |

단일 이슈 반복 알림 제한은 Sentry 규칙에서 설정합니다. preview·개발 이벤트는 운영 알림에서 제외합니다. 사용자 수 조건은 사용자 추적 정책이 정해지기 전에는 사용하지 않습니다.

대응 순서: 담당자 지정 → environment/release/endpoint 확인 → 재현 및 영향 범위 확인 → 필요 시 롤백 판단 → 수정 배포 → 재발 확인. 매주 노이즈 이슈·필터·임계치를 검토하고 Critical 알림이 실제 담당자에게 도달하는지 테스트합니다.

## 검증

- `node --test tests/monitoring.test.cjs`: 실제 Axios 인터셉터와 모킹된 Sentry로 분류·그룹화·맥락 격리·비밀정보 제외·중복/반복 제한을 확인합니다.
- `npm run build`, 변경 소스 ESLint 검증을 수행합니다.
- 테스트 환경에서 500·401·timeout·취소 응답을 만들고 Sentry의 level, tags, context, fingerprint, release를 확인합니다. 실제 대시보드 수신 검증은 별도 수행해야 합니다.
- Inbound Filters 적용 후 일치하는 무해한 테스트 이벤트와 비일치 제어 이벤트를 보내 필터 효과를 확인합니다. 운영 사용자에게 강제로 오류를 발생시키지 않습니다.

참고: [Axios 인터셉터](https://axios-http.com/docs/interceptors), [Axios 오류 구조](https://axios-http.com/docs/handling_errors)


### Slack 연결 및 Alert 등록 체크리스트

현재 실행 환경에는 Sentry/Slack 관리 연결이 없어 실제 연동이나 알림 생성은 수행하지 않았습니다. 수신 워크스페이스·채널은 사용자 확인 대기 중입니다.

1. Sentry 조직의 Integrations에서 Slack 워크스페이스를 연결합니다. 비공개 채널이면 Sentry 앱 접근 권한도 확인합니다.
2. 위 Critical/Error/Warning 기준을 프로젝트 Alert 규칙으로 생성하고, Slack action에 실제 워크스페이스와 채널을 지정합니다.
3. 알림에 포함된 issue 링크에서 endpoint·page·release를 바로 확인하도록 담당자가 조회 권한을 갖게 합니다. 채널 메시지에 사용자 입력·토큰을 추가하지 않습니다.
4. 테스트 프로젝트/환경에서 각 레벨을 검증하고 Slack 도착 여부와 중복 알림 간격을 확인한 뒤 운영 규칙을 활성화합니다.
5. Critical은 즉시 담당자 지정·영향 확인, Error/Warning은 임계치 초과 시 분류합니다. 한 주 후 알림 건수와 실제 장애 비율을 보고 임계치를 조정합니다.
6. Inbound에서 제외된 이벤트는 Alert에도 사용하지 못합니다. 네트워크/타임아웃을 제외한 경로는 Warning 규칙의 탐지 대상에서 빠진다는 점을 운영 인수인계에 기록합니다.

Slack 참고: [알림 미수신 점검](https://www.sentry.help/en/articles/13964058-troubleshooting-why-slack-alerts-are-not-arriving), [Slack 채널 접근 권한](https://www.sentry.help/en/articles/13964324-how-do-i-fix-the-slack-resource-does-not-exist-or-has-not-been-granted-access-error)
