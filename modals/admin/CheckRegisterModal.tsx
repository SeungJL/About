import { Button } from "@chakra-ui/react";
import { SetStateAction } from "react";
import styled from "styled-components";
import { ModalHeaderX } from "../../components/ui/Modal";
import {
  useApproveMutation,
  useDeleteRegisterMutation,
} from "../../hooks/user/mutations";
import { ModalLg, ModalMain } from "../../styles/layout/modal";
import { IRegisterForm } from "../../types/user";

function CheckRegisterModal({
  setIsModal,
  applicant,
}: {
  setIsModal: React.Dispatch<SetStateAction<boolean>>;
  applicant: IRegisterForm;
}) {
  const { mutate: approve } = useApproveMutation({
    onSuccess() {
      console.log("success");
    },
    onError(err) {
      console.error(err);
    },
  });
  const { mutate: deleteR } = useDeleteRegisterMutation({
    onSuccess() {
      console.log("suc");
    },
  });

  const onClickAgree = () => {
    approve({ uid: applicant?.uid });
    setIsModal(false);
  };
  console.log(applicant);
  return (
    <Layout>
      <ModalHeaderX title={applicant?.name} setIsModal={setIsModal} />
      <ModalMain>
        <Item>
          <b>성별 </b>
          {applicant?.gender}
        </Item>
        <Item>
          <b>지역 </b>
          {applicant?.location}
        </Item>
        <Item>
          <b>나이 </b>
          {applicant?.birth}
        </Item>
        <Item>
          <b>mbti </b>
          {applicant?.mbti}
        </Item>
        <Item>
          <b>전공 </b>
          {applicant?.majors[0].detail}
        </Item>
        <Item>
          <b>관심사 </b>
          {applicant?.interests.first}
        </Item>
        <Item>
          <b>연락처 </b>
          {applicant?.telephone}
        </Item>
      </ModalMain>
      <Footer>
        <Button width="50%">확인</Button>
        <Button width="50%" colorScheme="mintTheme" onClick={onClickAgree}>
          승인
        </Button>
      </Footer>
    </Layout>
  );
}

const Layout = styled(ModalLg)``;

const Item = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
  > b {
    display: inline-block;
    width: 64px;
  }
`;

const Footer = styled.footer`
  display: flex;
`;

export default CheckRegisterModal;
