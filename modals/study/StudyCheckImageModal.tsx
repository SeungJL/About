import { Button } from "@chakra-ui/react";
import { faCameraViewfinder } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ModalHeaderX } from "../../components/modals/ModalComponents";
import { ModalLayout } from "../../components/modals/Modals";
import { POINT_SYSTEM_PLUS } from "../../constants/contentsValue/pointSystem";
import { getToday } from "../../helpers/dateHelpers";
import {
  useCompleteToast,
  useErrorToast,
  useFailToast,
} from "../../hooks/CustomToast";
import { useStudyArrivedMutation } from "../../hooks/study/mutations";
import { useAboutPointMutation } from "../../hooks/user/pointSystem/mutation";
import { isRefetchStudySpaceState } from "../../recoil/refetchingAtoms";
import { ModalMain, ModalSubtitle } from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";

function StudyCheckImageModal({ setIsModal }: IModal) {
  const completeToast = useCompleteToast();
  const errorToast = useErrorToast();
  const failToast = useFailToast();

  const setIsRefetchStudySpace = useSetRecoilState(isRefetchStudySpaceState);

  const { mutate: getAboutPoint } = useAboutPointMutation();

  const { mutate: handleArrived } = useStudyArrivedMutation(getToday(), {
    onSuccess() {
      getAboutPoint(POINT_SYSTEM_PLUS.STUDY_PRIVATE_ATTEND);
      completeToast("free", "출석 완료 !");
      setIsRefetchStudySpace(true);
      setIsModal(false);
    },
    onError: errorToast,
  });

  const [imageSrc, setImageSrc] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const fileInputRef = useRef(null);

  const handleBtnClick = () => {
    fileInputRef.current.click();
  };

  const onSubmit = () => {
    if (!imageSrc) {
      failToast("free", "인증 사진을 첨부해주세요!");
      return;
    }
    handleArrived(null);
  };

  return (
    <ModalLayout size="md" height={320}>
      <ModalHeaderX title="출석체크" setIsModal={setIsModal} />
      <ModalMain>
        <ModalSubtitle>참여를 인증할 수 있는 사진을 올려주세요!</ModalSubtitle>
        <Input
          ref={fileInputRef}
          id="studyCheckInput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <Container onClick={handleBtnClick}>
          {!imageSrc ? (
            <>
              <FontAwesomeIcon
                icon={faCameraViewfinder}
                size="4x"
                color="var(--font-h4)"
              />
              <CameraText>사진 올리기</CameraText>
            </>
          ) : (
            <ImageContainer>
              <Image
                src={imageSrc}
                alt="Image Preview"
                width={140}
                height={140}
              />
            </ImageContainer>
          )}
        </Container>
      </ModalMain>
      <Button size="lg" colorScheme="mintTheme" onClick={onSubmit}>
        출석
      </Button>
    </ModalLayout>
  );
}

const Input = styled.input`
  display: none;
`;

const CameraText = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: var(--font-h4);
  margin-top: var(--margin-sub);
`;

const Container = styled.div`
  margin: var(--margin-min) 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1.5px dashed var(--font-h5);
  border-radius: var(--border-radius-main);
  background-color: var(--font-h8);
`;

const ImageContainer = styled.div`
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
`;

export default StudyCheckImageModal;
