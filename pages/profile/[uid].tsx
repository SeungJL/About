import { faEllipsisVertical } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Header from "../../components/layout/Header";
import { useUidToUserInfoQuery } from "../../hooks/user/queries";
import BottomDrawer from "../../pageTemplates/profile/BottomDrawer";
import DeclareDrawer from "../../pageTemplates/profile/DeclareDrawer";
import DetailInfo from "../../pageTemplates/profile/DetailInfo";
import ProfileOverview from "../../pageTemplates/profile/ProfileOverview";
import { prevPageUrlState } from "../../recoil/previousAtoms";
import { transferUserDataState } from "../../recoil/transferDataAtoms";
import { DeclareRequest } from "../../types/user/userRequest";

function ProfilePage() {
  const router = useRouter();
  const userData = useRecoilValue(transferUserDataState);
  const beforePage = useRecoilValue(prevPageUrlState);

  const uid = router.query.uid;

  const [isModal, setIsModal] = useState(false);
  const [declareModal, setDeclareModal] = useState<DeclareRequest>();

  const { data: userInfo } = useUidToUserInfoQuery(uid as string, {
    enabled: !!uid && !userData,
  });

  return (
    <>
      <Container>
        <Header title="" url={beforePage}>
          <button>
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              size="lg"
              onClick={() => setIsModal(true)}
            />
          </button>
        </Header>
        <Layout>
          <ProfileOverview user={userData || userInfo} />
          <HrDiv />
          <DetailInfo user={userData || userInfo} />
        </Layout>
      </Container>
      <BottomDrawer
        isModal={isModal}
        setIsModal={setIsModal}
        setDeclareModal={setDeclareModal}
      />
      <DeclareDrawer
        userData={userData || userInfo}
        declareModal={declareModal}
        setDeclareModal={setDeclareModal}
      />
    </>
  );
}

const Container = styled.div`
  background-color: white;
`;

const Layout = styled.div``;

const HrDiv = styled.div`
  background-color: var(--font-h7);
  height: 10px;
`;
export default ProfilePage;
