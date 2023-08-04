import { faMagnifyingGlass } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import styled from "styled-components";
import { IGatherSummary } from "../../pages/review";

interface IReviewGatherSummary {
  summary: IGatherSummary;
}

function ReviewGatherSummary({ summary }: IReviewGatherSummary) {
  const router = useRouter();
  const date = dayjs(summary?.date);

  const onClick = () => {
    router.push(`/gather/${summary?.id}`);
  };

  return (
    <Layout onClick={onClick}>
      <IconWrapper>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          size="lg"
          color="var(--font-h2)"
        />
      </IconWrapper>
      <Content>
        <span>{summary?.title}</span>
        <ContentDetail>
          <span>{summary?.type.title}</span>·
          <span>{summary?.location?.main}</span>·
          <span>{date.format("M월 D일")}</span>
        </ContentDetail>
      </Content>
    </Layout>
  );
}

const Layout = styled.div`
  margin: var(--margin-main);
  margin-bottom: var(--margin-max);
  border: var(--border-main);
  border-radius: var(--border-radius-sub);
  display: flex;
  padding: var(--padding-md);
  align-items: center;
  height: 60px;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;
  width: 44px;
  margin-right: var(--margin-md);
`;

const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > span:first-child {
    font-weight: 600;
    font-size: 13px;
  }
`;

const ContentDetail = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: var(--font-h3);
  > span:first-child {
    margin-right: var(--margin-min);
  }
  > span:nth-child(2) {
    margin: 0 var(--margin-min);
  }
  > span:last-child {
    margin-left: var(--margin-min);
  }
`;

export default ReviewGatherSummary;
