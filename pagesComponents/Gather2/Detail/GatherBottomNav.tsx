import { Button } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import { SetStateAction, useState } from "react";
import styled from "styled-components";
import ModalPortal from "../../../components/ModalPortal";
import { useGatherCancelMutation } from "../../../hooks/gather/mutations";
import GatherExpireModal from "../../../modals/Gather/GatherExpireModal";
import GatherParticipateModal from "../../../modals/Gather/GatherParticipateModal";
import { IGatherContent } from "../../../types/gather";

interface IGatherBottomNav {
  data: IGatherContent;
  setIsRefetching: React.Dispatch<SetStateAction<boolean>>;
}

function GatherBottomNav({ data, setIsRefetching }: IGatherBottomNav) {
  const router = useRouter();
  const { data: session } = useSession();
  const myUid = session.uid;
  const myGather = data.user.uid === myUid;
  const isParticipant = data?.participants.some(
    (who) => who?.user.uid === myUid
  );
  const [isExpirationModal, setIsExpirationModal] = useState(false);
  const [isParticipationModal, setIsParticipationModal] = useState(false);
  const gatherId = +router.query.id;

  const { mutate: cancel } = useGatherCancelMutation(gatherId);

  const onClick = (type: string) => {
    if (type === "cancel") {
      cancel();
      setIsRefetching(true);
    }
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
      </Layout>{" "}
      {isParticipationModal && (
        <ModalPortal setIsModal={setIsParticipationModal}>
          <GatherParticipateModal
            setIsModal={setIsParticipationModal}
            setIsRefetching={setIsRefetching}
          />
        </ModalPortal>
      )}
      {isExpirationModal && (
        <ModalPortal setIsModal={setIsExpirationModal}>
          <GatherExpireModal
            setIsModal={setIsExpirationModal}
            setIsRefetching={setIsRefetching}
          />
        </ModalPortal>
      )}
    </>
  );
}

const Layout = styled.nav`
  width: 100%;
  height: 72px;
  position: fixed;
  bottom: 0;
  padding: 14px;
  left: 0;
`;

export default GatherBottomNav;
