import { Button } from "@chakra-ui/react";
import { faUserGroup } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useRouter } from "next/dist/client/router";
import styled from "styled-components";
import Skeleton from "../../../../components/common/masks/skeleton/Skeleton";
function StudySpaceVoteOverviewSkeleton() {
  const router = useRouter();
  const date = dayjs(router.query.date as string);
  return (
    <>
      <Layout>
        <span>{date.format("M월 D일 참여 멤버")}</span>
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
  margin: 0 var(--margin-main);
  padding-top: var(--padding-max);
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
  margin: var(--margin-min) 0;
  display: flex;
  align-items: center;
  color: var(--font-h2);
  > div {
    margin-left: var(--margin-min);
    display: flex;
    align-items: center;
    > span {
      margin-left: var(--margin-min);
      display: inline-block;
      height: 20px;
      width: 8px;
    }
  }
`;

export default StudySpaceVoteOverviewSkeleton;
