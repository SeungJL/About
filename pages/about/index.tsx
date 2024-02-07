import { useRecoilValue } from "recoil";
import styled from "styled-components";

import AboutCalendar from "../../pagesComponents/about/main/aboutCalendar/AboutCalendar";
import AboutCategoryNav from "../../pagesComponents/about/main/AboutCategoryNav";
import AboutGather from "../../pagesComponents/about/main/aboutGather/AboutGather";
import AboutHeader from "../../pagesComponents/about/main/aboutHeader/AboutHeader";
import AboutMain from "../../pagesComponents/about/main/aboutMain/AboutMain";
import AboutReview from "../../pagesComponents/about/main/AboutReview";
import AboutStudyHeader from "../../pagesComponents/about/main/AboutStudyHeader";
import EventBanner from "../../pagesComponents/about/main/EventBanner";
import AboutWinRecord from "../../pagesComponents/about/main/WinRecord";
import Setting from "../../pagesComponents/about/Setting";
import { participationsState, voteDateState } from "../../recoil/studyAtoms";

function About() {
  const voteDate = useRecoilValue(voteDateState);
  const participations = useRecoilValue(participationsState);

  var inappdeny_exec_vanillajs = (callback) => {
    if (document.readyState !== "loading") {
      callback();
    } else {
      document.addEventListener("DOMContentLoaded", callback);
    }
  };
  inappdeny_exec_vanillajs(() => {
    /* Do things after DOM has fully loaded */
    function copytoclipboard(val) {
      var t = document.createElement("textarea");
      document.body.appendChild(t);
      t.value = val;
      t.select();
      document.execCommand("copy");
      document.body.removeChild(t);
    }
    function inappbrowserout() {
      copytoclipboard(window.location.href);
      alert(
        'URL주소가 복사되었습니다.\n\nSafari가 열리면 주소창을 길게 터치한 뒤, "붙여놓기 및 이동"를 누르면 정상적으로 이용하실 수 있습니다.'
      );
      location.href = "x-web-search://?";
    }

    var useragt = navigator.userAgent.toLowerCase();
    var target_url = location.href;

    if (useragt.match(/kakaotalk/i)) {
      //카카오톡 외부브라우저로 호출
      location.href =
        "kakaotalk://web/openExternal?url=" + encodeURIComponent(target_url);
    } else if (useragt.match(/line/i)) {
      //라인 외부브라우저로 호출
      if (target_url.indexOf("?") !== -1) {
        location.href = target_url + "&openExternalBrowser=1";
      } else {
        location.href = target_url + "?openExternalBrowser=1";
      }
    } else if (
      useragt.match(
        /inapp|naver|snapchat|wirtschaftswoche|thunderbird|instagram|everytimeapp|whatsApp|electron|wadiz|aliapp|zumapp|iphone(.*)whale|android(.*)whale|kakaostory|band|twitter|DaumApps|DaumDevice\/mobile|FB_IAB|FB4A|FBAN|FBIOS|FBSS|trill|SamsungBrowser\/[^1]/i
      )
    ) {
      //그외 다른 인앱들
      if (useragt.match(/iphone|ipad|ipod/i)) {
        //아이폰은 강제로 사파리를 실행할 수 없다 ㅠㅠ
        //모바일대응뷰포트강제설정
        var mobile = document.createElement("meta");
        mobile.name = "viewport";
        mobile.content =
          "width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, minimal-ui";
        document.getElementsByTagName("head")[0].appendChild(mobile);
        //노토산스폰트강제설정
        var fonts = document.createElement("link");
        fonts.href =
          "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap";
        document.getElementsByTagName("head")[0].appendChild(fonts);
        document.body.innerHTML =
          "<style>body{margin:0;padding:0;font-family: 'Noto Sans KR', sans-serif;overflow: hidden;height: 100%;}</style><h2 style='padding-top:50px; text-align:center;font-family: 'Noto Sans KR', sans-serif;'>인앱브라우저 호환문제로 인해<br />Safari로 접속해야합니다.</h2><article style='text-align:center; font-size:17px; word-break:keep-all;color:#999;'>아래 버튼을 눌러 Safari를 실행해주세요<br />Safari가 열리면, 주소창을 길게 터치한 뒤,<br />'붙여놓기 및 이동'을 누르면<br />정상적으로 이용할 수 있습니다.<br /><br /><button onclick='inappbrowserout();' style='min-width:180px;margin-top:10px;height:54px;font-weight: 700;background-color:#31408E;color:#fff;border-radius: 4px;font-size:17px;border:0;'>Safari로 열기</button></article><img style='width:70%;margin:50px 15% 0 15%' src='https://tistory3.daumcdn.net/tistory/1893869/skin/images/inappbrowserout.jpeg' />";
      } else {
        //안드로이드는 Chrome이 설치되어있음으로 강제로 스킴실행한다.
        location.href =
          "intent://" +
          target_url.replace(/https?:\/\//i, "") +
          "#Intent;scheme=http;package=com.android.chrome;end";
      }
    }
  });

  return (
    <>
      <Setting />
      <Layout>
        <AboutHeader />
        <AboutCategoryNav />
        {voteDate && (
          <>
            <AboutStudyHeader />
            <AboutCalendar />
            <AboutMain participations={participations} />
            <EventBanner />
            <AboutGather />
            <AboutReview />
            <AboutWinRecord />
          </>
        )}
      </Layout>
    </>
  );
}

const Layout = styled.div`
  min-height: 100vh;
  padding-bottom: 40px;
  background-color: var(--font-h8);
`;

export default About;
