import styled from "styled-components";
import { useVoteQuery } from "../../hooks/vote/queries";
import Header from "../../components/layouts/Header";
import { useState } from "react";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faDeleteLeft,
} from "@fortawesome/free-solid-svg-icons";
import { IUser } from "../../types/user";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
} from "@chakra-ui/react";

const LOCATION = ["SUWAN", "YANG"];

function StudyControl() {
  const [date, setDate] = useState(dayjs());
  const { data: SUWAN } = useVoteQuery(date, "수원");
  const { data: YANG } = useVoteQuery(date, "양천");
  console.log(SUWAN);
  return (
    <>
      <Header title="스터디 상태 관리" />
      <Layout>
        <Date>
          <FontAwesomeIcon
            icon={faChevronLeft}
            color="var(--font-h2)"
            onClick={() => setDate((old) => old.subtract(1, "day"))}
          />
          <span>{date.format("M월 DD일")}</span>
          <FontAwesomeIcon
            icon={faChevronRight}
            color="var(--font-h2)"
            onClick={() => setDate((old) => old.add(1, "day"))}
          />
        </Date>
        <Main>
          <Section>
            <SectionHeader>수원</SectionHeader>
            <Accordion defaultIndex={[0]} allowMultiple>
              {SUWAN?.participations.map((place) => (
                <AccordionItem key={place.place._id}>
                  <h2>
                    <AccordionButton
                      background="gray.200"
                      borderBottom="1px solid lightGray"
                    >
                      <Box as="span" flex="1" textAlign="left" fontWeight="600">
                        {place.place.brand} / {place.attendences.length}명 /
                        {place.status}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <SpaceItem>
                      <div>
                        <span style={{ fontSize: "15px" }}>
                          상태: {place.status}
                        </span>
                        <Button size="sm" ml="2">
                          변경
                        </Button>
                      </div>
                      <Participant>
                        {place?.attendences.map((who, idx) => (
                          <Att key={idx}>
                            <span> {(who.user as IUser).name}</span>
                            <Delete>
                              <FontAwesomeIcon icon={faDeleteLeft} />
                            </Delete>
                          </Att>
                        ))}
                      </Participant>
                    </SpaceItem>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Section>
        </Main>
      </Layout>
    </>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

const Date = styled.div`
  text-align: center;
  margin-top: 12px;
  > span {
    font-size: 18px;
    font-weight: 600;
    margin: 0 12px;
  }
`;

const Main = styled.main`
  padding: 14px;
`;

const Section = styled.section``;

const SectionHeader = styled.header`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const SpaceItem = styled.div``;

const Name = styled.div``;

const Participant = styled.div`
  display: flex;
  margin-top: 6px;
`;

const Att = styled.div`
  margin-right: 4px;
  display: flex;
  > span {
    margin-right: 2px;
  }
`;

const Delete = styled.div``;

export default StudyControl;
