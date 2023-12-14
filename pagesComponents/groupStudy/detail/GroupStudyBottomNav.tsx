import { Button } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import styled from "styled-components";

import { useResetQueryData } from "../../../hooks/custom/CustomHooks";
import {
  useCompleteToast,
  useErrorToast,
} from "../../../hooks/custom/CustomToast";
import { useGroupStudyParticipationMutation } from "../../../hooks/groupStudy/mutations";
import { GatherStatus } from "../../../types/page/gather";
import { IGroupStudy } from "../../../types/page/groupStudy";

interface IGroupStudyBottomNav {
  data: IGroupStudy;
}

type ButtonType = "cancel" | "participate" | "expire";

function GroupStudyBottomNav({ data }: IGroupStudyBottomNav) {
  const router = useRouter();
  const completeToast = useCompleteToast();

  const errorToast = useErrorToast();
  const { data: session } = useSession();
  const myUid = session.uid;
  const myGroupStudy = data.organizer.uid === myUid;
  const isParticipant = data?.participants.some(
    (who) => who && who.uid === myUid
  );
  const [isExpirationModal, setIsExpirationModal] = useState(false);
  const [isParticipationModal, setIsParticipationModal] = useState(false);
  const groupStudyId = +router.query.id;

  const resetQueryData = useResetQueryData();

  const { mutate: participate } = useGroupStudyParticipationMutation(
    "post",
    groupStudyId,
    {
      onSuccess() {
        completeToast("free", "신청되었습니다", true);
        // resetQueryData([GROUPSTUDY_CONTENT]);
      },
      onError: errorToast,
    }
  );
  const { mutate: cancel } = useGroupStudyParticipationMutation(
    "delete",
    groupStudyId,
    {
      onSuccess() {
        completeToast("free", "참여 신청이 취소되었습니다.", true);
        // resetQueryData([GROUPSTUDY_CONTENT]);
      },
      onError: errorToast,
    }
  );

  const onClick = (type: ButtonType) => {
    if (type === "cancel") cancel();
    if (type === "participate") setIsParticipationModal(true);
    if (type === "expire") setIsExpirationModal(true);
  };

  interface IButtonSetting {
    text: string;
    handleFunction?: () => void;
  }

  const getButtonSettings = (status: GatherStatus): IButtonSetting => {
    switch (status) {
      case "open":
        return {
          text: "모임장은 단톡방을 만들어주세요!",
        };
      case "close":
        return {
          text: "취소된 모임입니다.",
        };
    }
    if (myGroupStudy)
      return { text: "모집 종료", handleFunction: () => onClick("expire") };
    if (isParticipant) {
      return { text: "참여 취소", handleFunction: () => onClick("cancel") };
    }
    return {
      text: "가입 신청",
      handleFunction: () => onClick("participate"),
    };
  };

  const { text, handleFunction } = getButtonSettings(data?.status);

  return (
    <>
      <Layout>
        <Button
          size="lg"
          h="48px"
          w="100%"
          borderRadius="var(--border-radius2)"
          disabled={!handleFunction}
          colorScheme={handleFunction ? "mintTheme" : "blackAlpha"}
          onClick={handleFunction}
        >
          {text}
        </Button>
      </Layout>
      {/* {isParticipationModal && (
        <GroupStudyParticipateModal setIsModal={setIsParticipationModal} />
      )}
      {isExpirationModal && (
        <GroupStudyExpireModal setIsModal={setIsExpirationModal} />
      )} */}
    </>
  );
}

const Layout = styled.nav`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 0);
  width: 100%;
  max-width: 390px;
  padding: var(--padding-main);
`;

export default GroupStudyBottomNav;
