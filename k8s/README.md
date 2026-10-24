# Kubernetes 배포 명세

- `deployment.yml`: Deployment와 Service, 복제본 2개
- 컨테이너당 requests: CPU 250m / 메모리 512Mi (0.5Gi)
- 컨테이너당 limits: CPU 500m / 메모리 1Gi
- `configmap.example.yml`: 실행용 서버의 환경변수 예제

## 적용 전 설정

`YOUR_REGISTRY/pueblo-fe:YOUR_TAG`를 실제 실행 가능한 웹 서버 이미지로 교체합니다.
루트 Dockerfile의 `artifacts`는 정적 파일 추출용이므로 이 Deployment에서 실행할 수 없습니다.
이미지에 빌드된 dist와 이를 제공하는 서버가 포함되어 있어야 합니다.

포트 8080은 예시입니다. 실제 서버 리스닝 포트에 맞춰 `containerPort`를 변경하세요.
ConfigMap의 `PORT` 역시 해당 환경변수를 지원하는 서버에서만 작동합니다.
Vite의 `VITE_*` 값은 Docker 빌드 인자로 전달해야 하며 ConfigMap으로 주입해도 빌드된 JavaScript는 변경되지 않습니다.

```sh
cp k8s/configmap.example.yml k8s/configmap.yml
# 이미지 주소와 서버에 맞는 ConfigMap 값을 수정한 뒤 같은 namespace에 적용
kubectl apply -f k8s/configmap.yml
kubectl apply -f k8s/deployment.yml
```

Service는 ClusterIP이며 클러스터 내부 80번 포트를 컨테이너의 http 포트로 연결합니다.
외부 공개는 기존 Ingress/Gateway 등의 배포 환경에서 연결합니다. 실제 클러스터 적용은 별도로 진행합니다.

참고: [Kubernetes 리소스 requests와 limits](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/)
