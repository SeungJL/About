import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect } from "react";
import styled from "styled-components";
import { SQUARE_RANDOM_IMAGE } from "../../storage/SquareRandomImage";

interface Kakao {
  init: (key: string) => void;
  isInitialized: () => boolean;
  Link: {
    sendDefault: (params: object) => void;
    createDefaultButton: (options: object) => void; // createDefaultButton 인터페이스 추가
  };
}

interface Window {
  Kakao: Kakao;
}
const kakaoAppKey = process.env.NEXT_PUBLIC_KAKAO_JS;

function KakaoShareBtn({
  type,
  title,
  subtitle,
  img,
  location,
  url,
}: {
  type: string;
  title: string;
  subtitle: string;
  img?: string;
  location?: string;
  url: string;
}) {
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
              objectType: "location",
              content: {
                title,
                description: subtitle,
                imageUrl:
                  "https://user-images.githubusercontent.com/84257439/235453825-026ca653-d356-485a-a916-19c21352e10a.png",
                link: {
                  mobileWebUrl: "https://developers.kakao.com",
                  webUrl: "https://developers.kakao.com",
                },
              },
              address: "경기 수원시 영통구 아주로 46",
              addressTitle: "카카오 본사",
              buttons: [
                {
                  title: "웹으로 이동",
                  link: {
                    mobileWebUrl: "https://developers.kakao.com",
                    webUrl: "https://developers.kakao.com",
                  },
                },
                {
                  title: "앱으로 이동",
                  link: {
                    mobileWebUrl: "https://developers.kakao.com",
                    webUrl: "https://developers.kakao.com",
                  },
                },
              ],
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
          : null;
      window.Kakao.Link.createDefaultButton(options);
    }
  }, []);

  return (
    <Layout id="kakao-share-button">
      <FontAwesomeIcon icon={faArrowUpFromBracket} size="lg" />
    </Layout>
  );
}

const Layout = styled.div``;

export default KakaoShareBtn;
