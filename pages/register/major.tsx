import { useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import BottomNav from "../../components/layout/BottomNav";
import Header from "../../components/layout/Header";
import ProgressStatus from "../../components/layout/ProgressStatus";
import RegisterLayout from "../../pagesComponents/register/RegisterLayout";
import RegisterOverview from "../../pagesComponents/register/RegisterOverview";
import { isProfileEditState } from "../../recoil/previousAtoms";
import { sharedRegisterFormState } from "../../recoil/sharedDataAtoms";

import { majors_DATA } from "../../storage/ProfileData";
import { IMajor } from "../../types/user/user";

function Major() {
  const router = useRouter();

  const toast = useToast();

  const [registerForm, setRegisterForm] = useRecoilState(
    sharedRegisterFormState
  );

  const [majors, setmajors] = useState<IMajor[]>(registerForm?.majors || []);
  const isProfileEdit = useRecoilValue(isProfileEditState);

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
    router.push(`/register/interest`);
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
      <ProgressStatus value={60} />
      <Header
        title={!isProfileEdit ? "회원가입" : "프로필 수정"}
        url="/register/mbti"
      />
      <RegisterLayout>
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
  min-height: 100vh;
  margin-bottom: var(--margin-max);
`;

const Section = styled.section`
  margin-bottom: var(--margin-main);
`;

const SectionTitle = styled.span`
  font-weight: 600;
  font-size: 13px;
`;

const SectionContent = styled.div`
  margin-top: var(--margin-md);
  display: flex;
  flex-wrap: wrap;
`;

const Content = styled.button<{ isSelected: boolean }>`
  padding: var(--padding-min) var(--padding-md);
  font-size: 12px;
  border-radius: 100px;
  border: var(--border-sub);
  margin-right: var(--margin-md);
  margin-bottom: var(--margin-md);
  background-color: ${(props) => props.isSelected && "var(--color-mint)"};
  color: ${(props) => props.isSelected && "white"};
`;

export default Major;
