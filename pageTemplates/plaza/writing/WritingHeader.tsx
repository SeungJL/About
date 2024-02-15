import { faX } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import styled from "styled-components";

function WritingHeader() {
  const router = useRouter();
  return (
    <Layout>
      <div>
        <FontAwesomeIcon icon={faX} onClick={() => router.push(`/plaza`)} />
        <Title>글 쓰기</Title>
      </div>
      <Complete id="plazaWrite" form="plazaWrite">
        완료
      </Complete>
    </Layout>
  );
}

const Layout = styled.div`
  height: 46px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--gray-5);
`;
const Title = styled.span`
  font-size: 16px;
  margin-left: 24px;
  font-weight: 600;
`;

const Complete = styled.button`
  padding: 4px 12px;
  border-radius: 20px;
  background-color: var(--color-mint);
  color: white;
  font-size: 12px;
  font-weight: 600;
`;
export default WritingHeader;
