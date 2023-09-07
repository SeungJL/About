import { Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ModalHeaderX } from "../../components/common/modal/ModalComponents";
import { ModalLayout } from "../../components/common/modal/Modals";
import {
  useCompleteToast,
  useErrorToast,
  useFailToast,
} from "../../hooks/CustomToast";
import { useUserRequestMutation } from "../../hooks/user/mutations";
import {
  useUserInfoQuery,
  useUserRequestQuery2,
} from "../../hooks/user/queries";
import { isGuestState } from "../../recoil/userAtoms";
import { ModalMain } from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";
import { IUserRequest } from "../../types/user/userRequest";

function RegularGatherModal({ setIsModal }: IModal) {
  const isGuest = useRecoilValue(isGuestState);
  const failToast = useFailToast();
  const completeToast = useCompleteToast();
  const errorToast = useErrorToast();
  const { data: userInfo } = useUserInfoQuery({ enabled: isGuest === false });
  const { data: requestData, isLoading } = useUserRequestQuery2();

  const { mutate } = useUserRequestMutation({
    onSuccess() {
      completeToast("apply");
      setIsModal(false);
    },
    onError: errorToast,
  });

  const { register, handleSubmit } = useForm();

  const onValid = (data) => {
    if (isGuest) {
      failToast("guest");
      return;
    }
    const applyData: IUserRequest = {
      category: "조모임",
      location: userInfo.location,
      title: userInfo.birth + "-" + userInfo.mbti,
      writer: userInfo.name,
      content: data?.content || "",
    };

    mutate(applyData);
  };
  return (
    <ModalLayout size="xl">
      <ModalHeaderX title="조모임 참여 신청서" setIsModal={setIsModal} />
      <ModalMain>
        <Overview>
          이번 달에는 개강을 맞아 같은 동네의 또래 친구들을 만날 수 있는
          조모임으로 진행합니다!
          <Count>
            <span>현재 신청 인원:</span>
            <span>
              {isLoading
                ? "..."
                : requestData?.filter((item) => item.category === "조모임")
                    ?.length}
              명
            </span>
          </Count>
          <Rule>
            <li>조 인원은 4~6명 사이로 구성됩니다.</li>
            <li>나이는 동갑에서 최대 2살 이내로 구성됩니다.</li>
            <li>요구사항이 있는 경우 적어주시면 맞춰서 조를 짜드려요!</li>
            <li>활동 날짜나 내용은 조장이 알아서 조율 !</li>
          </Rule>
        </Overview>
        <Form onSubmit={handleSubmit(onValid)} id="declaration">
          <Item>
            <span>신청 마감:</span>
            <div>9월 10일</div>
          </Item>
          <Item>
            <Content>
              <span>요구 사항:</span>
              <span>(있는 경우)</span>
            </Content>
            <ContentInput {...register("content")} />
          </Item>
        </Form>
      </ModalMain>
      <ModalFooter>
        <Button w="50%" type="button" onClick={() => setIsModal(false)}>
          취소
        </Button>
        <Button
          w="50%"
          colorScheme="mintTheme"
          form="declaration"
          type="submit"
        >
          신청
        </Button>
      </ModalFooter>
    </ModalLayout>
  );
}

const Overview = styled.div`
  color: var(--font-h1);
`;

const Count = styled.div`
  color: var(--font-h1);
  width: max-content;
  padding: var(--padding-min) var(--padding-md);
  border-radius: var(--border-radius-main);
  border: var(--border-mint);
  margin: var(--margin-sub) 0;
  font-size: 13px;
  > span:last-child {
    margin-left: var(--margin-md);
    color: var(--color-mint);
    font-weight: 600;
  }
`;

const Rule = styled.div`
  color: var(--font-h3);
  margin-top: var(--margin-md);
  line-height: var(--line-height);
  font-size: 11px;
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  margin-top: var(--margin-md);
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
  margin-bottom: var(--margin-md);
  align-items: center;

  > span {
    display: inline-block;
    min-width: 23%;
    font-weight: 600;
  }
  > input {
    height: 90%;
    flex: 1;
  }
`;

const ModalFooter = styled.div`
  display: flex;
`;

const Content = styled.div`
  min-width: 23%;
  display: flex;
  flex-direction: column;

  height: 100%;
  > span:first-child {
    font-weight: 600;
  }
  > span:last-child {
    font-size: 11px;
    color: var(--font-h3);
  }
`;

const ContentInput = styled.textarea`
  border-radius: var(--border-radius-sub);
  display: block;
  width: 100%;
  font-size: 12px;
  height: 100%;
  background-color: var(--input-bg);
  padding: var(--padding-min);
  :focus {
    outline: none;
  }
`;

export default RegularGatherModal;
