import styled from "styled-components";
import {
  faCircleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";

import { ModalXL } from "../../styles/layout/modal";

import { usePlazaMutation } from "../../hooks/plaza/mutations";
import { useScoreMutation } from "../../hooks/user/mutations";

export default function SuggestModal({
  setIsModal,
}: {
  setIsModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [isRealName, setIsRealName] = useState(true);
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: suggestForm } = usePlazaMutation();
  const { mutate: getScores } = useScoreMutation();

  const onValid = (data) => {
    const suggestInfo = {
      category: "suggestionContents",
      title: data.title,
      writer: isRealName ? session.user.name : "",
      content: data.content,
      date: dayjs().format("YYYY-MM-DD"),
    };
    getScores(2);
    suggestForm(suggestInfo);
    setIsModal(false);
  };

  return (
    <Layout>
      <Header>
        <span>건의사항</span>
        <FontAwesomeIcon icon={faXmark} onClick={() => setIsModal(false)} />
      </Header>
      <Form onSubmit={handleSubmit(onValid)}>
        <div>
          <Title>제목: </Title>
          <TitleInput {...register("title")} />
        </div>
        <Date>
          <span>작성일:</span>
          <div>{dayjs().format("YYYY-MM-DD")}</div>
        </Date>
        <div>
          <span>작성자: </span>
          <Writer>
            <Button
              type="button"
              isSelected={isRealName}
              onClick={() => setIsRealName(true)}
            >
              실명
            </Button>
            <Button
              type="button"
              isSelected={!isRealName}
              onClick={() => setIsRealName(false)}
            >
              익명
            </Button>
            <div />
            <Popover>
              <PopoverTrigger>
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  color="var(--font-h2)"
                />
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader fontSize="11px">익명 제출</PopoverHeader>
                <PopoverBody fontSize="11px">
                  익명으로 제출한 건의/문의/불만 등에 대해서는 철저하게 익명을
                  보장합니다. 단, 채택되어도 상품을 받을 수 없습니다.
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Writer>
        </div>
        <Content>
          <span>내용</span>
          <ContentInput {...register("content")} />
        </Content>
        <Footer>
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
  margin-top: 6px;
  display: flex;
  flex-direction: column;
  > div {
    display: flex;
    margin-bottom: 12px;
    height: 24px;
    align-items: center;
    > span {
      display: inline-block;
      width: 40px;
      margin-right: 12px;
      color: var(--font-h1);
    }
  }
`;
const Title = styled.span``;
const TitleInput = styled.input`
  width: 100%;
  background-color: var(--font-h7);
`;
const Date = styled.div``;
const Writer = styled.div`
  display: flex;
  align-items: center;
  > button:last-child {
    margin-right: 12px;
  }
  > div {
    width: 10px;
  }
`;
const Button = styled.button<{ isSelected: boolean }>`
  width: 50px;
  height: 24px;
  background-color: ${(props) =>
    props.isSelected ? "var(--color-red)" : "var(--font-h6)"};
  color: ${(props) => (props.isSelected ? "white" : "var(--font-h1)")};
`;

const Content = styled.main``;
const ContentInput = styled.textarea`
  margin-top: 8px;
  display: block;
  width: 100%;
  height: 130px;
  background-color: var(--font-h7);
`;

const Footer = styled.footer`
  margin-top: 10px;
  text-align: end;
  > button {
    background-color: var(--color-red);
    color: white;
    width: 50px;
    height: 22px;
    border-radius: 10px;
  }
`;
