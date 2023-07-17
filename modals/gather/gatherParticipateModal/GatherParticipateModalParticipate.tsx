import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useGatherParticipateMutation } from "../../../hooks/gather/mutations";
import { useCompleteToast, useErrorToast } from "../../../hooks/ui/CustomToast";
import { IModal, IRefetch } from "../../../types/reactTypes";

function GatherParticipateModalParticipate({
  setIsModal,
  setIsRefetch,
}: IModal & IRefetch) {
  const completeToast = useCompleteToast();
  const errorToast = useErrorToast();

  const router = useRouter();
  const gatherId = +router.query.id;

  const { mutate: participate } = useGatherParticipateMutation(gatherId, {
    onSuccess() {
      completeToast("free", "모임 참여 완료!");
    },
    onError: errorToast,
  });

  const selectGatherTime = (time: "first" | "second") => {
    participate(time);
    setIsRefetch(true);
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
      <Message>늦참의 경우 일단 신청 후 댓글에 남겨주세요!</Message>
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
  color: var(--font-h3);
`;

export default GatherParticipateModalParticipate;
