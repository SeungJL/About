import { Button } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";
import { ModalHeaderX } from "../../components/modals/ModalComponents";
import { ModalLayout } from "../../components/modals/Modals";
import { SQUARE_RANDOM_IMAGE } from "../../constants/image/imageUrl";
import { WEB_URL } from "../../constants/system";
import { STUDY_SPACE_INFO } from "../../storage/study";
import { ModalMain } from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";
import { IPlace } from "../../types/study/study";
const kakaoAppKey = process.env.NEXT_PUBLIC_KAKAO_JS;

interface IStudyInviteModal extends IModal {
  place: IPlace;
}

function StudyInviteModal({ setIsModal, place }: IStudyInviteModal) {
  const { data: session } = useSession();

  const router = useRouter();
  const random_num = Math.floor(Math.random() * 3);
  const url = WEB_URL + router?.asPath + "/" + session?.uid;

  const location = STUDY_SPACE_INFO?.find(
    (info) => info?.id === place?._id
  )?.location;

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.Kakao &&
      !window.Kakao.isInitialized()
    ) {
      window.Kakao.init(kakaoAppKey);
    }
  }, []);
  useEffect(() => {
    if (window.Kakao) {
      const options = {
        container: "#kakao-share-button-invite",
        objectType: "location",
        content: {
          title: "같이 스터디 할래?",
          description: place?.fullname,
          imageUrl: SQUARE_RANDOM_IMAGE[random_num],
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
        address: location,
        // addressTitle: "카카오 본사",
        buttons: [
          {
            title: "웹으로 이동",
            link: {
              mobileWebUrl: url,
              webUrl: url,
            },
          },
        ],
      };

      window.Kakao.Link.createDefaultButton(options);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ModalLayout size="md">
      <ModalHeaderX title="친구 초대" setIsModal={setIsModal} />
      <ModalMain>
        <MainText>
          친구 초대를 통해 스터디에 참여하면 초대한 인원과 참여한 인원 모두
          +2점을 받아요!
        </MainText>

        <SubText>※ 어느정도 친한 인원에게만 사용해주세요</SubText>
      </ModalMain>
      <Footer>
        <Button width="50%" onClick={() => setIsModal(false)}>
          취소
        </Button>

        <Button
          width="50%"
          colorScheme="mintTheme"
          id="kakao-share-button-invite"
        >
          친구초대
        </Button>
      </Footer>
    </ModalLayout>
  );
}

const MainText = styled.span`
  color: var(--font-h1);
  font-weight: 600;
`;

const SubText = styled.span`
  margin-top: var(--margin-sub);
  font-size: 12px;
`;

const Footer = styled.footer``;

export default StudyInviteModal;
