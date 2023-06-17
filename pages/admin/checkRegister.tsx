import { Button } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/layouts/Header";
import ModalPortal from "../../components/ModalPortal";
import { useRegisterQuery, useUserInfoQuery } from "../../hooks/user/queries";
import CheckRegisterModal from "../../modals/admin/CheckRegisterModal";
import { IRegisterForm } from "../../types/user";
function CheckRegister() {
  const { data: session } = useSession();

  const temp = [1, 2, 3];
  const [isModal, setIsModal] = useState(false);
  const [applicant, setApplicant] = useState<IRegisterForm>();
  const { data } = useUserInfoQuery();
  const [isRefetch, setIsRefetch] = useState(false);
  const { data: applyData, refetch } = useRegisterQuery({});
  const [registerData, setRegisterData] = useState<IRegisterForm[]>([]);

  const [category, setCategory] = useState("수원");

  const onClick = (who?: IRegisterForm) => {
    setApplicant(who);
    setIsModal(true);
  };

  useEffect(() => {
    if (isRefetch) refetch();
    setIsRefetch(false);
  }, [isRefetch, refetch]);

  useEffect(() => {
    if (category === "준비") {
      setRegisterData(
        applyData?.filter(
          (who) => who?.location === "안양" || who?.location === "강남"
        )
      );
    } else
      setRegisterData(applyData?.filter((who) => who?.location === category));
  }, [applyData, category]);
  console.log(applyData);
  return (
    <>
      <Header title="가입 신청 확인" url="/admin" />
      <Layout>
        <LocationFilter>
          <Button
            colorScheme={category === "수원" ? "mintTheme" : null}
            onClick={() => setCategory("수원")}
          >
            수원
          </Button>
          <Button
            colorScheme={category === "양천" ? "mintTheme" : null}
            onClick={() => setCategory("양천")}
          >
            양천
          </Button>
          <Button
            colorScheme={category === "준비" ? "mintTheme" : null}
            onClick={() => setCategory("준비")}
          >
            준비지역
          </Button>
          <Button
            colorScheme={category === "보류" ? "mintTheme" : null}
            onClick={() => setCategory("보류")}
          >
            보류
          </Button>
        </LocationFilter>
        <Main>
          {registerData?.map((who, idx) => (
            <Item key={idx}>
              <Profile>
                <Image
                  src={`${who?.profileImage}`}
                  width={48}
                  height={48}
                  unoptimized={true}
                  alt="profile"
                />
              </Profile>
              <Summary>
                <div>
                  <span>{who?.name}</span>
                  <span>2023년 5월 9일 신청</span>
                </div>
                <span>{who?.location}</span>
              </Summary>
              <Button
                color="white"
                backgroundColor="var(--color-mint)"
                size="sm"
                onClick={() => onClick(who)}
              >
                신청보기
              </Button>
            </Item>
          ))}
        </Main>
      </Layout>
      {isModal && (
        <ModalPortal setIsModal={setIsModal}>
          <CheckRegisterModal
            setIsModal={setIsModal}
            applicant={applicant}
            setIsRefetch={setIsRefetch}
          />
        </ModalPortal>
      )}
    </>
  );
}

const Layout = styled.div`
  padding: 14px;
`;

const LocationFilter = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  margin-top: 14px;
  > div:first-child {
    border-top: 1px solid var(--font-h5);
  }
`;

const Item = styled.div`
  height: 72px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid var(--font-h5);
`;

const Summary = styled.div`
  flex: 1;
  padding: 0 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    display: flex;
    flex-direction: column;
    > span:first-child {
      font-weight: 600;
      font-size: 13px;
    }
    > span:last-child {
      font-size: 11px;
      color: var(--font-h3);
    }
  }
  > span {
    margin-right: 12px;
    font-size: 12px;
    font-weight: 600;
    color: var(--font-h2);
  }
`;

const Profile = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 19px;
  overflow: hidden;
`;

export default CheckRegister;
