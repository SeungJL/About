import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { now } from "../libs/utils/dateUtils";
import { BaseModal } from "../styles/LayoutStyles";

const ModalLayout = styled(BaseModal)`
  width: 240px;
  height: 270px;
`;

const Header = styled.header`
  height: 28px;
  font-size: 1.2em;
  margin-bottom: 10px;
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

const UserForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const ErrorMessage = styled.div`
  font-size: 0.8em;
  height: 16px;
  color: brown;
`;

const InputItem = styled.div`
  height: 20px;
  display: flex;
  margin: 5px 0;

  > span {
    font-size: 0.9em;
    width: 33%;
  }
  > input {
    width: 67%;
    background-color: rgb(0, 0, 0, 0.1);
  }
`;
const SubmitBtn = styled.div`
  display: flex;

  > input {
    margin-right: 18px;
  }
  > button {
    margin-right: 3px;
    background-color: brown;
    color: white;
    width: 50px;
    border-radius: 15px;
  }
`;

interface IUserInfoForm {
  joinDate: string;
  name: string;
  mbti?: string;
  birth: string;
}

function UserInfoForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IUserInfoForm>({
    defaultValues: {
      joinDate: `${now().format("YYYY-MM-DD")}`,
      name: "",
      mbti: "",
      birth: "",
    },
  });
  const onValid = (data: any) => {
    console.log(10, data);
  };

  return (
    <>
      <ModalLayout>
        <Header>사용자 정보</Header>
        <UserForm onSubmit={handleSubmit(onValid)}>
          <InputItem>
            <span>가입일: </span>
            <input
              {...register("joinDate", {
                required: "필수입력",
                pattern: {
                  value: /^\d{4}-\d{2}-\d{2}$/,
                  message: "YYYY-MM-DD 형식으로 작성해주세요",
                },
              })}
              placeholder="YYYY-MM-DD"
            />
          </InputItem>
          <ErrorMessage>{errors?.joinDate?.message}</ErrorMessage>
          <InputItem>
            <span>이름: </span>
            <input
              {...register("name", {
                required: "필수입력",
                maxLength: {
                  value: 3,
                  message: "세글자로 입력해주세요",
                },
                minLength: {
                  value: 3,
                  message: "세글자로 입력해주세요",
                },
              })}
            />
          </InputItem>
          <ErrorMessage>{errors?.name?.message}</ErrorMessage>
          <InputItem>
            <span>생년월일: </span>
            <input
              {...register("birth", {
                required: "필수입력",
                pattern: {
                  value: /^\d{6}$/,
                  message: "주민번호 앞자리",
                },
              })}
              placeholder="Ex) 970816"
            />
          </InputItem>
          <ErrorMessage>{errors?.birth?.message}</ErrorMessage>
          <InputItem>
            <span>MBTI(선택): </span>
            <input {...register("mbti")} placeholder="Ex) ENFP" />
          </InputItem>
          <ErrorMessage>{errors?.mbti?.message}</ErrorMessage>
          <SubmitBtn>
            <button>약관</button>
            <span>동의</span>
            <input type="checkbox" />
            <button>취소</button>
            <button>제출</button>
          </SubmitBtn>
        </UserForm>
      </ModalLayout>
    </>
  );
}
export default UserInfoForm;
