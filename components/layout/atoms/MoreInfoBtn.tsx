import { faChevronRight } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import styled from "styled-components";

interface IMoreInfoBtn {
  url: string;
}

function MoreInfoBtn({ url }: IMoreInfoBtn) {
  const router = useRouter();
  return (
    <Layout
      onClick={() => {
        router.push(url);
      }}
    >
      <span>더보기</span>
      <FontAwesomeIcon icon={faChevronRight} size="sm" />
    </Layout>
  );
}

const Layout = styled.div`
  height: 44px;
  box-shadow: var(--box-shadow-sub);
  display: flex;
  justify-content: center;
  background-color: white;
  align-items: center;
  margin-top: var(--margin-main);
  margin-bottom: var(--margin-max);
  border-radius: var(--border-radius-main);
  color: var(--font-h3);
  font-weight: 600;
  > span:first-child {
    margin-right: var(--margin-md);
  }
`;

export default MoreInfoBtn;
