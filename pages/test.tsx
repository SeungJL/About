import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { now } from "../libs/utils/dateUtils";
import { BaseModal } from "../styles/LayoutStyles";

const ModalLayout = styled.div`
  position: absolute;
  top: 100;
  left: 500;
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
  > span {
    font-size: 0.8em;
    height: 16px;
  }
`;

const InputItem = styled.div`
  height: 20px;
  display: flex;
  margin: 5px 0;

  > span {
    font-size: 0.9em;
    width: 25%;
  }
  > input {
    width: 75%;
    background-color: pink;
  }
`;
const SubmitBtn = styled.div`
  text-align: end;
  > button {
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

function Test() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      joinDate: `${now().format("YYYY-MM-DD")}`,
    },
  });
  const onValid = (data: any) => {
    console.log(10, data);
  };

  return (
    <>
      <ModalLayout>
        <Header>사용자 정보</Header>
        <form onSubmit={handleSubmit(onValid)}>
          <input
            {...register("joinDate", {
              required: "필수입력",
            })}
          />{" "}
          <input
            {...register("mbti", {
              required: "필수입력",
            })}
          />
          <button>제출</button>
        </form>
      </ModalLayout>
    </>
  );
}
export default Test;
