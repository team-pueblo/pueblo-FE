# Docker 배포용 빌드

Docker는 Node 22와 pnpm 8.15.9로 난독화된 프론트엔드를 빌드하고 Nginx로 8080 포트에서 제공합니다.
기본 최종 단계는 실행용 `runtime`이며, 정적 파일만 필요한 경우 `artifacts` 단계도 사용할 수 있습니다.

## 실행용 이미지

```sh
docker build --target runtime -t pueblo-fe:local .
docker run --rm -p 8080:8080 pueblo-fe:local
```

`http://localhost:8080`으로 접속합니다. `/product/1` 같은 SPA 경로는 index.html로 처리하고, `/assets/`의 없는 파일은 404로 반환합니다. `/healthz`는 Kubernetes 헬스체크용입니다. Nginx는 비루트 사용자로 실행됩니다.
API `/api`는 Ingress/Gateway에서 백엔드로 연결해야 합니다. Nginx는 API 요청에 HTML을 반환하지 않고 404로 처리합니다.

## 산출물 생성

Docker Desktop 또는 Docker Engine과 Buildx가 필요합니다. 저장소 루트에서 실행합니다.

```sh
docker buildx build --target artifacts --output type=local,dest=./pueblo/dist .
```

`pueblo/dist/index.html`, `pueblo/dist/assets/`, public의 이미지 등 정적 파일이 생성됩니다.
기존 dist에 오래된 파일이 있다면 빈 출력 경로를 지정하여 빌드하세요. local exporter는 기존 파일을 정리하지 않습니다.

## 빌드 설정과 난독화

Docker는 `pnpm run build:secure`로 JavaScript 난독화를 적용합니다. 일반 `pnpm run build`와 개발 서버에는 적용하지 않습니다.
코드를 배포 파일로 출력하기 전에 변환하므로 파일 해시와 참조도 최종 결과에 맞춰 생성됩니다.
소스맵은 공개하지 않습니다. 난독화는 비밀정보 암호화가 아니며, 현재 Sentry에는 난독화 전 소스맵을 업로드하지 않아 오류 분석이 어려워질 수 있습니다.

이 Dockerfile은 `VITE_*` 빌드 인자를 받지 않으며 로컬 `.env`도 포함하지 않습니다.
현재 기본 동작은 API `/api` 사용, Sentry DSN 미지정으로 브라우저 오류 수집 비활성화입니다.
GitHub 저장소와 Sentry의 연동만으로 브라우저 SDK의 DSN이 설정되지는 않습니다.
ConfigMap은 이미 빌드된 JavaScript의 환경변수를 바꾸지 않습니다.

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
