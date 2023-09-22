import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import KakaoShareBtn from "../../components/features/lib/KakaoShareBtn";
import { ModalHeaderX } from "../../components/modal/ModalComponents";
import { ModalLayout } from "../../components/modal/Modals";

import { WEB_URL } from "../../constants/system";
import { GATHER_SHARE_IMAGES } from "../../storage/Gather";
import { ModalMain, ModalSubtitle } from "../../styles/layout/modal";
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

  const onClickItem = (idx) => {
    if (idx === selectedItem) setSelectedItem(null);
    else setSelectedItem(idx);
  };

  return (
    <ModalLayout size="xl" height={430}>
      <ModalHeaderX title="공유 이미지 선택" setIsModal={setIsModal} />
      <ModalMain>
        <ModalSubtitle>단톡방에 공유 할 이미지를 선택해 주세요!</ModalSubtitle>
        <Container>
          {GATHER_SHARE_IMAGES.map((item, idx) => (
            <Item
              key={idx}
              onClick={() => onClickItem(idx)}
              isSelected={idx === selectedItem}
            >
              <Image src={item} layout="fill" alt="gatherShareImage" />
            </Item>
          ))}
        </Container>
      </ModalMain>
      <ShareBtnWrapper>
        <KakaoShareBtn
          title={title}
          subtitle={dayjs(date).format("M월 DD일(dd)")}
          type="gather"
          url={WEB_URL + router.asPath}
          location={locationMain}
          isBig={true}
          img={
            selectedItem
              ? GATHER_SHARE_IMAGES[selectedItem]
              : GATHER_SHARE_IMAGES[1]
          }
        />
      </ShareBtnWrapper>
    </ModalLayout>
  );
}

const Header = styled.header``;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  width: 100%;
  height: 100%;
  gap: var(--margin-sub);
`;

const Item = styled.div<{ isSelected: boolean }>`
  position: relative;
  border: ${(props) =>
    props.isSelected ? "4px solid var(--color-mint)" : null};

  border-radius: var(--border-radius-sub);
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
