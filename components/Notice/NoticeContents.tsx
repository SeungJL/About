import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { noticeSelector } from "../../recoil/atoms";
import Accordion from "./Accordion";
import * as dayjs from "dayjs";

const TextContainer = styled.div`
  height: 80vh;
  padding: 10px;
  border: 2px solid RGB(113, 85, 63);
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: rgb(255, 255, 255, 0.9);
`;

function NoticeContents() {
  var dayjs = require("dayjs");
  var currentDay = dayjs().format("M/DD");
  const selectedContents = useRecoilValue(noticeSelector);
  return (
    <TextContainer>
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
    </TextContainer>
  );
}
export default NoticeContents;
