import { useRouter } from "next/router";
import { SetStateAction, useState } from "react";
import styled from "styled-components";
import {
  useGatherCommentDeleteMutation,
  useGatherCommentEditMutation,
} from "../../hooks/gather/mutations";
import { Modal2Xs } from "../../styles/layout/modal";

interface IGatherCommentEditModal {
  commentText: string;
  commentId: string;
  setIsRefetching: React.Dispatch<SetStateAction<boolean>>;
  setIsModal: React.Dispatch<SetStateAction<boolean>>;
}

function GatherCommentEditModal({
  commentText,
  setIsModal,
  commentId,
  setIsRefetching,
}: IGatherCommentEditModal) {
  const router = useRouter();
  const gatherId = +router.query.id;

  const [isFirst, setIsFirst] = useState(true);

  const [value, setValue] = useState(commentText);

  const { mutate: deleteComment } = useGatherCommentDeleteMutation(gatherId);
  const { mutate: editComment } = useGatherCommentEditMutation(gatherId);

  const onDelete = () => {
    deleteComment(commentId);
    setIsRefetching(true);
    setIsModal(false);
  };
  const onEdit = () => {
    editComment([commentId, value]);
    setIsRefetching(true);
    setIsModal(false);
  };

  return (
    <>
      {isFirst ? (
        <Layout>
          <button onClick={() => setIsFirst(false)}>수정하기</button>
          <button onClick={onDelete}>삭제하기</button>
        </Layout>
      ) : (
        <Layout>
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
          <Footer>
            <button onClick={() => setIsModal(false)}>취소</button>
            <button onClick={onEdit}>변경</button>
          </Footer>
        </Layout>
      )}
    </>
  );
}

const Layout = styled(Modal2Xs)`
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
`;

const Input = styled.input`
  margin-top: 8px;
  padding: 8px;
  width: 100%;
  border: var(--border-main);
  border-radius: var(--border-radius);
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
    margin-right: 16px;
  }
  > button:last-child {
    color: var(--color-mint);
    margin-right: 3px;
    font-weight: 600;
  }
`;

export default GatherCommentEditModal;
