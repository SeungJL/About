import styled from "styled-components";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
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

import { ModalFooterNav, ModalMain, ModalLg } from "../../styles/layout/modal";

import { usePlazaMutation } from "../../hooks/plaza/mutations";

import { ModalHeaderXLine } from "../../components/ui/Modal";
import {
  usePointMutation,
  useScoreMutation,
} from "../../hooks/user/pointSystem/mutation";

function SuggestModal({
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
  const { mutate: getPoint } = usePointMutation();
  const { mutate: getScores } = useScoreMutation();

  const onValid = (data) => {
    const suggestInfo = {
      category: "suggestionContents",
      title: data.title,
      writer: isRealName ? session.user.name : "",
      content: data.content,
      date: dayjs().format("YYYY-MM-DD"),
    };
    getScores(3);
    getPoint(3);
    suggestForm(suggestInfo);
    setIsModal(false);
  };

  return (
    <Layout>
      <ModalHeaderXLine title="건의사항" setIsModal={setIsModal} />
      <ModalMain>
        <Form onSubmit={handleSubmit(onValid)} id="suggest">
          <Item>
            <span>제목: </span>
            <TitleInput {...register("title")} />
          </Item>
          <Item>
            <span>작성일:</span>
            <div>{dayjs().format("YYYY-MM-DD")}</div>
          </Item>
          <Item>
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
                    size="sm"
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
          </Item>
          <Item>
            <Content>내용:</Content>
            <ContentInput {...register("content")} />
          </Item>
        </Form>
      </ModalMain>
      <ModalFooterNav>
        <button type="button" onClick={() => setIsModal(false)}>
          취소
        </button>
        <button form="suggest" type="submit">
          제출
        </button>
      </ModalFooterNav>
    </Layout>
  );
}

const Layout = styled(ModalLg)``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  > div:last-child {
    flex: 1;
  }
`;

const Item = styled.div`
  display: flex;
  min-height: 28px;
  margin-bottom: 12px;
  align-items: center;
  > span {
    display: inline-block;
    min-width: 20%;
    font-weight: 600;
    color: var(--font-h2);
  }
  > input {
    height: 90%;
    flex: 1;
  }
`;

const TitleInput = styled.input`
  background-color: var(--font-h7);
`;

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
  font-size: 12px;
  width: 36px;
  height: 18px;
  background-color: ${(props) =>
    props.isSelected ? "var(--color-red)" : "var(--font-h6)"};
  color: ${(props) => (props.isSelected ? "white" : "var(--font-h1)")};
`;

const Content = styled.span`
  margin-bottom: auto;
`;

const ContentInput = styled.textarea`
  margin-top: 5px;
  display: block;
  width: 100%;
  height: 100%;
  background-color: var(--font-h7);
`;

export default SuggestModal;
