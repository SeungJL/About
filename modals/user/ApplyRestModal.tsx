import styled from "styled-components";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

import { ModalFooterNav, ModalLg, ModalMain } from "../../styles/layout/modal";

import { IApplyRest } from "../../types/userAction";

import { useApplyRestMutation } from "../../hooks/user/mutations";
import { ModalHeaderXLine } from "../../components/Layout/Component";

function ApplyRestModal({
  setIsModal,
}: {
  setIsModal: Dispatch<SetStateAction<boolean>>;
}) {
  const { data: session } = useSession();
  const { mutate: applyRest } = useApplyRestMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IApplyRest>({
    defaultValues: {
      type: "일반휴식",
      startDate: "",
      endDate: "",
      content: "",
    },
  });
  const onValid = (data: IApplyRest) => {
    const info = {
      type: data.type,
      startDate: data.startDate,
      endDate: data.endDate,
      content: data.content,
    };
    applyRest(info);
  };
  const option = watch("type"); // 옵션 입력값 감시

  const maxEndDate = () => {
    const startDate = watch("startDate");

    if (option === "일반휴식" && startDate) {
      const maxDate = new Date(startDate);
      maxDate.setMonth(maxDate.getMonth() + 2);

      return maxDate.toISOString().split("T")[0]; // DateInput에 넣을 문자열 형식으로 변환
    }
    return undefined;
  };
  return (
    <Layout>
      <ModalHeaderXLine title="휴식신청" setIsModal={setIsModal} />
      <ModalMain>
        <Form onSubmit={handleSubmit(onValid)} id="rest">
          <Item>
            <span>이름:</span>
            <span>{session?.user.name}</span>
          </Item>
          <Item>
            <span>타입:</span>
            <TypeSelect {...register("type")}>
              <option value="일반휴식">일반 휴식</option>
              <option value="특별휴식">특별 휴식</option>
            </TypeSelect>
          </Item>
          <Item>
            <span>기간:</span>
            <DateInput type="date" {...register("startDate")} />
            <DateInput
              type="date"
              {...register("endDate", {
                max: {
                  value: maxEndDate(),
                  message: "2개월 이내로 선택하세요",
                },
              })}
            />
          </Item>

          <Item>
            <Reason>사유:</Reason>
            <Textarea {...register("content")}></Textarea>
          </Item>
        </Form>
      </ModalMain>
      <ModalFooterNav>
        <button type="button" onClick={() => setIsModal(false)}>
          취소
        </button>
        <button type="submit" form="rest">
          제출
        </button>
      </ModalFooterNav>
    </Layout>
  );
}

const Layout = styled(ModalLg)``;

const Form = styled.form`
  display: flex;
  height: 100%;
  flex-direction: column;
  > div:last-child {
    flex: 1;
  }
`;

const DateInput = styled.input`
  width: 30%;
  background-color: var(--font-h7);
  margin-right: 12px;
`;
const ErrorMessage = styled.div`
  font-size: 11px;
  height: 16px;
  color: var(--color-red);
`;

const TypeSelect = styled.select`
  background-color: var(--font-h7);
`;

const Item = styled.div`
  display: flex;
  min-height: 28px;
  margin-bottom: 12px;
  align-items: center;

  > span {
    display: inline-block;
    min-width: 20%;
    font-weight: 600;
    color: var(--font-h2);
  }
  > input {
    height: 90%;
    flex: 1;
  }
`;

const Reason = styled.span`
  margin-bottom: auto;
`;

const Textarea = styled.textarea`
  margin-top: 5px;
  display: block;
  width: 100%;
  height: 100%;
  background-color: var(--font-h7);
`;

const NoUse = styled.span`
  font-weight: 600;
`;

export default ApplyRestModal;
