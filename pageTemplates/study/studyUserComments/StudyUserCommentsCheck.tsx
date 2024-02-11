import { Badge } from "@chakra-ui/react";
import dayjs from "dayjs";
import styled from "styled-components";
import { dayjsToFormat } from "../../../../helpers/dateHelpers";

interface IstudyUserCommentsCheck {
  arrived: Date;
  isAbsent: string;
}

function studyUserCommentsCheck({
  arrived,
  isAbsent,
}: IstudyUserCommentsCheck) {
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
          <Badge
            color="var(--color-mint)"
            variant="outline"
            border="1.5px solid var(--color-mint)"
            borderRadius="var(--border-radius2)"
            boxShadow="none"
            fontSize="12px"
            textAlign="center"
            p="0 var(--padding-min)"
          >
            출석
          </Badge>
          <span>{arrivedHM}</span>
        </Check>
      ) : !!isAbsent ? (
        <Check isCheck={false}>
          <Badge
            color="var(--color-red)"
            variant="outline"
            border="1.5px solid var(--color-red)"
            borderRadius="var(--border-radius2)"
            boxShadow="none"
            fontSize="12px"
            textAlign="center"
            p="0 var(--padding-min)"
          >
            불참
          </Badge>
          <span>{dayjsToFormat(dayjs(isAbsent), "HH:mm")}</span>
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
  margin-top: var(--margin-sub);
  margin-left: auto;
  width: 40px;
  display: flex;
  justify-content: end;
  flex-direction: column;
  align-items: center;
  color: ${(props) =>
    props.isCheck ? "var(--color-mint)" : "var(--color-red)"};
  > span:last-child {
    display: inline-block;
    margin-top: 2px;
    font-size: 10px;
    color: var(--font-h4);
  }
`;

export default studyUserCommentsCheck;
