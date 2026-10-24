# Docker 배포용 빌드

Docker는 Node 22와 pnpm 8.15.9로 프론트엔드를 빌드하고 정적 파일만 추출합니다.
Nginx나 개발 서버를 실행하지 않습니다. 실행 가능한 컨테이너 이미지가 아닌 배포용 파일을 만드는 구성입니다.

## 산출물 생성

Docker Desktop 또는 Docker Engine과 Buildx가 필요합니다. 저장소 루트에서 실행합니다.

```sh
docker buildx build --target artifacts --output type=local,dest=./pueblo/dist .
```

`pueblo/dist/index.html`, `pueblo/dist/assets/`, public의 이미지 등 정적 파일이 생성됩니다.
기존 dist에 오래된 파일이 있다면 빈 출력 경로를 지정하여 빌드하세요. local exporter는 기존 파일을 정리하지 않습니다.

## API 및 Sentry 설정

```sh
docker buildx build --target artifacts \
  --build-arg VITE_API_BASE_URL=https://api.example.com/api \
  --build-arg VITE_SENTRY_DSN=https://PUBLIC_KEY@HOST/PROJECT_ID \
  --build-arg VITE_SENTRY_ENVIRONMENT=production \
  --build-arg VITE_SENTRY_RELEASE=COMMIT_SHA \
  --output type=local,dest=./pueblo/dist .
```

예시 값을 실제 환경에 맞게 바꿉니다. API 주소가 없으면 현재 도메인의 `/api`를 사용하며,
Sentry DSN이 없으면 오류 수집이 비활성화됩니다. `VITE_SENTRY_ENABLED`는 로컬 개발에서 강제로 수집할 때 쓰는 값으로 기본값은 `false`입니다.

Vite 환경변수는 빌드 시 JavaScript에 포함됩니다. 변경하려면 다시 빌드해야 하며 서버 실행 시 환경변수를 주입해도 이미 빌드한 파일은 바뀌지 않습니다.
`.env` 파일은 Docker 빌드 컨텍스트에서 제외합니다. 공개 가능한 API 주소·Sentry DSN만 전달하고 인증 토큰이나 Slack 웹훅은 넣지 마세요.

## 배포 서버에 전달

생성된 `pueblo/dist/`의 **내용 전체**를 배포 서버의 정적 파일 서비스 경로로 전달합니다.
서버 주소와 경로는 실제 환경에 맞게 지정하세요.

```sh
scp -r pueblo/dist/. deploy@YOUR_SERVER:/YOUR_STATIC_DIRECTORY/
```

기존 배포·릴리스 교체 절차가 있다면 그 절차로 전달합니다. 서버에서는 `/product/1` 같은 페이지 직접 접근을 `index.html`로 처리하는 SPA fallback이 필요합니다.
`/api`는 백엔드로 연결하고, 외부 API 주소를 사용하는 경우 백엔드에서 프론트엔드 도메인의 CORS를 허용해야 합니다.

의존성은 저장소의 `pueblo/pnpm-lock.yaml`로 고정합니다. 의존성을 변경하면 pnpm 8.15.9로 잠금 파일도 갱신해 커밋합니다.

참고: [Docker의 산출물 내보내기](https://docs.docker.com/build/building/export/)
