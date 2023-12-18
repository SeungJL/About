import { Button } from "@chakra-ui/react";
import { useState } from "react";

import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { UserItem } from "../../../components/common/user/UserItem";
import Header from "../../../components/layout/Header";
import PageLayout from "../../../components/layout/PageLayout";
import { useCompleteToast } from "../../../hooks/custom/CustomToast";
import { useGroupStudyWaitingStatusMutation } from "../../../hooks/groupStudy/mutations";
import { isRefetchGroupStudyInfoState } from "../../../recoil/refetchingAtoms";
import { transferGroupStudyDataState } from "../../../recoil/transferDataAtoms";

function Admin() {
  const completeToast = useCompleteToast();
  const groupStudy = useRecoilValue(transferGroupStudyDataState);
  console.log(groupStudy);

  const [deletedUsers, setDeletedUser] = useState([]);

  const setIsRefetch = useSetRecoilState(isRefetchGroupStudyInfoState);
  const { mutate, isLoading } = useGroupStudyWaitingStatusMutation(
    groupStudy.id,
    {
      onSuccess() {
        completeToast("free", "처리되었습니다.");
        setIsRefetch(true);
      },
    }
  );

  const onClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    status: "agree" | "refuse",
    userId: string
  ) => {
    e.stopPropagation();
    setDeletedUser((old) => [...old, userId]);
    mutate({ status, userId });
  };

  return (
    <PageLayout>
      <Header title="관리자 페이지" url="back" />
      <Layout>
        <Title>가입 신청</Title>
        <Question>가입 질문: {groupStudy?.questionText} </Question>
        <Container>
          {groupStudy?.waiting?.map((who, idx) =>
            deletedUsers.includes(who.user._id) && !isLoading ? null : (
              <Item key={idx}>
                <UserItem user={who.user}>
                  <Button
                    onClick={(e) => onClick(e, "agree", who.user._id)}
                    size="sm"
                    colorScheme="mintTheme"
                    mr="var(--margin-md)"
                  >
                    승인
                  </Button>
                  <Button
                    onClick={(e) => onClick(e, "refuse", who.user._id)}
                    size="sm"
                    variant="outline"
                    color="var(--color-red)"
                    borderColor="var(--color-red)"
                  >
                    거절
                  </Button>
                </UserItem>
                {who?.answer && <Content>{who.answer}</Content>}
              </Item>
            )
          )}
        </Container>
      </Layout>
    </PageLayout>
  );
}

const Layout = styled.div`
  padding: var(--padding-main);
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 18px;
  border-bottom: var(--border-main);
  padding: var(--padding-md) 0;
`;

const Question = styled.div`
  padding: var(--padding-sub) 0;
  font-size: 16px;
`;

const Container = styled.div``;

const Item = styled.div``;

const Content = styled.div`
  font-size: 14px;
  padding: var(--padding-sub);
`;

export default Admin;
