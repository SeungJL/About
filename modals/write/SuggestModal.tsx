import {
  faCircleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type } from "os";
import { useState, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { ModalLg } from "../../styles/LayoutStyles";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
import { usePlazaMutation } from "../../hooks/plaza/mutations";

export default function SuggestModal({
  setIsShowSuggest,
}: {
  setIsShowSuggest: Dispatch<SetStateAction<boolean>>;
}) {
  const [isRealName, setIsRealName] = useState(true);
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: suggestForm } = usePlazaMutation();

  const onValid = (data) => {
    const suggestInfo = {
      category: "suggestionContents",
      title: data.title,
      writer: isRealName ? session.user.name : "",
      content: data.content,
      data: dayjs().format("YYYY-MM-DD"),
    };

    suggestForm(suggestInfo);
  };
  return (
    <Layout>
      <Header>
        <span>건의사항</span>
        <FontAwesomeIcon
          icon={faXmark}
          onClick={() => setIsShowSuggest(false)}
        />
      </Header>
      <form onSubmit={handleSubmit(onValid)}>
        <span>제목: </span>
        <TitleInput {...register("title")} />
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
          <FontAwesomeIcon icon={faCircleExclamation} color="yellow" />
        </Writer>
        <ContentInput {...register("content")} />
        <Footer>
          <button type="submit">제출</button>
        </Footer>
      </form>
    </Layout>
  );
}

const Layout = styled(ModalLg)`
  height: 200px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
`;
const TitleInput = styled.input``;
const Writer = styled.div`
  display: inline-block;
`;
const Button = styled.button<{ isSelected: boolean }>`
  background-color: ${(props) => (props.isSelected ? "brown" : "lightGray")};
`;
const ContentInput = styled.textarea`
  display: block;
  width: 90%;
  height: 80px;
`;

const Footer = styled.footer`
  text-align: end;
`;
