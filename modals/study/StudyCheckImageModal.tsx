import { Button } from "@chakra-ui/react";
import { faCamera } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRef, useState } from "react";
import styled from "styled-components";
import { ModalHeaderX } from "../../components/modals/ModalComponents";
import { ModalLayout } from "../../components/modals/Modals";
import { getToday } from "../../helpers/dateHelpers";
import { useStudyArrivedMutation } from "../../hooks/study/mutations";
import { useAboutPointMutation } from "../../hooks/user/pointSystem/mutation";
import { ModalMain, ModalSubtitle } from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";

function StudyCheckImageModal({ setIsModal }: IModal) {
  //   const completeToast = useCompleteToast();
  //   const errorToast = useErrorToast();
  //   const failToast = useFailToast();
  const { mutate: getAboutPoint } = useAboutPointMutation();

  const { mutate: handleArrived } = useStudyArrivedMutation(getToday(), {
    onSuccess() {
      //   completeToast("free", "출석 완료 !");
      //   if (isChecking && voteDate > dayjs().subtract(1, "day"))
      //     getAboutPoint(POINT_SYSTEM_PLUS.STUDY_ATTEND);
      //   if (
      //     !isFree &&
      //     dayjs(
      //       myStudyFixed?.attendences?.find(
      //         (who) => (who?.user as IUser).uid === session?.uid
      //       ).time.start
      //     ).add(1, "hour") < dayjs()
      //   )
      //     getDeposit(POINT_SYSTEM_Deposit.STUDY_ATTEND_LATE);
      //   setIsRefetchStudySpace(true);
    },
    // onError: errorToast,
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
    console.log(2);
    console.log(fileInputRef);
    fileInputRef.current.click();
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
        <Container>
          <Button
            onClick={handleBtnClick}
            w="100px"
            leftIcon={<FontAwesomeIcon icon={faCamera} />}
          >
            파일 선택
          </Button>
          {imageSrc && (
            <ImageContainer>
              <Image
                src={imageSrc}
                alt="Image Preview"
                width={150}
                height={150}
              />
            </ImageContainer>
          )}
        </Container>
      </ModalMain>
      <Button size="lg" colorScheme="mintTheme">
        출석
      </Button>
    </ModalLayout>
  );
}

const Input = styled.input`
  display: none;
`;

const Container = styled.div`
  display: flex;
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

export default StudyCheckImageModal;
