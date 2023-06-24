import { Button } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { SetStateAction, useState } from "react";
import styled from "styled-components";
import ModalPortal from "../../../components/ModalPortal";
import ApplyParticipationModal from "../../../modals/gather/ApplyParticipationModal";
import ExpireGatherModal from "../../../modals/gather/ExpireGatherModal";
import { IGatherContent } from "../../../types/gather";

interface IGatherBottomNav {
  data: IGatherContent;
  setIsRefetching: React.Dispatch<SetStateAction<boolean>>;
}

function GatherBottomNav({ data, setIsRefetching }: IGatherBottomNav) {
  const { data: session } = useSession();
  const myUid = session.uid;
  const myGather = data.user.uid === myUid;
  const isParticipant = data?.participants.some((who) => who?.uid === myUid);
  const [isExpirationModal, setIsExpirationModal] = useState(false);
  const [isParticipationModal, setIsParticipationModal] = useState(false);

  const onClickParticipation = () => {
    setIsParticipationModal(true);
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
            onClick={() => setIsExpirationModal(true)}
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
            onClick={() => setIsExpirationModal(true)}
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
            onClick={onClickParticipation}
          >
            참여하기
          </Button>
        )}
      </Layout>{" "}
      {isParticipationModal && (
        <ModalPortal setIsModal={setIsParticipationModal}>
          <ApplyParticipationModal
            setIsModal={setIsParticipationModal}
            setIsRefetching={setIsRefetching}
          />
        </ModalPortal>
      )}
      {isExpirationModal && (
        <ModalPortal setIsModal={setIsExpirationModal}>
          <ExpireGatherModal
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
