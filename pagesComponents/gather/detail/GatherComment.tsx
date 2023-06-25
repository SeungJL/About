import { useRouter } from "next/dist/client/router";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ProfileIcon from "../../../components/common/Profile/ProfileIcon";
import { useGatherCommentMutation } from "../../../hooks/gather/mutations";
import { useUserInfoQuery } from "../../../hooks/user/queries";
export interface IGatherComment {
  gatherId: string;
  comment: string;
}

function GatherComments() {
  const router = useRouter();
  const gatherId = router.query.id as string;
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
    const data: IGatherComment = { gatherId, comment: value };
    writeComment(data);
  };
  return (
    <Layout>
      <span>할 얘기가 있다면 댓글을 남겨보세요</span>
      <Comment>
        <MyCommnet>
          <ProfileIcon user={userInfo && userInfo} size="xs" />
          <MyText
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="댓글 달기..."
          />
          <SubmitBtn onClick={onSubmit}>등록</SubmitBtn>
        </MyCommnet>
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

const SubmitBtn = styled.button`
  margin-left: auto;
  font-size: 12px;
  color: var(--font-h3);
`;

export default GatherComments;
