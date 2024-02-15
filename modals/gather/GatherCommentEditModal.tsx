import { useRouter } from "next/router";
import { useState } from "react";
import { useQueryClient } from "react-query";
import styled from "styled-components";
import {
  ModalBody,
  ModalFooterTwo,
  ModalLayout
} from "../../components/modals/Modals";
import {
  GATHER_CONTENT,
  GROUP_STUDY_ALL
} from "../../constants/keys/queryKeys";
import { useResetQueryData } from "../../hooks/custom/CustomHooks";
import { useGatherCommentMutation } from "../../hooks/gather/mutations";
import { useGroupStudyCommentMutation } from "../../hooks/groupStudy/mutations";
import { IModal } from "../../types/reactTypes";

interface IGatherCommentEditModal extends IModal {
  commentText: string;
  commentId: string;
  type?: "groupStudy";
}

function GatherCommentEditModal({
  commentText,
  setIsModal,
  commentId,
  type,
}: IGatherCommentEditModal) {
  const router = useRouter();
  const gatherId = +router.query.id;
  const queryClient = useQueryClient();

  const [isFirst, setIsFirst] = useState(true);
  const [value, setValue] = useState(commentText);

  const resetQueryData = useResetQueryData();

  const { mutate: deleteCommentGroupStudy } = useGroupStudyCommentMutation(
    "delete",
    gatherId,
    {
      onSuccess() {
        resetQueryData([GROUP_STUDY_ALL]);
      },
    }
  );
  const { mutate: editCommentGroupStudy } = useGroupStudyCommentMutation(
    "patch",
    gatherId,
    {
      onSuccess() {
        resetQueryData([GROUP_STUDY_ALL]);
      },
    }
  );
  const { mutate: deleteComment } = useGatherCommentMutation(
    "delete",
    gatherId,
    {
      onSuccess() {
        resetQueryData([GATHER_CONTENT]);
      },
    }
  );
  const { mutate: editComment } = useGatherCommentMutation("patch", gatherId, {
    onSuccess() {
      resetQueryData([GATHER_CONTENT]);
    },
  });

  const onComplete = () => {
    setIsModal(false);
  };

  const onDelete = () => {
    if (type === "groupStudy") deleteCommentGroupStudy({ commentId });
    else deleteComment({ commentId });
    onComplete();
  };

  const onEdit = () => {
    if (type === "groupStudy")
      editCommentGroupStudy({ comment: value, commentId });
    else editComment({ comment: value, commentId });
    onComplete();
  };

  return (
    <>
      <ModalLayout
        onClose={() => setIsModal(false)}
        size={isFirst ? "xs" : "sm"}
      >
        <ModalBody>
          <Container>
            {isFirst ? (
              <>
                <button onClick={() => setIsFirst(false)}>수정하기</button>
                <button onClick={onDelete}>삭제하기</button>
              </>
            ) : (
              <>
                <Input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </>
            )}
          </Container>
        </ModalBody>
        {!isFirst && (
          <ModalFooterTwo
            leftText="취소"
            rightText="변경"
            onClickLeft={() => setIsModal(false)}
            onClickRight={onEdit}
          />
        )}
      </ModalLayout>
    </>
  );
}

const Container = styled.div`
  height: 100%;
  margin-bottom: var(--gap-4);
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  align-items: flex-start;
  > button {
    :focus {
      outline: none;
    }
  }
`;

const Input = styled.input`
  margin-top: var(--gap-2);
  padding: var(--gap-2);
  width: 100%;
  border: var(--border);
  border-radius: var(--rounded-lg);
  font-size: 12px;
  :focus {
    outline: none;
    border: 2px solid var(--color-mint);
  }
`;

export default GatherCommentEditModal;
