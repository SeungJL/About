import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { noticeCategoryState, noticeState } from "../../../recoil/noticeAtoms";

const Input = styled.input`
  width: 90%;
  height: 30px;
  background-color: #fde8e6;
`;
const Form = styled.form``;

function CreateNotice() {
  const setNotices = useSetRecoilState(noticeState);
  const category = useRecoilValue(noticeCategoryState);
  const { register, handleSubmit, setValue } = useForm();
  const onValid = ({ noticeState }: any) => {
    setNotices((oldNotice) => [...oldNotice, { text: noticeState, category }]);
    setValue("noticeState", "");
  };
  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <Input {...register("noticeState")} />
    </Form>
  );
}
export default CreateNotice;
