import { useRouter } from "next/router";
import styled from "styled-components";

import { XAlertIcon } from "../components/common/Icon/AlertIcon";

function NoMember({}) {
  const router = useRouter();
  const onClicked = () => {};
  return (
    <Layout>
      <Icon>
        <XAlertIcon />
      </Icon>
      <Content>
        <span>접근 권한이 없어요!</span>
        <span style={{ textAlign: "center" }}>
          현재 동아리원이 맞으신가요?
          <br /> 참여를 위해서는 관리자에게 문의해 주세요!
        </span>
      </Content>

      <Button onClick={() => router.push(`/login`)}>확인</Button>
    </Layout>
  );
}

const Layout = styled.div`
  width: 375px;
  height: 100vh;
  left: 50%;
  top: 0;
  transform: translate(-50%, 0);
  z-index: 2000;
  position: fixed;
  background-color: white;
`;

const Icon = styled.div`
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--color-mint);
`;

const Content = styled.div`
  width: 100%;
  position: absolute;
  top: 39%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  > span:first-child {
    color: var(--font-h1);
    font-weight: 600;
    font-size: 22px;
  }
  > span:last-child {
    display: inline-block;
    margin-top: 14px;
    font-size: 17px;
    color: var(--font-h2);
    font-weight: 500;
  }
`;

const Button = styled.button`
  width: 335px;
  position: absolute;
  top: 640px;
  border-radius: 13px;
  color: white;
  padding: 14px 100px 14px 100px;
  font-size: 15px;
  font-weight: 700;
  gap: 10px;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-mint);
`;

export default NoMember;

const IconCheckMint = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="82"
    height="84"
    viewBox="0 0 82 84"
    fill="none"
  >
    <g filter="url(#filter0_d_212_2481)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M41.0002 75.1668C59.8699 75.1668 75.1668 59.8699 75.1668 41.0002C75.1668 22.1304 59.8699 6.8335 41.0002 6.8335C22.1304 6.8335 6.8335 22.1304 6.8335 41.0002C6.8335 59.8699 22.1304 75.1668 41.0002 75.1668ZM58.5243 32.4387C59.4569 31.2517 59.2507 29.5334 58.0637 28.6007C56.8767 27.6681 55.1584 27.8743 54.2257 29.0613L37.4702 50.3865L27.682 39.2001C26.688 38.064 24.9612 37.9489 23.8251 38.943C22.689 39.937 22.5739 41.6638 23.568 42.7999L35.5263 56.4666C36.0619 57.0788 36.8424 57.4205 37.6556 57.399C38.4687 57.3775 39.23 56.995 39.7326 56.3554L58.5243 32.4387Z"
        fill="#00C2B3"
      />
    </g>
  </svg>
);
