import {
  faCircleXmark,
  faPenToSquare,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { MouseEvent, useState } from "react";
import styled from "styled-components";
import StudyChangeArrivedModal from "../../../../modals/study/StudyChangeArrivedModal";
import { IAbsentInfo } from "../../../../types/study/study";
import { IAttendance } from "../../../../types/study/studyDetail";

interface IstudyUserCommentsComment {
  isAbsent: IAbsentInfo;
  memo: string;
  att: IAttendance;
  isPrivate: boolean;
}

function studyUserCommentsComment({
  isAbsent,
  memo,
  att,
  isPrivate,
}: IstudyUserCommentsComment) {
  const { data: session } = useSession();

  const [user, setUser] = useState<IAttendance>();
  const [isChangeModal, setIsChangeModal] = useState(false);

  const isMine = att.user.uid === session?.user?.uid;

  const onClickEdit = (event: MouseEvent<SVGSVGElement>, att: IAttendance) => {
    event.stopPropagation();
    setUser(att);
    setIsChangeModal(true);
  };

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
              <Absent>{isAbsent?.message}</Absent>
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

const Layout = styled.div`
  display: flex;
`;

const SpaceName = styled.span`
  color: var(--color-mint);
  font-weight: 600;
  margin-right: var(--margin-md);
`;

const Memo = styled.span`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;

  font-size: 13px;
`;
const EditIconWrapper = styled.span`
  margin-left: var(--margin-md);
`;

const Absent = styled.span`
  flex: 1;
  font-size: 13px;
  margin-left: var(--margin-min);
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
export default studyUserCommentsComment;
