import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Header from "../../../components/layout/Header";
import PageLayout from "../../../components/layout/PageLayout";
import { transferMemberDataState } from "../../../recoil/transferDataAtoms";

function Detail() {
  const memberData = useRecoilValue(transferMemberDataState);

  return (
    <PageLayout>
      <Header title={memberData?.category} url="back" />
      <Container>
        {memberData?.memberData.map((who) => (
          <Item key={who.uid}>who</Item>
        ))}
      </Container>
    </PageLayout>
  );
}

const Container = styled.div``;

const Item = styled.div``;

export default Detail;
