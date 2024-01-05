import { Button } from "@chakra-ui/react";
import { faShareNodes } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import styled from "styled-components";
import { SQUARE_RANDOM_IMAGE } from "../../../constants/image/imageUrl";
import { REVIEW_DATA } from "../../../storage/Review";

const kakaoAppKey = process.env.NEXT_PUBLIC_KAKAO_JS;

interface IKakaoShareBtn {
  type?: string;
  title: string;
  subtitle: string;
  img?: string;
  location?: string;
  url: string;
  isBig?: boolean;
}

function KakaoShareBtn({
  type,
  title,
  subtitle,
  img,
  location,
  url,
  isBig,
}: IKakaoShareBtn) {
  const random_num = Math.floor(Math.random() * 3);

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
    if (type === "gather" && !img) return;
    if (window.Kakao) {
      const options =
        type === "gather"
          ? {
              container: "#kakao-share-button",
              objectType: "feed",
              content: {
                title,
                description: subtitle,
                imageUrl:
                  "https://studyabout.s3.ap-northeast-2.amazonaws.com/%EB%AA%A8%EC%9E%84+%EA%B3%B5%EC%9C%A0+%EC%9D%B4%EB%AF%B8%EC%A7%80/temp/%EB%AF%B8%EC%88%A0%EA%B4%80.png",
                imageWidth: 800,
                imageHeight: 400,
                link: {
                  mobileWebUrl: url,
                  webUrl: url,
                },
              },
            }
          : type === "study"
          ? {
              container: "#kakao-share-button",
              objectType: "location",
              content: {
                title,
                description: subtitle,
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
            }
          : {
              container: "#kakao-share-button",
              objectType: "feed",
              content: {
                title,
                description: subtitle,
                imageUrl: REVIEW_DATA[0]?.images[0],
                link: {
                  mobileWebUrl: url,
                  webUrl: url,
                },
              },
            };

      window.Kakao.Link.createDefaultButton(options);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [img]);

  return (
    <Layout id="kakao-share-button">
      {!isBig ? (
        <FontAwesomeIcon icon={faShareNodes} size="lg" />
      ) : (
        <Button as="div" colorScheme="mintTheme" width="100%" size="lg">
          공유하기
        </Button>
      )}
    </Layout>
  );
}

const Layout = styled.button`
  width: 100%;
`;

export default KakaoShareBtn;
