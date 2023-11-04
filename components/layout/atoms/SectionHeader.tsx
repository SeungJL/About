import { faChevronRight } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import styled from "styled-components";

interface ISectionHeader {
  title: string;
  subTitle?: string;
  url: string;
}

function SectionHeader({ title, subTitle, url }: ISectionHeader) {
  const router = useRouter();
  return (
    <Layout>
      <Title>{title}</Title>
      <ShowAllBtn onClick={() => router.push(`${url}`)}>
        <span>{subTitle || "더보기"}</span>
        <FontAwesomeIcon icon={faChevronRight} size="sm" />
      </ShowAllBtn>
    </Layout>
  );
}

const Layout = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: var(--padding-main);
  margin-bottom: var(--margin-main);
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 700;
`;
const ShowAllBtn = styled.button`
  color: var(--font-h3);
  font-size: 12px;
  > span:first-child {
    margin-right: var(--margin-min);
  }
`;
export default SectionHeader;
