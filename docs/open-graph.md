# 카카오톡 링크 미리보기

`pueblo/index.html`에 Open Graph 태그를 선언합니다. JavaScript 실행 전의 HTML에서도 사이트 이름, 설명, 로고를 읽을 수 있습니다.

- 운영 URL: https://pueblo-fe.vercel.app/
- 공유 이미지: https://pueblo-fe.vercel.app/images/pueblo_logo.png (707 × 353 PNG)
- 모든 경로는 현재 사이트 공통 미리보기를 사용합니다. 상품별 미리보기는 구현하지 않았습니다.
- 도메인 변경 시 `og:url`과 `og:image`의 절대 주소도 변경해야 합니다.

## 배포 후 확인

1. 운영 사이트의 HTML 소스에서 `og:` 메타 태그가 있는지 확인합니다.
2. 공유 이미지 주소가 로그인 없이 열리는지 확인합니다.
3. [카카오 공유 디버거](https://developers.kakao.com/tool/debugger/sharing)에 운영 URL을 입력해 제목·설명·이미지를 확인합니다.
4. 이전 미리보기가 남으면 해당 URL의 공유 캐시를 초기화한 뒤 카카오톡에서 링크를 다시 공유합니다.

카카오톡 실제 미리보기 확인은 운영 배포 후 수행해야 합니다.

참고: [카카오 도구 안내](https://developers.kakao.com/docs/ko/tool/common), [메시지 템플릿 안내](https://developers.kakao.com/docs/ko/message-template/common)
