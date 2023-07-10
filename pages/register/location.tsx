import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { MainLoading } from "../../components/common/MainLoading";
import BottomNav from "../../components/layouts/BottomNav";
import Header from "../../components/layouts/Header";
import ProgressStatus from "../../components/layouts/ProgressStatus";
import { useUserInfoQuery } from "../../hooks/user/queries";
import LocationBlockProfileEdit from "../../pagesComponents/register/location/LocationBlockProfileEdit";
import LocationMember from "../../pagesComponents/register/location/LocationMember";
import LocationTitle from "../../pagesComponents/register/location/LocationTitle";
import RegisterLayout from "../../pagesComponents/register/RegisterLayout";
import RegisterOverview from "../../pagesComponents/register/RegisterOverview";
import { isProfileEditState } from "../../recoil/previousAtoms";
import { sharedRegisterFormState } from "../../recoil/sharedDataAtoms";

import { StudyLocation } from "../../storage/study";
import { Location } from "../../types/system";

function Location() {
  const router = useRouter();
  const [registerForm, setRegisterForm] = useRecoilState(
    sharedRegisterFormState
  );
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
          <Header
            title={!isProfileEdit ? "회원가입" : "프로필 수정"}
            url={isProfileEdit ? "/about" : "/login"}
          />
          <RegisterLayout errorMessage={errorMessage}>
            <RegisterOverview>
              <span>지역을 선택해 주세요</span>
              {isProfileEdit ? (
                <span>오픈 또는 예약중인 지역만 선택할 수 있습니다.</span>
              ) : (
                <span>다른 지역으로의 변경은 운영진에게 문의해주세요!</span>
              )}
            </RegisterOverview>
            <ButtonNav>
              {StudyLocation?.map((space) => (
                <Button
                  isSelected={location === space}
                  onClick={() => setLocation(space)}
                  key={space}
                  disabled={isProfileEdit}
                >
                  {!isProfileEdit ? (
                    <>
                      <LocationTitle location={space} />
                      <LocationMember location={space} />
                      {space === "강남" && (
                        <Message>예약 인원 30명이 되면 열려요!</Message>
                      )}
                    </>
                  ) : (
                    <LocationBlockProfileEdit location={space} />
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
  height: 64px;
  border-radius: var(--border-radius-sub);
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
