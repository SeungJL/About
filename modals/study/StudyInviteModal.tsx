import { Button, ModalFooter } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { IFooterOptions, ModalLayout } from "../../components/modals/Modals";
import { SQUARE_RANDOM_IMAGE } from "../../constants/image/imageUrl";
import { WEB_URL } from "../../constants/system";
import { ModalSubtitle } from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";
import { IPlace } from "../../types/study/studyDetail";
const kakaoAppKey = process.env.NEXT_PUBLIC_KAKAO_JS;

interface IStudyInviteModal extends IModal {
  place: IPlace;
}

function StudyInviteModal({ setIsModal, place }: IStudyInviteModal) {
  const { data: session } = useSession();

  const router = useRouter();
  const random_num = Math.floor(Math.random() * 3);
  const url = WEB_URL + router?.asPath + "/" + session?.user?.uid;

  const [isRenderingCheck, setIsRenderingCheck] = useState(false);

  const location = place.locationDetail;

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.Kakao &&
      !window.Kakao.isInitialized()
    ) {
      window.Kakao.init(kakaoAppKey);
    }
    setIsRenderingCheck(true);
  }, []);

  useEffect(() => {
    if (!isRenderingCheck) return;
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
  }, [isRenderingCheck, location, place?.fullname, random_num, url]);

  const footerOptions: IFooterOptions = {
    children: (
      <ModalFooter p="20px" display="flex" justifyContent="space-between">
        <ButtonLayout>
          <Button
            bg="white"
            h="100%"
            border="1.2px solid var(--color-mint)"
            color="var(--color-mint)"
            fontSize="16px"
            onClick={() => setIsModal(false)}
          >
            닫기
          </Button>
          <Button
            bg="var(--color-mint)"
            h="100%"
            color="white"
            fontSize="16px"
            disabled={false}
            id="kakao-share-button-invite"
          >
            친구초대
          </Button>
        </ButtonLayout>
      </ModalFooter>
    ),
  };

  return (
    <ModalLayout
      footerOptions={footerOptions}
      setIsModal={setIsModal}
      title="친구 초대"
    >
      <ModalSubtitle>
        친구 초대를 통해 참여하면 초대한 인원과 참여한 인원 모두 2 point를
        받아요!
      </ModalSubtitle>
    </ModalLayout>
  );
}

const Layout = styled.div`
  width: 100%;
  display: flex;
  height: 46px;
  > button:first-child {
    margin-right: var(--gap-3);
  }
  > button {
    flex: 1;
  }
`;

const ButtonLayout = styled.div`
  width: 100%;
  display: flex;
  height: 46px;
  > button:first-child {
    margin-right: var(--gap-3);
  }
  > button {
    flex: 1;
  }
  > button:last-child {
    :hover {
      background-color: var(--color-mint);
    }
  }
`;

export default StudyInviteModal;
