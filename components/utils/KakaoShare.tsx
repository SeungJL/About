import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect } from "react";
import styled from "styled-components";

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
const kakaoAppKey = "05926725a12017416a7d5059eb8e3af4";
console.log(kakaoAppKey);

function KakaoShareBtn() {
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
        container: "#kakao-share-button",
        objectType: "feed",
        content: {
          title: "카카오톡 공유하기",
          description: "카카오톡 공유 기능의 테스트입니다.",
          imageUrl:
            "https://user-images.githubusercontent.com/84257439/235453825-026ca653-d356-485a-a916-19c21352e10a.png",
          link: {
            mobileWebUrl: "https://developers.kakao.com",
            webUrl: "https://developers.kakao.com",
          },
        },
      };
      window.Kakao.Link.createDefaultButton(options);
    }
  }, []);

  return (
    <Layout id="kakao-share-button">
      <FontAwesomeIcon icon={faArrowUpFromBracket} />
    </Layout>
  );
}

const Layout = styled.div``;

export default KakaoShareBtn;
