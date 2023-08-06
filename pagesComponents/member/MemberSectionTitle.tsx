import styled from "styled-components";
import { MemberSectionCategory } from "../../types/page/member";

interface IMemberSectionTitle {
  category: MemberSectionCategory;
  subTitle: string;
  setClickSection?: React.Dispatch<MemberSectionCategory>;
}

function MemberSectionTitle({
  category,
  subTitle,
  setClickSection,
}: IMemberSectionTitle) {
  return (
    <Layout>
      <TitleWrapper>
        <span>{category}</span>
        <span>{subTitle}</span>
      </TitleWrapper>
      {/* <Button onClick={() => setClickSection(category)}>
        <span>더보기</span>
        <FontAwesomeIcon icon={faChevronRight} size="xs" />
      </Button> */}
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
