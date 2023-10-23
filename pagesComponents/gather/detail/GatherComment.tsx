import { faEllipsis } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import { SetStateAction, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ProfileIcon from "../../../components/common/user/Profile/ProfileIcon";
import { getDateDiff } from "../../../helpers/dateHelpers";
import { useGatherCommentMutation } from "../../../hooks/gather/mutations";
import { useUserInfoQuery } from "../../../hooks/user/queries";
import GatherCommentEditModal from "../../../modals/gather/GatherCommentEditModal";
import { IGatherComment } from "../../../types/page/gather";
export interface IGatherCommentUnit {
  gatherId: number;
  comment: string;
}

interface IGatherComments {
  comment: IGatherComment[];
  setIsRefetch: React.Dispatch<SetStateAction<boolean>>;
}

function GatherComments({ comment, setIsRefetch }: IGatherComments) {
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";
  const router = useRouter();
  const gatherId = +router.query.id;
  const { data: userInfo } = useUserInfoQuery();
  const [value, setValue] = useState("");

  const [isEditModal, setIsEditModal] = useState(false);

  const [commentText, setCommentText] = useState("");
  const [commentId, setCommentId] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);
  const { mutate: writeComment } = useGatherCommentMutation();
  const onSubmit = () => {
    const data: IGatherCommentUnit = { gatherId, comment: value };
    writeComment(data);
    setValue("");
    setIsRefetch(true);
  };

  const onClickEdit = (commentId, text) => {
    setCommentId(commentId);
    setCommentText(text);
    setIsEditModal(true);
  };

  return (
    <>
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
          <section>
            {comment?.map((item) => (
              <CommentBlock key={item._id}>
                <div>
                  <ProfileIcon user={item.user} size="xs" />
                </div>
                <CommentContent>
                  <Name>
                    <span>{item.user.name}</span>
                    <CommentDetail>
                      {item.user.location} ·{" "}
                      {getDateDiff(dayjs(item.updatedAt))}
                    </CommentDetail>
                  </Name>
                  <p>
                    {item.comment}
                    {item.user.uid === session?.uid && (
                      <IconWrapper
                        onClick={() => onClickEdit(item._id, item.comment)}
                      >
                        <FontAwesomeIcon icon={faEllipsis} />
                      </IconWrapper>
                    )}
                  </p>
                </CommentContent>
              </CommentBlock>
            ))}
          </section>
        </Comment>
      </Layout>
      {isEditModal && (
        <GatherCommentEditModal
          commentText={commentText}
          commentId={commentId}
          setIsRefetch={setIsRefetch}
          setIsModal={setIsEditModal}
        />
      )}
    </>
  );
}

const Layout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: var(--margin-max) 0;
  > span:first-child {
    margin-right: auto;
    font-weight: 700;
    text-align: start;
    > span {
      color: var(--color-mint);
    }
  }
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  > span:first-child {
    font-weight: 600;
    margin-right: var(--margin-min);
  }
`;

const IconWrapper = styled.span`
  margin-left: var(--margin-md);
`;

const Comment = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 13px;
`;

const MyCommnet = styled.div`
  display: flex;
  min-height: 60px;
  align-items: center;
  padding-right: var(--padding-sub);
  width: 100%;
  margin-top: 12px;
`;

const CommentBlock = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
`;

const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 68%;
  justify-content: space-around;
  margin-left: var(--margin-sub);

  font-size: 12px;

  > span:last-child {
    color: var(--font-h2);
  }
`;

const CommentDetail = styled.span`
  font-size: 10px;
  color: var(--font-h3);
`;

const MyText = styled.textarea`
  margin-left: var(--margin-sub);
  flex: 1;
  background-color: inherit;
  height: 21px;
  :focus {
    outline: none;
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
