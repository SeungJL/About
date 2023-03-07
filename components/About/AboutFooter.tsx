import { useState } from "react";
import styled from "styled-components";
import ModalPortal from "../../libs/utils/ModalPortal";
import { PrivacyPolicy } from "../../storage/PrivacyPolicy";

import Terms from "../../storage/terms";

export default function AboutFooter() {
  const [isShowTerm, setIsShowTerm] = useState(false);
  const [isShowPolicy, setIsShowPolicy] = useState(false);
  return (
    <Layout>
      <div>
        <span>상호: 어바웃 |</span>
        <span>대표자: 이승주 |</span>
        <span>연락처: 010-6230-0206</span>
      </div>
      <div>
        <span>사업자등록번호: 731-09-02162</span>
        <br />
        <span>소재지: 경기도 수원시 영통구 광교로42번길 80</span>
      </div>
      <div>
        <span>개인정보관리책임자: 이승주(j44s11@naver.com)</span>
        <br />
        <span>호스팅제공자: Heroku</span>
      </div>
      <div>
        <span onClick={() => setIsShowTerm(true)}>이용약관</span>
        <span onClick={() => setIsShowPolicy(true)}>개인정보처리방침</span>
      </div>
      {isShowTerm && (
        <ModalPortal closePortal={setIsShowTerm}>
          <Terms closeModal={setIsShowTerm} />
        </ModalPortal>
      )}
      {isShowPolicy && <PrivacyPolicy closeModal={setIsShowPolicy} />}
    </Layout>
  );
}

const Layout = styled.div`
  border-top: 1px solid rgb(0, 0, 0, 0.2);
  margin-top: 10vh;
  color: rgb(0, 0, 0, 0.6);
  > div:last-child {
    color: rgb(0, 0, 0, 0.9);
    > span {
      margin-right: 10px;
    }
  }
`;
