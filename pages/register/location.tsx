import styled from "styled-components";
import { useState } from "react";
import ProgressLayout from "../../components/layouts/ProgressLayout";
import Header from "../../components/layouts/Header";
import RegisterOverview from "../../pagesComponents/Register/RegisterOverview";
import RegisterLayout from "../../pagesComponents/Register/RegisterLayout";
import BottomNav from "../../components/layouts/BottomNav";
import { useRecoilState } from "recoil";
import { registerFormState } from "../../recoil/userAtoms";
import { useRouter } from "next/router";
import { Location } from "../../types/system";
import { motion } from "framer-motion";
import { useUserInfoQuery } from "../../hooks/user/queries";
import LocationTitle from "../../pagesComponents/Register/location/LocationTitle";
import { StudyLocation } from "../../storage/study";
import LocationMember from "../../pagesComponents/Register/location/LocationMember";
import { MainLoading } from "../../components/ui/Loading";

function Location() {
  const router = useRouter();

  const [registerForm, setRegisterForm] = useRecoilState(registerFormState);
  const [errorMessage, setErrorMessage] = useState("");
  const [location, setLocation] = useState<Location>(registerForm?.location);

  //유저 데이터가 있는 경우에만 초기 세팅
  const { isLoading } = useUserInfoQuery({
    onSuccess(data) {
      setRegisterForm(data);
      setLocation(data?.location);
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
    <>
      {isLoading ? (
        <MainLoading />
      ) : (
        <Layout initial={{ x: 200 }} animate={{ x: 0 }}>
          <ProgressLayout value={10} />
          <Header title="회원가입" url="/login" />
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
                  disabled={space === "강남"}
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
