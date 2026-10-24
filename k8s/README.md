# Kubernetes 배포 명세

- `deployment.yml`: Deployment와 Service, 복제본 2개
- 컨테이너당 requests: CPU 250m / 메모리 512Mi (0.5Gi)
- 컨테이너당 limits: CPU 500m / 메모리 1Gi
- `configmap.example.yml`: 실행용 서버의 환경변수 예제

## 적용 전 설정

이미지는 `ghcr.io/team-pueblo/pueblo-fe:sha-<전체 커밋 SHA>`를 사용합니다.
CI는 main push의 검사를 통과한 이미지에 SHA·latest 두 태그를 발행한 뒤, 실행한 브랜치의 Deployment 이미지 태그를 SHA로 갱신해 커밋합니다.
첫 빌드 전 `sha-REPLACE_WITH_CI_COMMIT`은 의도적인 자리표시자이므로 바로 배포하지 마세요.
루트 Dockerfile의 `runtime` 단계가 Nginx와 난독화된 dist를 포함합니다.

Nginx는 8080에서 실행되고 Service는 80 → 8080으로 연결합니다. `/healthz`로 readiness/liveness를 검사합니다.
ConfigMap은 선택 사항이며 예제에는 프로세스 시간대 TZ만 있습니다.
Dockerfile은 Vite 빌드 인자를 받지 않습니다. ConfigMap으로 주입해도 빌드된 JavaScript는 변경되지 않습니다.

```sh
cp k8s/configmap.example.yml k8s/configmap.yml
# 이미지 주소와 서버에 맞는 ConfigMap 값을 수정한 뒤 같은 namespace에 적용
kubectl create namespace frontend --dry-run=client -o yaml | kubectl apply -f -
kubectl apply -f k8s/configmap.yml
kubectl apply -f k8s/deployment.yml
```

Service는 ClusterIP이며 클러스터 내부 80번 포트를 컨테이너의 http 포트로 연결합니다.
외부 공개는 기존 Ingress/Gateway 등의 배포 환경에서 연결합니다. 실제 클러스터 적용은 별도로 진행합니다.

참고: [Kubernetes 리소스 requests와 limits](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/)

GHCR 패키지가 비공개라면 `frontend` namespace에 `read:packages` 권한의 레지스트리 인증 Secret을 만들고 Deployment의 `spec.template.spec.imagePullSecrets`에 연결해야 합니다. 인증값은 저장소에 커밋하지 않습니다.

## Argo CD (Image Updater 없이)

CI는 검사 → GHCR 발행 → Git의 이미지 태그 갱신까지 수행합니다. 클러스터에 직접 적용하거나 재시작하지 않습니다.
Argo CD Application이 실제 배포 브랜치의 `k8s` 경로와 `frontend` namespace를 추적하고 자동 동기화를 사용하도록 설정합니다.
CI는 main의 manifest만 갱신합니다. Argo CD도 main을 추적하도록 설정합니다.
Kustomize 없이 일반 YAML 디렉터리로 배포합니다. Argo CD Application의 `spec.source.directory.exclude`에 `configmap.example.yml`을 지정해 예제가 자동 배포되지 않도록 합니다.
ConfigMap이 필요하면 실제 설정은 별도 배포 저장소나 클러스터에서 관리합니다. Deployment는 ConfigMap 없이도 동작합니다.
frontend namespace는 클러스터에 준비하거나 Argo CD의 CreateNamespace=true 옵션으로 생성합니다.

SHA 태그 변경으로 Pod 템플릿이 달라지므로 Argo CD 동기화 시 새 Pod가 생성됩니다. Image Updater나 latest 감지가 필요하지 않습니다.
매니페스트만 변경한 push는 빌드를 다시 실행하지 않습니다.

GitHub Actions의 GITHUB_TOKEN에 contents:write 및 packages:write 권한이 필요합니다.
보호 브랜치가 봇의 커밋을 막는 경우 manifest 갱신 단계가 실패합니다. 이때 조직 정책에 맞는 GitHub App 또는 별도 GitOps 저장소·PR 흐름을 설정해야 하며, 이 워크플로우는 보호 규칙을 우회하지 않습니다.
기존 GHCR 패키지가 있다면 해당 저장소의 Actions 접근 권한도 허용해야 합니다.

롤백할 때는 이전 릴리스의 `sha-<전체 커밋 SHA>`를 Git 매니페스트에 지정하고 Argo CD로 동기화합니다.
