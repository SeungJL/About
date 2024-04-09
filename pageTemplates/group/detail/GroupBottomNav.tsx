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
import { useGroupParticipationMutation } from "../../../hooks/groupStudy/mutations";

import { GatherStatus } from "../../../types/models/gather";
import { IGroup } from "../../../types/models/group";

interface IGroupBottomNav {
  data: IGroup;
}

type ButtonType = "cancel" | "participate" | "expire";

function GroupBottomNav({ data }: IGroupBottomNav) {
  const router = useRouter();
  const completeToast = useCompleteToast();

  const errorToast = useErrorToast();
  const { data: session } = useSession();

  const url = router.asPath;
  const myUid = session?.user.uid;
  const myGroup = data.organizer.uid === myUid;
  const isParticipant = data?.participants.some(
    (who) => who && who.user.uid === myUid
  );
  const isPending = data.waiting.find((who) => who.user.uid === myUid);

  const [isExpirationModal, setIsExpirationModal] = useState(false);
  const [isParticipationModal, setIsParticipationModal] = useState(false);
  const GroupId = +router.query.id;

  const resetQueryData = useResetQueryData();

  const { mutate: participate } = useGroupParticipationMutation(
    "post",
    GroupId,
    {
      onSuccess() {
        completeToast("free", "신청되었습니다", true);
        // resetQueryData([Group_CONTENT]);
      },
      onError: errorToast,
    }
  );

  const { mutate: cancel } = useGroupParticipationMutation("delete", GroupId, {
    onSuccess() {
      completeToast("free", "참여 신청이 취소되었습니다.", true);
      // resetQueryData([Group_CONTENT]);
    },
    onError: errorToast,
  });

  const onClick = (type: ButtonType) => {
    if (type === "cancel") cancel();
    if (type === "participate") router.push(`${url}/participate`);
    if (type === "expire") setIsExpirationModal(true);
  };

  interface IButtonSetting {
    text: string;
    handleFunction?: () => void;
  }

  const getButtonSettings = (
    status: GatherStatus | "gathering"
  ): IButtonSetting => {
    switch (status) {
    }
    if (isPending)
      return {
        text: "가입 대기중",
      };
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
          w="100%"
          maxW="var(--view-max-width)"
          borderRadius="var(--rounded)"
          disabled={!handleFunction}
          colorScheme={handleFunction ? "mintTheme" : "redTheme"}
          onClick={handleFunction}
        >
          {text}
        </Button>
      </Layout>
      {/* {isParticipationModal && (
        <GroupParticipateModal setIsModal={setIsParticipationModal} />
      )}
      {isExpirationModal && (
        <GroupExpireModal setIsModal={setIsExpirationModal} />
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
  padding: var(--gap-4);
`;

export default GroupBottomNav;
