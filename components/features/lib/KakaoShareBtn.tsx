import { Button } from "@chakra-ui/react";
import { faArrowUpFromBracket } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import styled from "styled-components";
import { useFailToast } from "../../../hooks/CustomToast";
import { REVIEW_DATA } from "../../../storage/Review";
import { SQUARE_RANDOM_IMAGE } from "../../../storage/SquareRandomImage";

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
  const failToast = useFailToast();
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
    if (window.Kakao) {
      const options =
        type === "gather"
          ? {
              container: "#kakao-share-button",
              objectType: "feed",
              content: {
                title,
                description: subtitle,
                imageUrl: img,
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
  }, []);

  return (
    <Layout id="kakao-share-button">
      {!isBig ? (
        <FontAwesomeIcon icon={faArrowUpFromBracket} size="lg" />
      ) : (
        <Button colorScheme="mintTheme" width="100%" >
          공유하기
        </Button>
      )}
    </Layout>
  );
}

const Layout = styled.div``;

export default KakaoShareBtn;
