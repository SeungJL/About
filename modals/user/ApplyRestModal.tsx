import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { ModalXL } from "../../styles/LayoutStyles";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { IApplyRest } from "../../types/userAction";
function ApplyRestModal({
  setIsModal,
}: {
  setIsModal: Dispatch<SetStateAction<boolean>>;
}) {
  const { data: session } = useSession();

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
      uid: session?.uid,
      type: data.type,
      startDate: data.startDate,
      endDate: data.endDate,
      content: data.content,
    };
  };
  const option = watch("type"); // 옵션 입력값 감시

  const maxEndDate = () => {
    const startDate = watch("startDate");

    if (option === "일반휴식" && startDate) {
      console.log(44);
      const maxDate = new Date(startDate);
      maxDate.setMonth(maxDate.getMonth() + 2);

      return maxDate.toISOString().split("T")[0]; // DateInput에 넣을 문자열 형식으로 변환
    }
    return undefined;
  };
  return (
    <Layout>
      <Header>
        <span>휴식신청</span>
        <FontAwesomeIcon icon={faXmark} onClick={() => setIsModal(false)} />
      </Header>

      <Form onSubmit={handleSubmit(onValid)}>
        <InputItem>
          <span>이름:</span>
          <span>{session?.user.name}</span>
        </InputItem>
        <InputItem>
          <span>타입:</span>
          <select {...register("type")}>
            <option value="일반휴식">일반 휴식</option>
            <option value="특별휴식">특별 휴식</option>
          </select>
        </InputItem>
        <InputItem>
          <span>휴식 기간</span>
          <DateInput type="date" {...register("startDate")} />
          <DateInput
            type="date"
            {...register("endDate", {
              max: { value: maxEndDate(), message: "2개월 이내로 선택하세요" },
            })}
          />
        </InputItem>
        <ErrorMessage>{errors?.endDate?.message}</ErrorMessage>
        <Content>
          <span>사유</span>
          <textarea {...register("content")}></textarea>
        </Content>

        <Footer>
          <button type="button" onClick={() => setIsModal(false)}>
            취소
          </button>
          <button type="submit">제출</button>
        </Footer>
      </Form>
    </Layout>
  );
}

const Layout = styled(ModalXL)`
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--font-h5);
  padding-bottom: 6px;
  > span {
    font-size: 16px;
    font-weight: 600;
  }
`;

const Form = styled.form`
  display: flex;
  height: 100%;
  flex-direction: column;
  margin-top: 6px;
`;
const InputItem = styled.div`
  height: 20px;
  display: flex;
  margin: 5px 0;

  > span:first-child {
    font-size: 14px;
    width: 20%;
  }
  > select {
    background-color: var(--font-h7);
  }
`;

const DateInput = styled.input`
  width: 35%;
  background-color: var(--font-h7);
  margin-right: 12px;
`;
const ErrorMessage = styled.div`
  font-size: 11px;
  height: 16px;
  color: var(--color-red);
`;
const Content = styled.div`
  flex: 1;
  display: flex;
  margin-top: 8px;
  > span {
    width: 20%;
  }
  > textarea {
    width: 80%;
    height: 90%;
    background-color: var(--font-h7);
  }
`;

const Message = styled.div``;

const Footer = styled.footer`
  display: flex;

  align-items: flex-end;
  justify-content: end;
  text-align: end;
  > button:first-child {
    margin-right: 3px;
    background-color: var(--color-red);
    color: white;
    width: 56px;
    height: 25px;

    border-radius: 15px;
  }
  > button:last-child {
    display: inline-block;
    text-align: center;
    margin-left: 12px;
    margin-right: 4px;
    font-weight: 600;
    font-size: 15px;

    color: var(--color-red);
  }
`;

export default ApplyRestModal;
