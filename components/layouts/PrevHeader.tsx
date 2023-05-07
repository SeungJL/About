import { faArrowLeft, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { SetStateAction } from "react";
import styled from "styled-components";

function PrevHeader({
  title,
  setIsPrev,
}: {
  title: string;
  setIsPrev?: React.Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Layout>
      <div onClick={() => setIsPrev(true)}>
        <FontAwesomeIcon icon={faChevronLeft} size="lg" />
      </div>
      <Title>{title}</Title>
    </Layout>
  );
}

const Layout = styled.div`
  height: 46px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  color: var(--font-h1);
`;

const Title = styled.span`
  color: var(--font-h1);
  font-size: 17px;
  font-weight: 600;
  margin-left: 16px;
`;

export default PrevHeader;
