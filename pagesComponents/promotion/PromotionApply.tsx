import { Button, Input } from "@chakra-ui/react";
import { Resolver, useForm } from "react-hook-form";
import styled from "styled-components";
import { useCompleteToast } from "../../hooks/CustomToast";
import { usePromotionMutation } from "../../hooks/promotion/mutations";

function PromotionApply() {
  const completeToast = useCompleteToast();
  const { mutate } = usePromotionMutation({
    onSuccess() {
      completeToast("success");
    },
  });

  const resolver: Resolver<FormValues> = async (values) => {
    if (!values.uniName) {
      return {
        values: {},
        errors: {
          uniName: {
            type: "required",
            message: "This is required.",
          },
        },
      };
    }

    if (values.uniName.slice(-3) !== "대학교") {
      return {
        values: {},
        errors: {
          uniName: {
            type: "validate",
            message: "학교 이름은 '대학교'로 끝나야 합니다.",
          },
        },
      };
    }
    return {
      values: values,
      errors: {},
    };
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const onSubmit = handleSubmit((data) => {
    console.log(5, data);
    mutate(data.uniName);
  });

  type FormValues = {
    uniName: string;
  };

  return (
    <Form onSubmit={onSubmit}>
      <Input
        {...register("uniName", {
          validate: (value) => value.slice(0, -3) === "대학교",
        })}
        placeholder="학교"
        mr="var(--margin-sub)"
      />
      {errors?.uniName && <p>{errors.uniName.message}</p>}
      <Button type="submit" colorScheme="mintTheme">
        제출
      </Button>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  margin: var(--margin-max) 0;
`;

export default PromotionApply;
