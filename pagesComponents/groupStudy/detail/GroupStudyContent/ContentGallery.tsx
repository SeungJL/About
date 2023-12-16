import { Button } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useState } from "react";
import styled from "styled-components";
import { dayjsToFormat } from "../../../../helpers/dateHelpers";
import AttendCheckModal from "../../../../modals/groupStudy/AttendCheckModal";
import { IUser } from "../../../../types/user/user";

interface IContentAttend {
  members: IUser[];
}

function ContentAttend({ members }: IContentAttend) {
  const [isModal, setIsModal] = useState(false);

  const topLineArr = ["이름", "월", "화", "수", "목", "금", "토", "일"];
  const temp = [1, 2, 3, 4, 5, 6, 7];

  return (
    <>
      <Layout>
        <Month>
          <div>
            {dayjsToFormat(dayjs().startOf("week").add(1, "day"), "M월 D일")} ~{" "}
            {dayjsToFormat(dayjs().endOf("week").add(1, "day"), "M월 D일")}
          </div>
          <Button
            onClick={() => setIsModal(true)}
            size="sm"
            colorScheme="mintTheme"
          >
            출석체크
          </Button>
        </Month>
        <Container>
          <TopLine>
            {topLineArr.map((text) => (
              <div key={text}>{text}</div>
            ))}
          </TopLine>
          <Main>
            {members.map((who) => (
              <MainLine key={who.uid}>
                <Name>{who.name}</Name>
                {temp.map((item) => (
                  <Item key={item}>{item}</Item>
                ))}
              </MainLine>
            ))}
          </Main>
        </Container>
      </Layout>
      {isModal && <AttendCheckModal setIsModal={setIsModal} />}
    </>
  );
}

const Layout = styled.div``;

const Month = styled.div`
  padding: var(--padding-sub) var(--padding-main);

  display: flex;
  align-items: center;
  justify-content: space-between;
  > div:first-child {
    margin-top: var(--margin-min);
    font-size: 14px;
    font-weight: 600;
    color: var(--font-h2);
  }
`;

const AttendBtn = styled.button``;

const ColorView = styled.div``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopLine = styled.div`
  display: flex;
  background-color: var(--font-h8);
  border: var(--border-sub);
  font-size: 13px;
  color: var(--font-h3);
  > div {
    padding: var(--padding-min) 0;
    flex: 1;
    text-align: center;
    border-left: var(--border-sub);
  }
  > div:first-child {
    flex: 1.5;
    border-left: none;
  }
`;

const Main = styled.main``;

const MainLine = styled.div`
  display: flex;
  border-bottom: var(--border-sub);
  > div {
    text-align: center;
    border-left: var(--border-sub);
    padding: var(--padding-min) 0;
  }
  > div:first-child {
    border-left: none;
  }
`;
const Item = styled.div`
  flex: 1;
`;
const Name = styled.div`
  flex: 1.5;
`;
const CheckGrid = styled.div``;

interface IContentAttend {}

export default ContentAttend;
