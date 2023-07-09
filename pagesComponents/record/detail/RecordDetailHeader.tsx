import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import styled from "styled-components";

function RecordDetailHeader() {
  const router = useRouter();

  return (
    <Layout>
      <div onClick={() => router.back()}>
        <FontAwesomeIcon icon={faChevronLeft} size="lg" />
      </div>
    </Layout>
  );
}

const Layout = styled.div`
  height: 46px;
  padding: 0 var(--padding-main);
  display: flex;
  align-items: center;
  color: white;
  background-color: var(--color-mint);
`;

export default RecordDetailHeader;
