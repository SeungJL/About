import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

interface IMemberSectionTitle {
  category: string;
  subTitle: string;
}

function MemberSectionTitle({ category, subTitle }: IMemberSectionTitle) {
  return (
    <Layout>
      <TitleWrapper>
        <span>{category}</span>
        <span>{subTitle}</span>
      </TitleWrapper>
      <Button>
        <span>더보기</span>
        <FontAwesomeIcon icon={faChevronRight} />
      </Button>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;

  > span:first-child {
    color: var(--color-mint);
    font-size: 12px;
  }
  > span:last-child {
    font-weight: 600;
    font-size: 14px;
  }
`;

const Button = styled.button`
  align-self: flex-end;
  color: var(--font-h3);
  font-size: 12px;
  > span {
    margin-right: var(--margin-min);
  }
`;

export default MemberSectionTitle;
