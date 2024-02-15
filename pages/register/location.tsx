import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { MainLoading } from "../../components/common/loaders/MainLoading";
import BottomNav from "../../components/layout/BottomNav";
import Header from "../../components/layout/Header";
import PageSlide from "../../components/layout/PageSlide";
import ProgressStatus from "../../components/templates/ProgressStatus";
import { REGISTER_INFO } from "../../constants/keys/localStorage";
import {
  LOCATION_ALL,
  LOCATION_NOT_OPEN,
  LOCATION_RECRUITING,
} from "../../constants/location";
import { setLocalStorageObj } from "../../helpers/storageHelpers";
import { useUserInfoQuery } from "../../hooks/user/queries";
import LocationBlockProfileEdit from "../../pageTemplates/register/location/LocationBlockProfileEdit";
import LocationMember from "../../pageTemplates/register/location/LocationMember";
import LocationTitle from "../../pageTemplates/register/location/LocationTitle";
import RegisterLayout from "../../pageTemplates/register/RegisterLayout";
import RegisterOverview from "../../pageTemplates/register/RegisterOverview";
import { isProfileEditState } from "../../recoil/previousAtoms";
import { Location } from "../../types/system";
import { IUserRegisterFormWriting } from "../../types/user/user";

function RegisterLocation() {
  const router = useRouter();

  const info: IUserRegisterFormWriting = JSON.parse(
    localStorage.getItem(REGISTER_INFO)
  );

  const isProfileEdit = useRecoilValue(isProfileEditState);
  const [errorMessage, setErrorMessage] = useState("");
  const [location, setLocation] = useState<Location>(info?.location);
  const [isLoading, setIsLoading] = useState(true);

  //회원 정보 수정일 경우
  const { data: userInfo } = useUserInfoQuery({
    enabled: isProfileEdit,
    onError(err) {
      console.error(err);
      setIsLoading(false);
    },
  });

  useEffect(() => {
    if (!isProfileEdit) setIsLoading(false);
    if (userInfo) {
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
      } = userInfo;
      setLocalStorageObj(REGISTER_INFO, {
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

      setLocation(userInfo.location);
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isProfileEdit, userInfo]);

  const onClickNext = () => {
    if (location === null) {
      setErrorMessage("지역을 선택해 주세요.");
      return;
    }
    setLocalStorageObj(REGISTER_INFO, { ...info, location });
    router.push(`/register/name`);
  };

  return (
    <>
      {isLoading ? (
        <MainLoading />
      ) : (
        <PageSlide>
          <ProgressStatus value={10} />
          <Header
            title={!isProfileEdit ? "회원가입" : "프로필 수정"}
            url={isProfileEdit ? "/user/profile" : "/login"}
          />
          <RegisterLayout errorMessage={errorMessage}>
            <RegisterOverview>
              <span>지역을 선택해 주세요</span>
              {isProfileEdit ? (
                <span>오픈 또는 예약중인 지역만 선택할 수 있습니다.</span>
              ) : (
                <span>
                  이후 다른 지역으로의 변경은 운영진에게 문의해주세요!
                </span>
              )}
            </RegisterOverview>
            <ButtonNav>
              {LOCATION_ALL?.map((place, idx) => (
                <Button
                  $picked={(location === place).toString()}
                  onClick={() => setLocation(place)}
                  key={place}
                  disabled={isProfileEdit || LOCATION_NOT_OPEN.includes(place)}
                >
                  {!isProfileEdit ? (
                    <>
                      <LocationTitle location={place} />
                      {!LOCATION_NOT_OPEN.includes(place) && (
                        <LocationMember location={place} />
                      )}
                      {LOCATION_RECRUITING.includes(place) &&
                        (idx === LOCATION_ALL.length - 1 ||
                          idx === LOCATION_ALL.length - 2) && (
                          <Message>예약 인원 40명이 되면 열려요!</Message>
                        )}
                    </>
                  ) : (
                    <LocationBlockProfileEdit location={place} />
                  )}
                </Button>
              ))}
            </ButtonNav>
          </RegisterLayout>
          <BottomNav onClick={() => onClickNext()} />
        </PageSlide>
      )}
    </>
  );
}

const ButtonNav = styled.nav`
  margin-top: var(--gap-5);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--gap-3);
`;

const Button = styled.button<{ $picked: string }>`
  padding: var(--gap-2) var(--gap-3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: 68px;
  border-radius: var(--rounded-lg);
  border: ${(props) =>
    props.$picked === "true" ? "1.5px solid var(--gray-1)" : "var(--border)"};
`;

const Message = styled.div`
  position: absolute;
  width: 100%;
  bottom: -20px;
  font-size: 10px;
  left: 50%;
  color: var(--gray-3);
  transform: translate(-50%, 0);
`;

export default RegisterLocation;
