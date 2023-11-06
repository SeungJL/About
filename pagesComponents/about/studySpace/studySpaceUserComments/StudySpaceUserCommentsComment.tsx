import { faCircleXmark } from "@fortawesome/pro-regular-svg-icons";
import { faPenToSquare } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { MouseEvent, useState } from "react";
import styled from "styled-components";
import StudyChangeArrivedModal from "../../../../modals/study/StudyChangeArrivedModal";
import { IAbsentInfo } from "../../../../types/study/study";
import { IAttendance } from "../../../../types/study/studyDetail";

interface IStudySpaceUserCommentsComment {
  isAbsent: IAbsentInfo;
  memo: string;
  att: IAttendance;
  isPrivate: boolean;
}

function StudySpaceUserCommentsComment({
  isAbsent,
  memo,
  att,
  isPrivate,
}: IStudySpaceUserCommentsComment) {
  const { data: session } = useSession();

  const [user, setUser] = useState<IAttendance>();
  const [isChangeModal, setIsChangeModal] = useState(false);

  const isMine = att.user.uid === session?.uid;

  const onClickEdit = (event: MouseEvent<SVGSVGElement>, att: IAttendance) => {
    event.stopPropagation();
    setUser(att);
    setIsChangeModal(true);
  };
  console.log(memo);
  return (
    <>
      <Layout>
        {!isAbsent || att?.arrived ? (
          <Memo>
            {isPrivate && <SpaceName>스터디 장소:</SpaceName>}
            <span>{memo}</span>
            {memo && isMine && !isPrivate && (
              <EditIconWrapper>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  color="var(--font-h2)"
                  size="sm"
                  onClick={(e) => onClickEdit(e, att)}
                />
              </EditIconWrapper>
            )}
          </Memo>
        ) : (
          <>
            <FontAwesomeIcon icon={faCircleXmark} color="var(--color-red)" />
            &nbsp;
            {!isPrivate ? (
              <Absent>-{isAbsent?.message}</Absent>
            ) : (
              <Absent>{memo}</Absent>
            )}
          </>
        )}
      </Layout>
      {isChangeModal && (
        <StudyChangeArrivedModal user={user} setIsModal={setIsChangeModal} />
      )}
    </>
  );
}

const Layout = styled.div``;

const SpaceName = styled.span`
  color: var(--color-mint);
  font-weight: 600;
  margin-right: var(--margin-md);
`;

const Memo = styled.span`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
const EditIconWrapper = styled.span`
  margin-left: var(--margin-md);
`;
const Absent = styled.span`
  font-size: 12px;
  margin-left: var(--margin-min);
`;
export default StudySpaceUserCommentsComment;
