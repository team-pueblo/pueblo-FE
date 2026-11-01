# 구매·주문 화면 QA

- Source: 사용자 첨부 KREAM 구매 모달, 배송/결제, 구매 상세 스크린샷 (2026-11-01 16:45~16:51)
- 구현 캡처: /tmp/pueblo-modal-desktop.png, /tmp/pueblo-order-desktop.png, /tmp/pueblo-order-mobile.png, /tmp/pueblo-order-detail-desktop.png, /tmp/pueblo-order-detail-mobile.png
- Viewport: desktop 1440×1000, mobile 390×844, deviceScaleFactor 1.
- 비교 기준: 브라우저 크롬을 제외한 앱 영역. KREAM의 브랜드·개인정보·혜택은 복제하지 않고 pueblo의 실제 상품과 API 계약 적용.
- 상태: 옵션 선택 전 모달, 배송지 입력 전 주문서, RECONCILIATION_REQUIRED 주문 상세.

## 확인 결과
- 중앙 모달, 상품 요약, 옵션 선택, 검정/코랄 CTA, 흰 카드와 회색 배경, 구매 내역 사이드바/진행 상태/결제 내역 적용.
- 기존 앱 글꼴 유지, 제목·본문 위계 및 모바일 줄바꿈 확인.
- 실제 카탈로그 상품 이미지 사용. 주문 상세는 주문 당시 상품명·옵션·금액 사용하며 현재 이미지만 조회.
- 구매하기 → 옵션 선택 → 즉시 구매 → /checkout/new 이동 및 상품 1개 표시를 브라우저에서 확인.
- 주문 상세는 격리 브라우저 테스트 응답으로 검증. 확인 필요 상태에서 결제 버튼 0개 확인.
- 주문서·주문 상세 모바일 가로 overflow 없음.
- 빌드·린트 통과, 기존 단위 테스트 14개 통과.

## 남은 검증
- 실회원 인증을 통한 구매 목록·주문 상세 및 최종 토스 위젯 화면의 통합 검증은 미실행.
- 전체 실결제 흐름의 시각 QA는 위 통합 검증 전까지 완료로 판정하지 않음.

final result: blocked
