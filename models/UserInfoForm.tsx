import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { BaseModal } from "../styles/LayoutStyles";

const ModalLayout = styled(BaseModal)`
  width: 200px;
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.header`
  height: 28px;
  font-size: 1.2em;
`;
const Footer = styled.footer`
  height: 28px;

  display: flex;
  justify-content: end;
  > button {
    width: 40px;
    border-radius: 10px;
  }
`;
const InputItem = styled.div`
  height: 30px;
  display: flex;
  flex-direction: column;
  > div {
    display: flex;
    > span {
      width: 50px;
    }
    > input {
      width: 60px;
      background-color: pink;
    }
  }
`;

interface IUserInfoForm {
  JoinDate: string;
}

function UserInfoForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IUserInfoForm>({
    defaultValues: {},
  });
  const onValid = (data: any) => {
    console.log(10, data);
  };

  return (
    <>
      <ModalLayout as="form" onSubmit={handleSubmit(onValid)}>
        <Header>사용자 정보</Header>
        <InputItem>
          <div>
            <span>가입일: </span>
            <input
              {...register("JoinDate", {
                required: "필수입력",
                pattern: {
                  value: /^\d{4}-\d{2}-\d{2}$/,
                  message: "한글로 입력헤주세요.",
                },
              })}
            />
          </div>
          <span>{errors?.JoinDate?.message}</span>
        </InputItem>

        <InputItem>
          <span>이름: </span>
          <input />
        </InputItem>
        <InputItem>
          <span>생년월일: </span>
          <input />
        </InputItem>
        <InputItem>
          <span>MBTI: </span>
          <input />
        </InputItem>
        <button>제출</button>
      </ModalLayout>
    </>
  );
}
export default UserInfoForm;
