import { useSession } from "next-auth/react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { ModalFooterNav, ModalMain } from "../../styles/layout/modal";
import { IApplyRest } from "../../types/userRequest";

import { PopoverIcon } from "../../components/common/Icon/PopoverIcon";
import { ModalHeaderX } from "../../components/common/modal/ModalComponents";
import { ModalLayout } from "../../components/common/modal/Modals";
import { useCompleteToast, useFailToast } from "../../hooks/ui/CustomToast";
import { useUserApplyRestMutation } from "../../hooks/user/mutations";
import { useUserRequestMutation } from "../../hooks/userRequest/mutations";
import { IModal } from "../../types/common";
import { IUserRequest } from "../../types/user";

function RequestRestModal({ setIsModal }: IModal) {
  const { data: session } = useSession();
  const completeToast = useCompleteToast();
  const failToast = useFailToast();

  const { mutate: sendRestRequest } = useUserRequestMutation();

  const { mutate: applyRest } = useUserApplyRestMutation({
    onSuccess() {
      completeToast("apply");
    },
    onError(err) {
      console.error(err);
      failToast("error");
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IApplyRest>({
    defaultValues: {
      type: "일반",
      startDate: "",
      endDate: "",
      content: "",
    },
  });
  console.log(errors);
  const onValid = (data: IApplyRest) => {
    const restInfo = {
      type: data.type,
      startDate: data.startDate,
      endDate: data.endDate,
      content: data.content,
    };
    const requestData: IUserRequest = {
      category: "휴식",
      writer: session.user.name,
      content:
        data.type +
        " / " +
        data.startDate +
        " ~ " +
        data.endDate +
        " / " +
        data.content,
    };

    sendRestRequest(requestData);
    applyRest(restInfo);
    setIsModal(false);
  };

  const option = watch("type");
  const startDate = watch("startDate");

  const getEndDateRange = (type: "min" | "max") => {
    if (option === "특별" || !startDate) return;
    const start = new Date(startDate as string);
    const min = start.toISOString().split("T")[0];
    const max = start.setMonth(start.getMonth() + 1);
    if (type === "min") return { value: min, message: "기간을 확인해주세요!" };
    if (type === "max")
      return { value: max, message: "일반 휴식은 최대 한달까지만 가능합니다." };
  };

  return (
    <ModalLayout size="xl">
      <ModalHeaderX title="휴식신청" setIsModal={setIsModal} />
      <ModalMain>
        <Form onSubmit={handleSubmit(onValid)} id="rest">
          <Item>
            <span>이름:</span>
            <span>{session?.user.name}</span>
          </Item>
          <Item>
            <span>타입:</span>
            <TypeSelect {...register("type")}>
              <option value="일반">일반 휴식</option>
              <option value="특별">특별 휴식</option>
            </TypeSelect>
            <PopoverIcon title="일반 휴식 / 특별 휴식" text="test" />
          </Item>
          <DateItem>
            <span>기간:</span>
            <DateInput type="date" {...register("startDate")} />
            <DateInput
              type="date"
              {...register("endDate", {
                min: getEndDateRange("min"),
                max: getEndDateRange("max"),
              })}
            />
          </DateItem>
          <Item>
            <Reason>사유:</Reason>
            <Textarea {...register("content")}></Textarea>
          </Item>
        </Form>
        <ErrorMessage>{errors?.endDate?.message}</ErrorMessage>
      </ModalMain>
      <ModalFooterNav>
        <button type="button" onClick={() => setIsModal(false)}>
          취소
        </button>
        <button type="submit" form="rest">
          제출
        </button>
      </ModalFooterNav>
    </ModalLayout>
  );
}

const Form = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
  > div:last-child {
    flex: 1;
  }
`;
const Item = styled.div`
  display: flex;
  margin-bottom: var(--margin-sub);
  align-items: center;
  > span:first-child {
    width: var(--width-inline-title);
    font-weight: 600;
    color: var(--font-h2);
  }
  > input,
  select {
    padding: var(--padding-min);
  }
`;

const TypeMessage = styled.span`
  margin-left: var(--margin-sub);
`;

const DateItem = styled(Item)`
  > input {
    flex: 0.5;
  }
  > input:nth-child(2) {
    margin-right: var(--margin-sub);
  }
`;

const DateInput = styled.input`
  padding: var(--padding-min);
  background-color: var(--input-bg);
  border-radius: var(--border-radius-sub);
`;

const ErrorMessage = styled.div`
  font-size: 11px;
  height: 16px;
  color: var(--color-red);
`;

const TypeSelect = styled.select`
  background-color: var(--input-bg);
  border-radius: var(--border-radius-sub);
  margin-right: var(--margin-sub);
`;

const Reason = styled.span`
  margin-bottom: auto;
`;

const Textarea = styled.textarea`
  padding: var(--padding-md);
  flex: 1;
  height: 100%;
  background-color: var(--font-h7);
  border-radius: var(--border-radius-sub);
`;

export default RequestRestModal;
