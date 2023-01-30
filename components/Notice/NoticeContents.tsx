import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { noticeSelector } from "../../recoil/atoms";
import Accordion from "./Accordion";
import * as dayjs from "dayjs";

const TextContainer = styled.div`
  background-color: RGB(77, 65, 57, 1);
  height: 100%;
  padding: 10px;
`;
const TextContent = styled.div`
  margin-bottom: 8px;
  font-size: 17px;
`;

function NoticeContents() {
  var dayjs = require("dayjs");
  var currentDay = dayjs().format("M/DD");
  const selectedContents = useRecoilValue(noticeSelector);
  return (
    <TextContainer>
      <ul>
        {selectedContents.map((item: any) => (
          <li key={item.title}>
            <Accordion
              title={currentDay}
              contents={item.text}
              category={item.category}
            ></Accordion>
          </li>
        ))}
      </ul>
    </TextContainer>
  );
}
export default NoticeContents;
