import { Box, Button, Collapse, useDisclosure } from "@chakra-ui/react";
import { faX } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { IStoreApplicant } from "../../../types/page/store";
import { DispatchBoolean } from "../../../types/reactTypes";

interface IStoreDetailNav {
  applyUsers: IStoreApplicant[];
  isCompleted: boolean;
  setIsWinModal: DispatchBoolean;
  setIsApplyModal: DispatchBoolean;
}

function StoreDetailNav({
  applyUsers,
  isCompleted,
  setIsWinModal,
  setIsApplyModal,
}: IStoreDetailNav) {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Layout>
      <ButtonNav>
        <Button bg="var(--font-h7)" size="lg" width="50%" onClick={onToggle}>
          참여현황
        </Button>
        {isCompleted ? (
          <Button size="lg" width="50%" onClick={() => setIsWinModal(true)}>
            당첨자 확인
          </Button>
        ) : (
          <Button size="lg" width="50%" onClick={() => setIsApplyModal(true)}>
            응모하기
          </Button>
        )}
      </ButtonNav>
      <Collapse in={isOpen} animateOpacity>
        <Box
          fontSize="12px"
          p="var(--padding-md)"
          bg="var(--font-h7)"
          color="var(--font-h2)"
        >
          {applyUsers?.length === 0 ? (
            "참여 인원 없음"
          ) : (
            <Applicant>
              {applyUsers.map((who, idx) => (
                <ApplicantBlock key={idx}>
                  <span>{who.name}</span>
                  <div>
                    <FontAwesomeIcon icon={faX} size="2xs" />
                  </div>
                  <span>{who.cnt} 회</span>
                </ApplicantBlock>
              ))}
            </Applicant>
          )}
        </Box>
      </Collapse>
    </Layout>
  );
}

const Layout = styled.div`
  margin-top: var(--margin-max);
  display: flex;
  flex-direction: column;
`;

const ButtonNav = styled.div`
  margin: var(--margin-sub) 0;
  display: flex;
  > button:first-child {
    color: var(--color-mint);
    margin-right: var(--margin-md);
  }
  > button:last-child {
    background-color: var(--color-mint);
    color: white;
  }
`;

const Applicant = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const ApplicantBlock = styled.div`
  display: flex;
  align-items: center;
  > div {
    margin: 0 var(--margin-min);
  }
`;

export default StoreDetailNav;
