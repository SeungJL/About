import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import BottomNav from "../../components/layout/BottomNav";
import Header from "../../components/layout/Header";
import PageLayout from "../../components/layout/PageLayout";
import Accordion from "../../components/templates/Accordion";
import ProgressStatus from "../../components/templates/ProgressStatus";
import { ACCORDION_CONTENT_FEE } from "../../constants/contents/accordionContents";
import { useErrorToast } from "../../hooks/CustomToast";
import { useUserRegisterMutation } from "../../hooks/user/mutations";
import RegisterCost from "../../pagesComponents/register/fee/RegisterCost";
import RegisterLayout from "../../pagesComponents/register/RegisterLayout";
import RegisterOverview from "../../pagesComponents/register/RegisterOverview";
import { sharedRegisterFormState } from "../../recoil/sharedDataAtoms";

function Fee() {
  const errorToast = useErrorToast();
  const router = useRouter();

  const registerForm = useRecoilValue(sharedRegisterFormState);

  const { mutate } = useUserRegisterMutation({
    onSuccess() {
      router.push(`/register/success`);
    },
    onError: errorToast,
  });

  const onClickNext = () => {
    mutate(registerForm);
  };

  return (
    <PageLayout>
      <ProgressStatus value={100} />
      <Header title="회원가입" url="/register/phone" />
      <RegisterLayout>
        <RegisterOverview>
          <span>회비 납부</span>
          <span>보증금은 회원 탈퇴시 환급해드려요!</span>
        </RegisterOverview>
        <Cost>
          <div>
            <RegisterCost />
          </div>
        </Cost>
        <Account>운영진에게 연락을 받은 후 납부해야 할 금액입니다!</Account>
        <Message>현재 페이지에서는 가입 신청만 진행됩니다.</Message>
        <Telephone>
          <span>연락받을 연락처:</span> {registerForm?.telephone}
          <Message>연락처를 한번 더 확인해 주세요!</Message>
        </Telephone>
        <Accordion contentArr={ACCORDION_CONTENT_FEE} />
      </RegisterLayout>
      <BottomNav onClick={onClickNext} text="신청완료" />
    </PageLayout>
  );
}

const Cost = styled.div`
  margin: var(--margin-max) 0;
  > div:first-child {
    color: var(--font-h2);
    font-size: 13px;
    margin-bottom: var(--margin-sub);
  }
  > div:last-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const Account = styled.div`
  margin-bottom: var(--margin-min);
  font-size: 14px;
  font-weight: 600;
  color: var(--font-h1);
`;

const Message = styled.div`
  font-size: 13px;
  color: var(--font-h3);
  margin-bottom: 40px;
`;

const Telephone = styled.div`
  > span:first-child {
    font-size: 14px;
    display: inline-block;
    font-weight: 600;
    color: var(--font-h1);
    margin-bottom: var(--margin-min);
  }
`;

export default Fee;
