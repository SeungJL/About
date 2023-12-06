import styled from "styled-components";
import { CopyBtn } from "../../../components/common/Icon/CopyIcon";
import { ModalBody } from "../../../components/modals/Modals";
import { IUserRegisterForm } from "../../../types/user/user";

interface ICheckRegisterModalDetail {
  applicant: IUserRegisterForm;
}

function CheckRegisterModalDetail({ applicant }: ICheckRegisterModalDetail) {
  return (
    <ModalBody>
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
        {applicant?.majors[0]?.detail}
      </Item>
      <Item>
        <b>관심사 </b>
        {applicant?.interests?.first}
      </Item>
      <Item>
        <b>연락처 </b>
        {applicant?.telephone}
        <IconWrapper>
          <CopyBtn text={applicant?.telephone} />
        </IconWrapper>
      </Item>
    </ModalBody>
  );
}

const Item = styled.div`
  font-size: 14px;
  margin-bottom: var(--margin-md);
  > b {
    display: inline-block;
    width: 64px;
  }
`;
const IconWrapper = styled.span`
  margin-left: var(--margin-md);
`;

export default CheckRegisterModalDetail;
