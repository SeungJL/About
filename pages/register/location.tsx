import styled from "styled-components";
import { ChangeEvent, useEffect, useState } from "react";
import ProgressLayout from "../../components/layouts/ProgressLayout";
import Header from "../../components/layouts/Header";
import RegisterOverview from "../../pagesComponents/Register/RegisterOverview";
import RegisterLayout from "../../pagesComponents/Register/RegisterLayout";
import BottomNav from "../../components/layouts/BottomNav";
import { useRecoilState, useSetRecoilState } from "recoil";
import { registerFormState } from "../../recoil/userAtoms";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Location } from "../../types/system";
import { motion } from "framer-motion";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Badge,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretUp,
  faUserClock,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { StudyLocation } from "../../constants/study";
import { useAdminUsersControlQuery } from "../../hooks/admin/quries";
import { useUserInfoQuery } from "../../hooks/user/queries";

function Location() {
  const router = useRouter();
  const [registerForm, setRegisterForm] = useRecoilState(registerFormState);

  const [errorMessage, setErrorMessage] = useState("");
  const [location, setLocation] = useState<Location>(registerForm?.location);
  useUserInfoQuery({
    onSuccess(data) {
      console.log(data);
      // setRegisterForm(data);
      // setLocation(data?.location);
    },
  });
  const onClickNext = () => {
    if (location === null) {
      setErrorMessage("지역을 선택해 주세요.");
      return;
    }
    setRegisterForm((old) => ({ ...old, location }));
    router.push(`/register/name`);
  };

  return (
    <Layout initial={{ x: 200 }} animate={{ x: 0 }}>
      <ProgressLayout value={10} />
      <Header title="회원가입" url="/login" />
      <RegisterLayout errorMessage={errorMessage}>
        <RegisterOverview>
          <span>지역을 선택해 주세요</span>
          <span>스터디에 참여 할 지역으로 선택해 주세요.</span>
        </RegisterOverview>
        <ButtonNav>
          {StudyLocation?.map((space) => (
            <Button
              isSelected={location === space}
              onClick={() => setLocation(space)}
              key={space}
            >
              <TitleWrapper>
                {space !== "안양" ? (
                  <Badge
                    colorScheme="teal"
                    variant="outline"
                    fontSize="10px"
                    mb="4px"
                  >
                    오픈
                  </Badge>
                ) : (
                  <Badge
                    colorScheme="yellow"
                    variant="outline"
                    fontSize="10px"
                    mb="4px"
                  >
                    준비중
                  </Badge>
                )}
                <Title>{space}</Title>
              </TitleWrapper>
              {space !== "안양" ? (
                <Member>
                  <MemberCnt>
                    <FontAwesomeIcon icon={faUsers} size="xs" />
                    <span>{space === "수원" ? "160" : "60"}</span>
                  </MemberCnt>
                  <NewMember>
                    <FontAwesomeIcon icon={faCaretUp} />
                    <span>24</span>
                  </NewMember>
                </Member>
              ) : (
                <Member>
                  <MemberCnt>
                    <FontAwesomeIcon icon={faUserClock} size="xs" />
                    <span>24</span>
                  </MemberCnt>{" "}
                </Member>
              )}
            </Button>
          ))}
        </ButtonNav>
      </RegisterLayout>
      <BottomNav onClick={() => onClickNext()} />
    </Layout>
  );
}

const Layout = styled(motion.div)`
  height: 100vh;
`;

const ButtonNav = styled.nav`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
`;

const Button = styled.button<{ isSelected: boolean }>`
  padding: 8px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: var(--border-radius);

  border: ${(props) =>
    props.isSelected
      ? "1.5px solid var(--font-h1)"
      : "1.5px solid var(--font-h5)"};
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Active = styled.span`
  color: var(--font-h3);
  font-size: 11px;
`;

const OpenDate = styled.div`
  color: var(--font-h3);
  font-size: 11px;
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 600;
`;

const MemberWaiting = styled.span`
  font-size: 11px;
  font-weight: 400;
  text-align: end;

  > span:last-child {
    margin-left: 6px;
  }
`;

const Member = styled.div`
  color: var(--font-h2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const MemberCnt = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 15px;

  > span:last-child {
    margin-left: 4px;
  }
`;

const NewMember = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 13px;
  color: green;
  > span:last-child {
    margin-left: 6px;
  }
`;

export default Location;
