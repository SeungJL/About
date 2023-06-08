import { Button, Select } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import Header from "../../components/layouts/Header";
import Image from "next/image";
import { useState, useEffect } from "react";
import ModalPortal from "../../components/ModalPortal";
import CheckRegisterModal from "../../modals/admin/CheckRegisterModal";
import { IRegisterForm } from "../../types/user";
import { useRegisterQuery, useUserInfoQuery } from "../../hooks/user/queries";
function CheckRegister() {
  const { data: session } = useSession();

  const temp = [1, 2, 3];
  const [isModal, setIsModal] = useState(false);
  const [applicant, setApplicant] = useState<IRegisterForm>();
  const { data } = useUserInfoQuery();
  const [isRefetch, setIsRefetch] = useState(false);
  const { data: applyData, refetch } = useRegisterQuery({
  
  });

  const onClick = (who?: IRegisterForm) => {
    setApplicant(who);
    setIsModal(true);
  };

  useEffect(() => {
    if (isRefetch) refetch();
    setIsRefetch(false);
  }, [isRefetch, refetch]);
  return (
    <>
      <Header title="가입 신청 확인" url="/admin" />
      <Layout>
        <LocationFilter>
          <Select width="80px">
            <option value="all">전체</option>
            <option value="수원">수원</option>
            <option value="양천">양천</option>
            <option value="안양">안양</option>
          </Select>
        </LocationFilter>
        <Main>
          {applyData?.map((who, idx) => (
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

const LocationFilter = styled.div``;

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
