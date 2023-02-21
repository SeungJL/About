import { useRecoilValue } from "recoil";
import styled from "styled-components";

import Accordion from "./Accordion";
import * as dayjs from "dayjs";
import { noticeCategoryState, noticeSelector } from "../../recoil/noticeAtoms";

const TextContainer = styled.div`
  height: 80vh;
  padding: 10px;
  border: 2px solid RGB(113, 85, 63);
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: rgb(255, 255, 255, 0.9);
`;
const RuleBlock = styled.div`
  margin-bottom: 15px;
  border-bottom: 1px solid rgb(0, 0, 0, 0.5);
  > span {
    font-family: "NanumEx";
  }
  > p {
    padding: 10px 15px;
  }
`;

function NoticeContents() {
  var dayjs = require("dayjs");
  var currentDay = dayjs().format("M/DD");
  const noticeCategory = useRecoilValue(noticeCategoryState);
  const selectedContents = useRecoilValue(noticeSelector);
  return (
    <TextContainer>
      {noticeCategory === "rule" ? (
        <>
          <RuleBlock>
            <span>경고 기준</span>
            <p>
              <ol>
                <li>한 달에 2회 미만 참여</li>
                <li>언급없이 1시간 이상 지각</li>
                <li>당일 불참</li>
                <li>오프라인 모임 당일 파토</li>
              </ol>
            </p>
          </RuleBlock>{" "}
          <RuleBlock>
            <span>삭감 기준</span>
            <p>
              <ol>
                <li>한 달에 4회 이상 스터디 참여</li>
                <li>오프라인 모임 개최 or 정기모임 참여</li>
              </ol>
            </p>
          </RuleBlock>
          <RuleBlock>
            <span>벌금 및 휴식 관련</span>
            <p>
              <ul>
                <li>경고 3회 누적시 벌금 3000원 or 퇴출</li>
                <li>휴식 기간이 필요한 경우, 개인 연락</li>
              </ul>
            </p>
          </RuleBlock>
        </>
      ) : (
        <ul>
          {selectedContents.map((item: any) => (
            <div key={item.title}>
              <Accordion
                title={item.title}
                date={item.date}
                contents={item.text}
                category={item.category}
              ></Accordion>
            </div>
          ))}
        </ul>
      )}
    </TextContainer>
  );
}
export default NoticeContents;
