import { Button } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import styled from "styled-components";
import {
  useCompleteToast,
  useErrorToast,
  useFailToast,
} from "../../../hooks/CustomToast";
import { useGatherCancelMutation } from "../../../hooks/gather/mutations";
import GatherExpireModal from "../../../modals/gather/gatherExpireModal/GatherExpireModal";
import GatherParticipateModal from "../../../modals/gather/gatherParticipateModal/GatherParticipateModal";
import { IGather } from "../../../types/page/gather";
import { IRefetch } from "../../../types/reactTypes";

interface IGatherBottomNav extends IRefetch {
  data: IGather;
}

function GatherBottomNav({ data, setIsRefetch }: IGatherBottomNav) {
  const router = useRouter();
  const completeToast = useCompleteToast();
  const failToast = useFailToast();
  const errorToast = useErrorToast();
  const { data: session } = useSession();
  const myUid = session.uid;
  const myGather = data.user.uid === myUid;
  const isParticipant = data?.participants.some(
    (who) => who?.user.uid === myUid
  );
  const [isExpirationModal, setIsExpirationModal] = useState(false);
  const [isParticipationModal, setIsParticipationModal] = useState(false);
  const gatherId = +router.query.id;

  const { mutate: cancel } = useGatherCancelMutation(gatherId, {
    onSuccess() {
      completeToast("free", "취소되었습니다.", true);
      setIsRefetch(true);
    },
    onError: errorToast,
  });

  const onClick = (type: string) => {
    if (type === "cancel") cancel();
    if (type === "participate") setIsParticipationModal(true);
    if (type === "expire") setIsExpirationModal(true);
  };

  return (
    <>
      <Layout>
        {data?.status === "open" ? (
          <Button
            width="100%"
            height="100%"
            borderRadius="100px"
            colorScheme="blackAlpha"
            fontSize="15px"
            disabled
          >
            모임장은 단톡방을 만들어주세요!
          </Button>
        ) : data?.status === "close" ? (
          <Button
            width="100%"
            height="100%"
            borderRadius="100px"
            colorScheme="blackAlpha"
            fontSize="15px"
            disabled
          >
            취소된 모임입니다.
          </Button>
        ) : myGather ? (
          <Button
            width="100%"
            height="100%"
            borderRadius="100px"
            backgroundColor="var(--color-mint)"
            color="white"
            fontSize="15px"
            onClick={() => onClick("expire")}
          >
            모집종료
          </Button>
        ) : isParticipant ? (
          <Button
            width="100%"
            height="100%"
            borderRadius="100px"
            backgroundColor="var(--color-mint)"
            color="white"
            fontSize="15px"
            onClick={() => onClick("cancel")}
          >
            참여취소
          </Button>
        ) : (
          <Button
            width="100%"
            height="100%"
            borderRadius="100px"
            backgroundColor="var(--color-mint)"
            color="white"
            fontSize="15px"
            onClick={() => onClick("participate")}
          >
            참여하기
          </Button>
        )}
      </Layout>
      {isParticipationModal && (
        <GatherParticipateModal
          setIsModal={setIsParticipationModal}
          setIsRefetch={setIsRefetch}
        />
      )}
      {isExpirationModal && (
        <GatherExpireModal
          setIsModal={setIsExpirationModal}
          setIsRefetch={setIsRefetch}
        />
      )}
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
  height: 72px;
  padding: var(--padding-main);
`;

export default GatherBottomNav;
