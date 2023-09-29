import { faCircleXmark } from "@fortawesome/pro-regular-svg-icons";
import { faPenToSquare } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { MouseEvent, useState } from "react";
import styled from "styled-components";
import ModalPortal from "../../../../components/modals/ModalPortal";
import StudyChangeArrivedModal from "../../../../modals/study/StudyChangeArrivedModal";
import { IAbsentInfo } from "../../../../types/study/study";
import { IAttendance } from "../../../../types/study/studyDetail";

interface IStudySpaceUserCommentsComment {
  isAbsent: IAbsentInfo;
  memo: string;

  att: IAttendance;
}

function StudySpaceUserCommentsComment({
  isAbsent,
  memo,
  att,
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

  return (
    <>
      <Layout>
        {!isAbsent ? (
          <Memo>
            <span>{memo}</span>
            {memo && isMine && (
              <EditIconWrapper>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  color="var(--font-h1)"
                  size="sm"
                  onClick={(e) => onClickEdit(e, att)}
                />
              </EditIconWrapper>
            )}
          </Memo>
        ) : (
          <>
            <FontAwesomeIcon icon={faCircleXmark} color="var(--color-red)" />
            &nbsp; -<Absent>{isAbsent?.message}</Absent>
          </>
        )}
      </Layout>
      {isChangeModal && (
        <ModalPortal setIsModal={setIsChangeModal}>
          <StudyChangeArrivedModal user={user} setIsModal={setIsChangeModal} />
        </ModalPortal>
      )}
    </>
  );
}

const Layout = styled.div``;
const Memo = styled.span`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
const EditIconWrapper = styled.span`
  margin-left: var(--margin-min);
`;
const Absent = styled.span`
  font-size: 12px;
  margin-left: var(--margin-min);
`;
export default StudySpaceUserCommentsComment;
