import { Button } from "@chakra-ui/react";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useRouter } from "next/dist/client/router";
import styled from "styled-components";
import Skeleton from "../../../../components/common/Skeleton";
function StudySpaceVoteOverviewSkeleton() {
  const router = useRouter();
  const date = dayjs(router.query.date as string);
  return (
    <>
      <Layout>
        <span>{date.format("M월 DD일 참여 멤버")}</span>
        <div />
        <Container>
          <FontAwesomeIcon icon={faUserGroup} size="sm" />
          <div>
            현재
            <span>
              <Skeleton>t</Skeleton>
            </span>
            명이 투표했어요
          </div>
          <Button size="xs" ml="8px" colorScheme="mintTheme">
            친구초대
          </Button>
        </Container>
      </Layout>
    </>
  );
}

const Layout = styled.div`
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  > span:first-child {
    font-weight: 600;
    font-size: 18px;
  }
  > div {
    height: 12px;
  }
`;

const Container = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  margin-left: 3px;
  color: var(--font-h2);
  > div {
    margin-left: 5px;
    > span {
      margin-left: 4px;
      display: inline-block;
      width: 20px;
    }
  }
`;

export default StudySpaceVoteOverviewSkeleton;
