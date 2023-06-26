import { useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ProfileIcon from "../../../components/common/Profile/ProfileIcon";
import { useGatherCommentMutation } from "../../../hooks/gather/mutations";
import { useUserInfoQuery } from "../../../hooks/user/queries";
import { IGatherComment } from "../../../types/gather";
export interface IGatherCommentUnit {
  gatherId: number;
  comment: string;
}

interface IGatherComments {
  comment: IGatherComment;
}

function GatherComments({ comment }: IGatherComments) {
  const { data: session } = useSession();
  const isGuest = session?.user.name;
  const router = useRouter();
  const gatherId = +router.query.id;
  const { data: userInfo } = useUserInfoQuery();
  const [value, setValue] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);
  const { mutate: writeComment } = useGatherCommentMutation({
    onSuccess() {
      console.log("SUC");
    },
  });
  const onSubmit = () => {
    const data: IGatherCommentUnit = { gatherId, comment: value };
    writeComment(data);
  };
  return (
    <Layout>
      <span>할 얘기가 있다면 댓글을 남겨보세요</span>
      <Comment>
        {!isGuest && (
          <MyCommnet>
            <ProfileIcon user={userInfo && userInfo} size="xs" />
            <MyText
              ref={textareaRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="댓글 달기..."
            />
            <SubmitBtn focus={value !== ""} onClick={onSubmit}>
              등록
            </SubmitBtn>
          </MyCommnet>
        )}
      </Comment>
    </Layout>
  );
}

const Layout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  margin-top: 20px;
  margin-bottom: 20px;
  > span:first-child {
    margin-right: auto;
    font-weight: 700;
    text-align: start;
    > span {
      color: var(--color-mint);
    }
  }
`;

const Comment = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
`;

const MyCommnet = styled.div`
  display: flex;
  align-items: center;
  padding-right: 12px;
  width: 100%;
  margin-top: 20px;
`;
const MyText = styled.textarea`
  margin-left: 12px;
  flex: 1;
  background-color: inherit;
  height: 21px;
  :focus {
    outline: none;
    caret-color: var(--color-mint);
  }
  ::placeholder {
    font-size: 12px;
  }
`;

const SubmitBtn = styled.button<{ focus: boolean }>`
  margin-left: auto;
  font-size: 12px;
  color: ${(props) => (props.focus ? "var(--color-mint)" : "var(--font-h4)")};
`;

export default GatherComments;
