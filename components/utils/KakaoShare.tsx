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
const kakaoAppKey = process.env.NEXT_PUBLIC_KAKAO_JS;
console.log(kakaoAppKey);

function KakaoShareBtn() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.Kakao &&
      !window.Kakao.isInitialized()
    ) {
      window.Kakao.init(kakaoAppKey);
      console.log(34, window.Kakao.Link);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kakaoAppKey]);

  useEffect(() => {
    if (window.Kakao) {
      const options = {
        container: "#kakao-share-button", // 카카오 버튼을 담을 컨테이너의 ID
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
        itemContent: {
          profileText: "Kakao",
          profileImageUrl:
            "https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png",
          titleImageUrl:
            "https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png",
          titleImageText: "Cheese cake",
          titleImageCategory: "Cake",
          items: [
            {
              item: "Cake1",
              itemOp: "1000원",
            },
            {
              item: "Cake2",
              itemOp: "2000원",
            },
            {
              item: "Cake3",
              itemOp: "3000원",
            },
            {
              item: "Cake4",
              itemOp: "4000원",
            },
            {
              item: "Cake5",
              itemOp: "5000원",
            },
          ],
          sum: "Total",
          sumOp: "15000원",
        },
        social: {
          likeCount: 10,
          commentCount: 20,
          sharedCount: 30,
        },
      };
      window.Kakao.Link.createDefaultButton(options);
    }
  }, []);

  return <Layout id="kakao-share-button">23</Layout>;
}

const Layout = styled.div``;

export default KakaoShareBtn;
