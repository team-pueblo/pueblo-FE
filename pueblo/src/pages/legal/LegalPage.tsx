import { useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as S from "./LegalPage.styled";

function PrivacyContent() {
  return <>
    <p>Team pueblo(이하 “운영팀”)는 pueblo(푸에블로) 서비스의 개인정보 처리 내용을 이용자가 쉽게 확인할 수 있도록 안내합니다.</p>
    <section>
      <h2>1. 개인정보의 처리 목적 및 항목</h2>
      <p>상품과 브랜드는 회원가입 없이 검색할 수 있습니다. 아래 표는 현재 서비스 화면과 브라우저 저장 기능을 기준으로 작성했습니다.</p>
      <S.TableWrap role="region" aria-label="개인정보 처리 항목 표, 가로 스크롤 가능" tabIndex={0}>
        <table>
          <caption>서비스별 입력·저장 항목</caption>
          <thead><tr><th scope="col">구분 및 목적</th><th scope="col">항목</th><th scope="col">보유 및 이용 기간</th></tr></thead>
          <tbody>
            <tr><td>로그인 및 계정 확인</td><td>이메일, 비밀번호</td><td>계정 인증에 필요한 기간</td></tr>
            <tr><td>로그인 상태 및 아이디 기억</td><td>인증 토큰, 사용자 정보, 기억하기를 선택한 이메일</td><td>브라우저 저장 데이터 삭제 시까지. 토큰의 유효기간은 인증 서버 정책에 따름</td></tr>
            <tr><td>관심목록·장바구니 유지</td><td>상품 식별자, 선택한 옵션, 수량</td><td>항목 삭제 또는 브라우저 저장 데이터 삭제 시까지</td></tr>
            <tr><td>회원가입 입력 화면</td><td>아이디, 비밀번호, 생년월일, 키, 몸무게, 유저아이디, 성별, 전신 사진(선택)</td><td>현재 입력 화면을 이용하는 동안</td></tr>
          </tbody>
        </table>
      </S.TableWrap>
    </section>
    <section><h2>2. 개인정보의 보유 및 파기</h2><p>개인정보는 처리 목적에 필요한 범위에서 보유하는 것을 원칙으로 하며, 법령에 따른 보관 의무가 있는 경우 해당 법령을 따릅니다.</p><p>기기에 저장된 관심목록·장바구니·로그인 정보는 브라우저의 사이트 데이터 삭제 기능으로 삭제할 수 있습니다. 기기 데이터 삭제만으로 서버에 보관된 계정 정보가 삭제되지는 않습니다.</p></section>
    <section><h2>3. 외부 서비스 이용</h2><p>서비스에는 오류 진단을 위한 Sentry 연동이 포함되어 있으며 설정에 따라 활성화될 수 있습니다. 개인정보의 제3자 제공, 처리 위탁 및 국외 이전에는 관계 법령에 따른 고지와 동의 요건이 적용됩니다.</p></section>
    <section><h2>4. 이용자의 권리와 행사 방법</h2><p>이용자는 관련 법령에 따라 자신의 개인정보 열람, 정정·삭제, 처리정지 및 동의 철회를 요청할 수 있습니다. 관련 문의는 아래 운영팀 이메일로 보내주시기 바랍니다.</p></section>
    <section><h2>5. 브라우저 저장 정보</h2><p>pueblo는 아이디 기억, 로그인 상태, 관심목록 및 장바구니 기능에 브라우저의 로컬 저장소를 사용합니다. 브라우저 설정에서 사이트 데이터를 삭제하거나 저장을 제한할 수 있으며, 이 경우 해당 기능의 저장 상태가 초기화되거나 이용이 제한될 수 있습니다.</p></section>
    <section><h2>6. 개인정보 보호 문의</h2><p>운영팀: Team pueblo(최홍석, 허완)<br />주소: 전북특별자치도 전주시 덕진구 백제대로 567 전북대학교 공과대학 7호관</p><p>문의 이메일: <a href="mailto:pueblo.team@icloud.com">pueblo.team@icloud.com</a></p></section>
    <section><h2>7. 방침의 공개 및 변경</h2><p>개인정보처리방침이 변경되는 경우 이 페이지에서 변경 내용을 안내합니다.</p><p>참고: <a href="https://www.law.go.kr/LSW/lsLinkCommonInfo.do?lsJoLnkSeq=1032645945" target="_blank" rel="noreferrer">개인정보 보호법 제30조</a></p></section>
  </>;
}

function TermsContent() {
  return <>
    <p>제1장 총칙</p>
    <section><h2>제1조 (목적)</h2><p>이 약관은 Team pueblo(이하 “운영팀”)가 제공하는 pueblo(푸에블로) 서비스의 이용 조건과 이용자 및 운영팀의 권리·의무에 관한 기본 사항을 정하는 것을 목적으로 합니다.</p></section>
    <section><h2>제2조 (정의)</h2><ol><li>“서비스”란 pueblo 웹사이트에서 제공하는 상품·브랜드 정보 조회, 검색, 관심목록, 장바구니 및 관련 기능을 말합니다.</li><li>“이용자”란 웹사이트에 접속해 서비스를 이용하는 사람을 말합니다.</li><li>“회원”이란 정식 회원가입 절차가 제공되는 경우 해당 절차를 완료한 이용자를 말합니다.</li></ol></section>
    <section><h2>제3조 (운영자 정보 및 약관의 안내)</h2><p>서비스명은 pueblo(푸에블로), 운영팀은 Team pueblo(최홍석, 허완)입니다. 주소는 전북특별자치도 전주시 덕진구 백제대로 567 전북대학교 공과대학 7호관입니다.</p><p>이용자는 푸터의 이용약관 링크에서 본문을 확인할 수 있습니다. 약관 변경 사항은 서비스 내에서 안내합니다.</p></section>
    <section><h2>제4조 (서비스의 내용)</h2><ol><li>상품 및 브랜드 정보 조회와 검색</li><li>관심 상품 저장과 장바구니 관리</li><li>제공되는 범위 내의 계정 관련 기능</li></ol><p>준비 중인 기능은 실제 제공되는 기능과 구분해 안내합니다. 상품 정보나 장바구니의 표시만으로 구매 계약 또는 결제가 완료되는 것은 아닙니다.</p></section>
    <section><h2>제5조 (회원가입 및 계정 관리)</h2><p>회원가입 기능을 정식 제공하는 경우 필요한 정보, 가입 조건 및 동의 사항을 가입 화면에서 안내합니다. 이용자는 타인의 정보를 도용하거나 허위 정보를 등록해서는 안 되며, 계정 인증 정보를 안전하게 관리해야 합니다.</p></section>
    <section><h2>제6조 (이용자의 준수 사항)</h2><ul><li>타인의 개인정보 및 계정 도용 금지</li><li>서비스의 정상적인 운영을 방해하는 행위 금지</li><li>운영팀 또는 제3자의 저작권 등 권리를 침해하는 행위 금지</li><li>서비스를 이용한 불법 행위 금지</li></ul></section>
    <section><h2>제7조 (주문·결제·배송 및 환불)</h2><p>실제 거래 기능을 제공하기 전 판매자 정보, 상품 가격, 결제 방법, 배송 조건 및 취소·교환·환불 절차를 안내합니다. 구체적인 거래 조건은 관련 법령과 구매 시 고지된 내용에 따릅니다.</p><p>취소·교환·환불 조건은 관련 법령이 보장하는 이용자의 권리를 제한하지 않습니다.</p></section>
    <section><h2>제8조 (서비스 변경 및 중단)</h2><p>점검이나 장애 등으로 서비스가 변경 또는 중단될 경우 운영팀은 확인 가능한 방법으로 그 사유와 이용에 미치는 영향을 안내합니다. 운영팀과 이용자의 책임은 관련 법령에 따라 판단합니다.</p></section>
    <section><h2>제9조 (개인정보 보호)</h2><p>개인정보의 처리에 관한 사항은 별도로 공개하는 개인정보처리방침에 따릅니다. 개인정보 수집 및 이용에 필요한 고지와 동의는 해당 처리 절차에서 별도로 제공합니다.</p></section>
    <section><h2>제10조 (지식재산권)</h2><p>서비스에 표시된 콘텐츠, 상표 및 상품 이미지의 권리는 각 권리자에게 있습니다. 이용자는 권리자의 허락이나 법령상 근거 없이 이를 무단 복제·배포하거나 상업적으로 이용해서는 안 됩니다.</p></section>
    <section><h2>제11조 (문의 및 분쟁 해결)</h2><p>운영팀과 이용자는 서비스 이용과 관련한 의견 및 분쟁을 성실하게 협의해 해결하도록 노력합니다. 관련 분쟁에는 대한민국의 관계 법령을 적용합니다.</p><p>문의: <a href="mailto:pueblo.team@icloud.com">pueblo.team@icloud.com</a></p></section>
  </>;
}

export default function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  const navigate = useNavigate();
  const title = kind === "privacy" ? "개인정보처리방침 (전문)" : "pueblo 이용약관";
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} | pueblo`;
    window.scrollTo(0, 0);
    return () => { document.title = previousTitle; };
  }, [title]);

  const goBack = () => {
    if (typeof window.history.state?.idx === "number" && window.history.state.idx > 0) navigate(-1);
    else navigate("/", { replace: true });
  };

  return <S.Page>
    <S.Header>
      <div><button type="button" onClick={goBack} aria-label="이전 페이지로 돌아가기"><ChevronLeft size={24} strokeWidth={1} /></button><h1>{title}</h1></div>
      <nav aria-label="약관 및 정책"><S.Tab to="/terms">이용약관</S.Tab><S.Tab to="/privacy">개인정보처리방침</S.Tab></nav>
    </S.Header>
    <S.Body>
      {kind === "privacy" ? <PrivacyContent /> : <TermsContent />}
    </S.Body>
  </S.Page>;
}
