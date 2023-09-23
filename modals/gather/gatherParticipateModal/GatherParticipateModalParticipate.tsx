import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useCompleteToast, useErrorToast } from "../../../hooks/CustomToast";
import { useGatherParticipateMutation } from "../../../hooks/gather/mutations";
import { usePointMutation } from "../../../hooks/user/pointSystem/mutation";
import { IModal, IRefetch } from "../../../types/reactTypes";

function GatherParticipateModalParticipate({
  setIsModal,
  setIsRefetch,
}: IModal & IRefetch) {
  const completeToast = useCompleteToast();
  const errorToast = useErrorToast();

  const router = useRouter();
  const gatherId = +router.query.id;

  const { mutate } = usePointMutation();

  const { mutate: participate } = useGatherParticipateMutation(gatherId, {
    onSuccess() {
      setIsRefetch(true);
      mutate({ value: 50, message: "조모임 참여" });
      completeToast("free", "적립 완료!");
    },
    onError: errorToast,
  });

  const selectGatherTime = (time: "first" | "second") => {
    participate(time);
    setIsModal(false);
  };

  return (
    <>
      <Layout>
        <Button
          color="white"
          backgroundColor="var(--color-mint)"
          marginBottom="var(--margin-main)"
          height="48px"
          fontSize="17px"
          onClick={() => selectGatherTime("first")}
          _hover={{ bg: "var(--color-mint)" }}
        >
          1차 참여 신청
        </Button>
        <Button
          onClick={() => selectGatherTime("second")}
          height="48px"
          fontSize="17px"
        >
          2차 참여 신청
        </Button>
      </Layout>
      <Message>기준 시간보다 늦참인 경우, 신청 후 댓글 남겨주세요!</Message>
    </>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  margin-top: var(--margin-main);
`;
const Message = styled.span`
  display: inline-block;
  margin-top: var(--margin-main);
  font-size: 11px;
  color: var(--font-h1);
`;

export default GatherParticipateModalParticipate;
