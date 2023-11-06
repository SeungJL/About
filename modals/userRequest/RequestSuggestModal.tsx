import {
  Button,
  ModalFooter,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { faCircleExclamation } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  ModalBody,
  ModalHeader,
  ModalLayout,
} from "../../components/modals/Modals";
import { useCompleteToast, useFailToast } from "../../hooks/CustomToast";
import { useUserRequestMutation } from "../../hooks/user/mutations";
import { userInfoState } from "../../recoil/userAtoms";
import { IModal } from "../../types/reactTypes";
import { IUserRequest } from "../../types/user/userRequest";

interface IRequestSuggestModal extends IModal {
  type: "suggest" | "declare" | "studySpace";
}

function RequestSuggestModal({ type, setIsModal }: IRequestSuggestModal) {
  const { data: session } = useSession();
  const failToast = useFailToast();
  const completeToast = useCompleteToast();

  const [isRealName, setIsRealName] = useState(true);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: type === "studySpace" ? "스터디 장소 추천" : "",
      content: "",
    },
  });
  const userInfo = useRecoilValue(userInfoState);
  const location = userInfo?.location;

  const { mutate: sendDeclaration } = useUserRequestMutation({
    onSuccess() {
      completeToast("success");
    },
    onError(err) {
      console.error(err);
      failToast("error");
    },
  });

  const onValid = (data) => {
    const declarationInfo: IUserRequest = {
      category: type === "suggest" ? "건의" : "신고",
      title: data.title,
      writer: isRealName ? session.user.name : "",
      content: data.content,
      date: dayjs(),
      location,
    };

    sendDeclaration(declarationInfo);
    setIsModal(false);
  };

  const title =
    type === "suggest"
      ? "건의하기"
      : type === "declare"
      ? "불편사항 신고"
      : "스터디 장소 추천";

  return (
    <ModalLayout onClose={() => setIsModal(false)} size="xl">
      <ModalHeader text={title} />
      <ModalBody>
        <Form onSubmit={handleSubmit(onValid)} id="declaration">
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
              <WriterBtn
                type="button"
                isSelected={isRealName}
                onClick={() => setIsRealName(true)}
              >
                실명
              </WriterBtn>
              <WriterBtn
                type="button"
                isSelected={!isRealName}
                onClick={() => setIsRealName(false)}
              >
                익명
              </WriterBtn>
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
      </ModalBody>

      <ModalFooter p="var(--padding-sub) var(--padding-main)">
        <Button variant="ghost" type="button" onClick={() => setIsModal(false)}>
          취소
        </Button>
        <Button
          form="declaration"
          type="submit"
          variant="ghost"
          color="var(--color-mint)"
        >
          제출
        </Button>
      </ModalFooter>
    </ModalLayout>
  );
}

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
  margin-bottom: var(--margin-sub);
  align-items: center;
  > span {
    display: inline-block;
    min-width: 20%;
    font-weight: 600;
  }
  > input {
    height: 90%;
    flex: 1;
  }
`;

const TitleInput = styled.input`
  padding: 0 var(--padding-min);
  background-color: var(--input-bg);
  border-radius: var(--border-radius-sub);
`;

const Writer = styled.div`
  display: flex;
  align-items: center;
  > button:last-child {
    margin-right: var(--margin-sub);
  }
  > div {
    width: 12px;
  }
`;
const WriterBtn = styled.button<{ isSelected: boolean }>`
  font-size: 12px;
  width: 36px;
  height: 18px;
  background-color: ${(props) =>
    props.isSelected ? "var(--color-mint)" : "var(--font-h6)"};
  color: ${(props) => (props.isSelected ? "white" : "var(--font-h1)")};
`;

const Content = styled.span`
  margin-bottom: auto;
`;

const ContentInput = styled.textarea`
  margin-top: var(--margin-sub);
  border-radius: var(--border-radius-sub);
  display: block;
  width: 100%;
  height: 100%;
  padding: var(--padding-min);
  background-color: var(--input-bg);
`;

export default RequestSuggestModal;
