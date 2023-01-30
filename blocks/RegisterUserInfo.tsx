import { useForm } from "react-hook-form";

import styled from "styled-components";

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 20px;
  width: 400px;
`;
const Input = styled.input`
  height: 30px;
  margin: 5px 0px;
`;

interface Iform {
  이름: string;
  나이: string;
  MBTI: string;
  취미: string;
}

function RegisterUserInfo() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Iform>({
    defaultValues: {},
  });
  console.log(watch());
  const onValid = (data: any) => {
    console.log(data);
  };
  console.log(errors.이름);
  return (
    <Container onSubmit={handleSubmit(onValid)}>
    
      <Input
        {...register("이름", {
          required: "이름을 확인해주세요.",
          pattern: {
            value: /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/,
            message: "한글로 입력헤주세요.",
          },
        })}
        placeholder="이름"
      />
      <span>{errors?.이름?.message}</span>
      <Input
        {...register("나이", {
          required: "숫자로 입력해주세요.",
          pattern: /^[20-30]/,
        })}
        placeholder="나이"
      />
      <Input {...register("MBTI")} placeholder="MBTI" />
      <Input {...register("취미")} placeholder="취미" />
      <div>동의하십니까</div>
      <button>제출</button>
    </Container>
  );
}
export default RegisterUserInfo;
