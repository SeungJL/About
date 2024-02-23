import { Button, ModalFooter } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import KakaoShareBtn from "../../components/common/Icon/KakaoShareBtn";
import { ModalLayout } from "../../components/modals/Modals";
import { GATHER_SHARE_IMAGES } from "../../constants/image/imageUrl";
import { WEB_URL } from "../../constants/system";

import { ModalSubtitle } from "../../styles/layout/modal";
import { IGatherHeader } from "../../types/page/gather";
import { IModal } from "../../types/reactTypes";

interface IGatherKakaoShareModal extends IModal, IGatherHeader {}

function GatherKakaoShareModal({
  title,
  date,
  locationMain,
  setIsModal,
}: IGatherKakaoShareModal) {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<number>();
  const [adminImageUrl, setAdminImageUrl] = useState<string>();

  const { data: session } = useSession();

  const onClickItem = (idx) => {
    if (idx === selectedItem) setSelectedItem(null);
    else setSelectedItem(idx);
  };

  const onClickAdminBtn = () => {
    if (adminImageUrl) setAdminImageUrl(null);
    else
      setAdminImageUrl(
        "https://studyabout.s3.ap-northeast-2.amazonaws.com/%EB%AA%A8%EC%9E%84+%EA%B3%B5%EC%9C%A0+%EC%9D%B4%EB%AF%B8%EC%A7%80/%EC%A0%95%EA%B8%B0+%EC%8A%A4%ED%84%B0%EB%94%94.jpg"
      );
  };

  return (
    <ModalLayout title="공유 이미지 선택" setIsModal={setIsModal}>
      <ModalSubtitle>
        단톡방에 공유 할 이미지를 선택해 주세요!
        {session?.user.uid === "2259633694" && (
          <Button
            ml="4px"
            size="xs"
            colorScheme={adminImageUrl ? "mintTheme" : "gray"}
            onClick={onClickAdminBtn}
          >
            스터디
          </Button>
        )}
      </ModalSubtitle>
      <Container>
        {GATHER_SHARE_IMAGES.map((item, idx) => (
          <Item
            key={idx}
            onClick={() => onClickItem(idx)}
            isSelected={idx === selectedItem}
          >
            <Image
              src={item}
              fill={true}
              sizes="150px"
              alt="gatherShareImage"
            />
          </Item>
        ))}
      </Container>

      <ModalFooter p="var(--gap-3) var(--gap-4)">
        <KakaoShareBtn
          title={title}
          subtitle={date === "미정" ? date : dayjs(date).format("M월 D일(dd)")}
          type="gather"
          url={WEB_URL + router.asPath}
          location={locationMain}
          isBig={true}
          img={
            adminImageUrl ||
            (selectedItem !== null
              ? GATHER_SHARE_IMAGES[selectedItem]
              : GATHER_SHARE_IMAGES[1])
          }
        />
      </ModalFooter>
    </ModalLayout>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  width: 100%;
  height: 100%;
  gap: var(--gap-3);
`;

const Item = styled.div<{ isSelected: boolean }>`
  position: relative;
  border: ${(props) =>
    props.isSelected ? "4px solid var(--color-mint)" : null};

  border-radius: var(--rounded-lg);
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ShareBtnWrapper = styled.div`
  margin-top: auto;
`;

export default GatherKakaoShareModal;
