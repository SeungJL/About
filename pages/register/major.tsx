import styled from "styled-components";
import { ChangeEvent, useEffect, useState } from "react";
import ProgressLayout from "../../components/layouts/ProgressLayout";
import Header from "../../components/layouts/Header";
import RegisterOverview from "../../pagesComponents/Register/RegisterOverview";
import RegisterLayout from "../../pagesComponents/Register/RegisterLayout";
import BottomNav from "../../components/layouts/BottomNav";
import { useRecoilState, useSetRecoilState } from "recoil";
import { registerFormState } from "../../recoil/userAtoms";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Location } from "../../types/system";
import { majors_DATA } from "../../storage/ProfileData";
import { IMajor } from "../../types/user";
import { useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";

function Interest() {
  const router = useRouter();
  const toast = useToast();
  const [registerForm, setRegisterForm] = useRecoilState(registerFormState);
  console.log(registerForm);
  const [errorMessage, setErrorMessage] = useState("");
  const [majors, setmajors] = useState<IMajor[]>(registerForm?.majors || []);

  const onClickNext = () => {
    if (!majors.length) {
      toast({
        title: "진행 불가",
        description: `전공을 선택해 주세요!`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setRegisterForm((old) => ({ ...old, majors }));
    router.push(`interest`);
  };

  const onClickBtn = (department: string, detail: string) => {
    if (majors?.find((item) => item?.detail === detail)) {
      setmajors((old) => old.filter((item) => item.detail !== detail));
      return;
    }

    if (majors.length >= 2) {
      toast({
        title: "선택 불가",
        description: `2개까지만 선택이 가능해요`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setmajors((old) => [...old, { department, detail }]);
  };

  return (
    <Layout initial={{ x: 200 }} animate={{ x: 0 }}>
      <ProgressLayout value={60} />
      <Header title="회원가입" url="mbti" />
      <RegisterLayout errorMessage={errorMessage}>
        <RegisterOverview>
          <span>전공을 선택해 주세요</span>
          <span>다중 선택도 가능해요.</span>
        </RegisterOverview>
        <div style={{ height: "40px" }} />
        {majors_DATA?.map((item, idx) => (
          <Section key={idx}>
            <SectionTitle>{item.department}</SectionTitle>
            <SectionContent>
              {item.details?.map((detail, idx) => (
                <Content
                  key={idx}
                  isSelected={Boolean(
                    majors?.find(
                      (majors) =>
                        majors.detail === detail &&
                        majors.department === item.department
                    )
                  )}
                  onClick={() => onClickBtn(item.department, detail)}
                >
                  {detail}
                </Content>
              ))}
            </SectionContent>
          </Section>
        ))}
      </RegisterLayout>
      <BottomNav onClick={() => onClickNext()} />
    </Layout>
  );
}

const Layout = styled(motion.div)`
  height: 100vh;
`;

const Section = styled.section`
  margin-bottom: 20px;
`;

const SectionTitle = styled.span`
  font-weight: 600;
  font-size: 13px;
`;

const SectionContent = styled.div`
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
`;

const Content = styled.button<{ isSelected: boolean }>`
  padding: 4px 6px;
  font-size: 12px;
  border-radius: 100px;
  border: 1px solid #ccc;
  margin-right: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => props.isSelected && "var(--color-mint)"};
  color: ${(props) => props.isSelected && "white"};
`;

export default Interest;
