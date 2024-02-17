import { Button } from "@chakra-ui/react";
import { useState } from "react";

import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { UserItem } from "../../../components/common/user/UserItem";
import Header from "../../../components/layout/Header";
import Slide from "../../../components/layout/Slide";
import { useAdminPointSystemMutation } from "../../../hooks/admin/mutation";
import { useCompleteToast } from "../../../hooks/custom/CustomToast";
import { useGroupWaitingStatusMutation } from "../../../hooks/group/mutations";
import { isRefetchGroupInfoState } from "../../../recoil/refetchingAtoms";
import { transferGroupDataState } from "../../../recoil/transferDataAtoms";
import { IUser } from "../../../types/user/user";

function Admin() {
  const completeToast = useCompleteToast();
  const group = useRecoilValue(transferGroupDataState);

  const [deletedUsers, setDeletedUser] = useState([]);

  const setIsRefetch = useSetRecoilState(isRefetchGroupInfoState);
  const { mutate, isLoading } = useGroupWaitingStatusMutation(group.id, {
    onSuccess() {
      completeToast("free", "처리되었습니다.");
      setIsRefetch(true);
    },
  });

  const { mutate: getPoint } = useAdminPointSystemMutation();

  const onClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    status: "agree" | "refuse",
    user: IUser,
    pointType?: "point" | "deposit"
  ) => {
    const chargeFee = {
      uid: user.uid,
      type: pointType,
      message: "동아리 가입",
      value:
        pointType === "deposit" ? -group.fee || -200 : -group.fee * 0.15 || -30,
    };

    e.stopPropagation();
    setDeletedUser((old) => [...old, user._id]);
    await mutate({ status, userId: user._id });
    if (status === "agree") await getPoint(chargeFee);
  };

  return (
    <Slide>
      <Header title="관리자 페이지" url="back" />
      <Layout>
        <Title>가입 신청</Title>
        <Question>가입 질문: {group?.questionText} </Question>
        <Container>
          {group?.waiting?.map((who, idx) =>
            deletedUsers.includes(who.user._id) && !isLoading ? null : (
              <Item key={idx}>
                <UserItem user={who.user}>
                  <Button
                    onClick={(e) =>
                      onClick(e, "agree", who.user, who.pointType)
                    }
                    size="sm"
                    colorScheme="mintTheme"
                    mr="var(--gap-2)"
                  >
                    승인
                  </Button>
                  <Button
                    onClick={(e) => onClick(e, "refuse", who.user)}
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
        <Title>기타 기능</Title>
      </Layout>
    </Slide>
  );
}

const Layout = styled.div`
  padding: var(--gap-4);
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 18px;
  border-bottom: var(--border);
  padding: var(--gap-2) 0;
`;

const Question = styled.div`
  padding: var(--gap-3) 0;
  font-size: 16px;
`;

const Container = styled.div`
  margin-bottom: var(--gap-5);
`;

const Item = styled.div``;

const Content = styled.div`
  font-size: 14px;
  padding: var(--gap-3);
`;

export default Admin;
