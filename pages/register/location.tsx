import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import BottomNav from "../../components/layouts/BottomNav";
import Header from "../../components/layouts/Header";
import ProgressStatus from "../../components/layouts/ProgressStatus";
import { MainLoading } from "../../components/ui/MainLoading";
import { useUserInfoQuery } from "../../hooks/user/queries";
import LocationMember from "../../pagesComponents/Register/location/LocationMember";
import LocationTitle from "../../pagesComponents/Register/location/LocationTitle";
import RegisterLayout from "../../pagesComponents/Register/RegisterLayout";
import RegisterOverview from "../../pagesComponents/Register/RegisterOverview";
import { isProfileEditState } from "../../recoil/interactionAtoms";
import { registerFormState } from "../../recoil/userAtoms";
import { StudyLocation } from "../../storage/study";
import { Location } from "../../types/system";

function Location() {
  const router = useRouter();

  const [registerForm, setRegisterForm] = useRecoilState(registerFormState);
  const [errorMessage, setErrorMessage] = useState("");
  const [location, setLocation] = useState<Location>(registerForm?.location);
  const [isProfileEdit, setIsProfileEdit] = useRecoilState(isProfileEditState);
  const [isLoading, setIsLoading] = useState(true);

  useUserInfoQuery({
    enabled: isProfileEdit,
    onSuccess(data) {
      const {
        location,
        name,
        mbti,
        birth,
        gender,
        interests,
        majors,
        comment,
        telephone,
      } = data;

      setRegisterForm({
        location,
        name,
        mbti,
        birth,
        gender,
        interests,
        majors,
        comment,
        telephone,
      });

      setLocation(data?.location);
      setIsLoading(false);
    },
    onError(err) {
      console.error(err);
      setIsLoading(false);
    },
  });

  useEffect(() => {
    if (!isProfileEdit) setIsLoading(false);
  }, [isProfileEdit]);

  const onClickNext = () => {
    if (location === null) {
      setErrorMessage("지역을 선택해 주세요.");
      return;
    }

    setRegisterForm((old) => ({ ...old, location }));
    router.push(`/register/name`);
  };

  return (
    <>
      {isLoading ? (
        <MainLoading />
      ) : (
        <Layout initial={{ x: 200 }} animate={{ x: 0 }}>
          <ProgressStatus value={10} />
          <Header title="회원가입" url={isProfileEdit ? "/about" : "/login"} />
          <RegisterLayout errorMessage={errorMessage}>
            <RegisterOverview>
              <span>지역을 선택해 주세요</span>
              <span>오픈 또는 예약중인 지역만 선택할 수 있습니다.</span>
            </RegisterOverview>
            <ButtonNav>
              {StudyLocation?.map((space) => (
                <Button
                  isSelected={location === space}
                  onClick={() => setLocation(space)}
                  key={space}
                >
                  <LocationTitle location={space} />
                  <LocationMember location={space} />
                  {space === "안양" && (
                    <Message>예약 인원 30명이 되면 열려요!</Message>
                  )}
                </Button>
              ))}
            </ButtonNav>
          </RegisterLayout>
          <BottomNav onClick={() => onClickNext()} />
        </Layout>
      )}
    </>
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
  position: relative;
  border-radius: var(--border-radius);
  border: ${(props) =>
    props.isSelected
      ? "1.5px solid var(--font-h1)"
      : "1.5px solid var(--font-h5)"};
`;

const Message = styled.div`
  position: absolute;
  width: 100%;
  bottom: -20px;
  font-size: 10px;
  left: 50%;
  color: var(--font-h3);
  transform: translate(-50%, 0);
`;

export default Location;
