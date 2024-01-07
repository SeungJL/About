import dayjs from "dayjs";
import styled, { createGlobalStyle } from "styled-components";
import { useAdminStudyRecordQuery } from "../hooks/admin/quries";

import { useState } from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import { COLOR_SCHEME_BG } from "../constants/styles";
function Test() {
  const { data } = useAdminStudyRecordQuery(
    dayjs("2023-11-01"),
    dayjs("2024-01-07"),
    null,
    "안양"
  );

  const { data: data2 } = useAdminStudyRecordQuery(
    dayjs("2023-12-04"),
    dayjs("2023-12-10"),
    null,
    "안양"
  );

  const [{ run, steps }, setState] = useState<{
    run: boolean;
    steps?: Step[];
  }>({
    run: false,
    steps: [
      {
        content: <h2>Let begin our journey!</h2>,
        title: <>제목</>,
        locale: { skip: "Skip" },
        placement: "center",
        target: "body",
      },
      {
        content: <h2>Sticky elements</h2>,
        floaterProps: {
          disableAnimation: true,
        },
        spotlightPadding: 20,
        target: ".main_vote_btn",
      },
      {
        content: "These are our super awesome projects!",
        placement: "bottom",
        styles: {
          options: {
            width: 300,
          },
        },
        target: ".demo__projects h2",
        title: "Our projects",
      },
      {
        content: (
          <div>
            You can render anything!
            <br />
            <h3>Like this H3 title</h3>
          </div>
        ),
        placement: "top",
        target: ".demo__how-it-works h2",
        title: "Our Mission",
      },
    ],
  });
  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setState({ run: false });
    }
    // logGroup(type, data);
  };
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Joyride
          callback={handleJoyrideCallback}
          continuous
          steps={steps}
          run={true}
          showSkipButton
        />
        <div className="star-burst">첫 번째 스텝 타겟 요소</div>
        <div className="my-other-step">두 번째 스텝 타겟 요소</div>
      </Layout>
    </>
  );
}
const GlobalStyle = createGlobalStyle`
  background-color:black !important;
  .react-joyride__beacon {
    >span:first-child{
      background-color:var(--color-mint) !important;

    }
    >span:last-child{
    border-color:var(--color-mint) !important;
 background-color:${COLOR_SCHEME_BG["var(--color-mint)"]} !important;
      
    }
    // 기타 스타일 변경사항...
  }
`;

const Layout = styled.div`
  margin-top: 200px;
  margin-left: 50px;
  display: flex;
`;

export default Test;
