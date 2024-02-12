import styled from "styled-components";
import { STUDY_VOTE_HOUR_ARR } from "../../../../../constants2/serviceConstants/studyConstants/studyTimeConstant";
export default function TimeBoard() {
  return (
    <TimeBoardContainer>
      {STUDY_VOTE_HOUR_ARR.map((hour) => (
        <TimeBlock key={hour} hour={hour} />
      ))}
    </TimeBoardContainer>
  );
}

const TimeBlock = ({ hour }: { hour?: number }) => {
  return (
    <TimeBlockContainer>
      <HourText>{hour}</HourText>
      <Divider />
    </TimeBlockContainer>
  );
};

const TimeBoardContainer = styled.div`
  padding: 0 0.5rem; /* px-2 */
  position: absolute;
  width: 100%;
  height: 100%;
  padding-bottom: 1rem; /* pb-4 */
  display: flex;
  justify-content: around;
  color: #4a5568; /* text-gray-3, assuming a specific gray color */
`;

const TimeBlockContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

const HourText = styled.div`
  margin-bottom: 0.25rem; /* mb-1 */
`;

const Divider = styled.div`
  flex: 1;
  border-left: 1px solid #e2e8f0; /* border-l border-gray-200 */
`;
