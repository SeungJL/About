import styled from "styled-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useForm, useFormState } from "react-hook-form";
import { categoryState, gatherState, isWriteState } from "../../recoil/atoms";
import { useState } from "react";
import { gatherTest } from "../../storage/gathers";

const Container = styled.div`
  display: inline-block;
  margin: 15px;
`;
const WriteContainer = styled.form`
  display: flex;
  width: 430px;
  > button {
    width: 60px;
    height: 34px;
  }
`;
const DateInput = styled.input`
  width: 140px;
`;
const TextInput = styled.input`
  width: 100%;
  height: 34px;
  margin-right: 5px;
`;
interface IGatherForm {
  gatherItem: string;
  gatherDate: string;
}
const WriteBtn = styled.button`
  display: inline-block;
  width: 75px;
  box-shadow: 2px 2px 1px black;
`;
function CreateGather() {
  const [isWrite, setIsWrite] = useRecoilState(isWriteState);
  const setGathers = useSetRecoilState(gatherState);
  const category = useRecoilValue(categoryState);
  const mm = useRecoilValue(gatherState);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IGatherForm>({ defaultValues: {} });
  const onClick = () => {
    setIsWrite(true);
  };
  const handleValid = ({ gatherItem, gatherDate }: IGatherForm) => {
    setGathers((oldGather) => [
      { text: gatherItem, id: gatherTest.length, category, date: gatherDate },
      ...oldGather,
    ]);
    setValue("gatherItem", "");
    setValue("gatherDate", "");
  };

  return (
    <Container>
      {isWrite ? (
        <WriteContainer onSubmit={handleSubmit(handleValid)}>
          <DateInput
            {...register("gatherDate", {
              required: "날짜를 확인해주세요.",
            })}
            type="date"
          />
          <TextInput
            {...register("gatherItem", {
              required: "내용을 확인해주세요.",
            })}
          />
          <button>입력</button>
        </WriteContainer>
      ) : (
        <WriteBtn onClick={onClick}>Write</WriteBtn>
      )}
      <div>{errors?.gatherDate?.message}</div>
      <div>{errors?.gatherItem?.message}</div>
    </Container>
  );
}

export default CreateGather;
