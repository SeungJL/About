import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { PopUpLayout } from "../../components/common/modal/Modals";
import {
  useGatherCommentDeleteMutation,
  useGatherCommentEditMutation,
} from "../../hooks/gather/mutations";
import { IModal, IRefetch } from "../../types/reactTypes";

interface IGatherCommentEditModal extends IModal, IRefetch {
  commentText: string;
  commentId: string;
}

function GatherCommentEditModal({
  commentText,
  setIsModal,
  commentId,
  setIsRefetch,
}: IGatherCommentEditModal) {
  const router = useRouter();
  const gatherId = +router.query.id;

  const [isFirst, setIsFirst] = useState(true);
  const [value, setValue] = useState(commentText);

  const { mutate: deleteComment } = useGatherCommentDeleteMutation(gatherId);
  const { mutate: editComment } = useGatherCommentEditMutation(gatherId);

  const onComplete = () => {
    setIsRefetch(true);
    setIsModal(false);
  };

  const onDelete = () => {
    deleteComment(commentId);
    onComplete();
  };

  const onEdit = () => {
    editComment([commentId, value]);
    onComplete();
  };

  return (
    <>
      <PopUpLayout size="xs">
        <Container>
          {isFirst ? (
            <>
              <button onClick={() => setIsFirst(false)}>수정하기</button>
              <button onClick={onDelete}>삭제하기</button>
            </>
          ) : (
            <>
              <Input value={value} onChange={(e) => setValue(e.target.value)} />
              <Footer>
                <button onClick={() => setIsModal(false)}>취소</button>
                <button onClick={onEdit}>변경</button>
              </Footer>
            </>
          )}
        </Container>
      </PopUpLayout>
    </>
  );
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
`;

const Input = styled.input`
  margin-top: var(--margin-md);
  padding: var(--padding-md);
  width: 100%;
  border: var(--border-main-light);
  border-radius: var(--border-radius-sub);
  font-size: 12px;
  :focus {
    outline: none;
    border: 2px solid var(--color-mint);
  }
`;

const Footer = styled.footer`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
  font-size: 13px;
  > button:first-child {
    color: var(--font-h2);
    margin-right: var(--margin-main);
  }
  > button:last-child {
    color: var(--color-mint);
    margin-right: var(--margin-min);
    font-weight: 600;
  }
`;

export default GatherCommentEditModal;
