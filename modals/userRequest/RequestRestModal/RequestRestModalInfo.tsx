import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { PopOverIcon } from "../../../components/common/Icon/PopOverIcon";
import { ModalMain } from "../../../styles/layout/modal";
import { IApplyRest } from "./RequestRestModal";
const POPOVER_MESSAGE =
  "일반 휴식은 기본 분기별로 1회, 최대 한달까지만 가능합니다. 추가적으로 휴식 기간이 필요한 경우 보증금 500원 차감과 함께 신청됩니다. 특별 휴식은 기간에 상관없이 휴식이 가능하나, 인정될만한 특수한 사정이 있는 경우에만 관리자 동의하에 가능합니다.";

interface IRequestRestModalInfo {
  onSubmit: (data: IApplyRest) => void;
}

function RequestRestModalInfo({ onSubmit }: IRequestRestModalInfo) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IApplyRest>({
    defaultValues: {
      type: "일반",
      startDate: dayjs().format("YYYY-MM-DD"),
      endDate: "",
      content: "",
    },
  });
  const { data: session } = useSession();
  const option = watch("type");
  const startDate = watch("startDate");
  const getEndDateRange = (type: "min" | "max") => {
    if (option === "특별" || !startDate) return;
    const start = new Date(startDate as string);
    const min = start.toISOString().split("T")[0];
    const max = start.setMonth(start.getMonth() + 1);
    if (type === "min") return { value: min, message: "기간을 확인해주세요!" };
    if (type === "max")
      return {
        value: max,
        message: "일반 휴식은 최대 한달까지만 가능합니다! ",
      };
  };

  return (
    <ModalMain>
      <Form onSubmit={handleSubmit(onSubmit)} id="rest">
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
          <PopOverIcon title="일반 휴식 / 특별 휴식" text={POPOVER_MESSAGE} />
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

export default RequestRestModalInfo;
