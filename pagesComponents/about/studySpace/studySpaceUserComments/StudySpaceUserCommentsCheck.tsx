import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

interface IStudySpaceUserCommentsCheck {
  arrived: Date;
  isAbsent: boolean;
}

function StudySpaceUserCommentsCheck({
  arrived,
  isAbsent,
}: IStudySpaceUserCommentsCheck) {
  const arrivedTime = arrived
    ? new Date(arrived)
    : new Date(2023, 1, 1, 21, 0, 0);
  arrivedTime.setHours(arrivedTime.getHours() - 9);
  const arrivedHM = arrivedTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return (
    <Layout>
      {arrived ? (
        <Check isCheck={true}>
          <FontAwesomeIcon icon={faCircleCheck} size="xl" />
          <span>{arrivedHM}</span>
        </Check>
      ) : isAbsent ? (
        <Check isCheck={false}>
          <FontAwesomeIcon icon={faCircleXmark} size="xl" />
          <span>불참</span>
        </Check>
      ) : null}
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  align-items: center;
`;

const Check = styled.div<{ isCheck: boolean }>`
  margin-top: var(--margin-min);
  margin-left: auto;
  width: 40px;
  display: flex;
  justify-content: end;
  flex-direction: column;
  align-items: center;
  color: ${(props) =>
    props.isCheck ? "var(--color-mint)" : "var(--color-red)"};
  > span {
    display: inline-block;
    margin-top: var(--margin-min);
    font-size: 11px;
    color: var(--font-h4);
  }
`;

export default StudySpaceUserCommentsCheck;
