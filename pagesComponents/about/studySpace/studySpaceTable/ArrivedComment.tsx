import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/pro-regular-svg-icons";
import { faPenToSquare } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import { MouseEvent, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import ModalPortal from "../../../../components/common/ModalPortal";
import ProfileIcon from "../../../../components/common/Profile/ProfileIcon";
import { useStudyAbsentQuery } from "../../../../hooks/study/queries";
import StudyChangeArrivedModal from "../../../../modals/study/StudyChangeArrivedModal";
import { prevPageUrlState } from "../../../../recoil/previousAtoms";
import { studyDateState } from "../../../../recoil/studyAtoms";
import { transferUserDataState } from "../../../../recoil/transferDataAtoms";
import { IAttendance } from "../../../../types/study/study";
import { IUser } from "../../../../types/user/user";

interface IArrivedComment {
  attendances: IAttendance[];
}

function ArrivedComment({ attendances }: IArrivedComment) {
  const router = useRouter();
  const { data: session } = useSession();
  const voteDate = dayjs(router.query.date as string);

  const studyDate = useRecoilValue(studyDateState);
  const setBeforePage = useSetRecoilState(prevPageUrlState);
  const setUserData = useSetRecoilState(transferUserDataState);

  const [isChangeModal, setIsChangeModal] = useState(false);
  const [user, setUser] = useState<IAttendance>();

  const { data: absentData, refetch } = useStudyAbsentQuery(voteDate);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attendances]);

  const onClickUser = (user: IUser) => {
    setUserData(user);
    router.push(`/profile/${user.uid}}`);
    setBeforePage(router?.asPath);
  };

  const onClickEdit = (event: MouseEvent<SVGSVGElement>, att: IAttendance) => {
    event.stopPropagation();
    setUser(att);
    setIsChangeModal(true);
  };

  return (
    <>
      <Layout key={router.asPath}>
        {attendances?.map((att, idx) => {
          if (studyDate !== "not passed" && !att?.firstChoice) return null;
          const arrivedTime = att?.arrived
            ? new Date(att.arrived)
            : new Date(2023, 1, 1, 21, 0, 0);
          arrivedTime.setHours(arrivedTime.getHours() - 9);
          const arrivedHM = arrivedTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });
          const user = att.user;

          const isAbsent = absentData?.find((who) => who?.uid === user?.uid);
          return (
            <Block key={idx} onClick={() => onClickUser(user)}>
              <ProfileIcon user={user} size="md" />
              <BlockInfo>
                <Info>
                  <span>{user.name}</span>
                  <div>
                    {!isAbsent ? (
                      <Memo>
                        {att.memo}
                        {att.memo && user.uid === session?.uid && (
                          <EditIconWrapper>
                            <FontAwesomeIcon
                              icon={faPenToSquare}
                              color="var(--font-h1)"
                              onClick={(e) => onClickEdit(e, att)}
                            />
                          </EditIconWrapper>
                        )}
                      </Memo>
                    ) : (
                      <>
                        <FontAwesomeIcon
                          icon={faCircleXmark}
                          color="var(--color-red)"
                        />
                        &nbsp; -<Absent>{isAbsent?.message}</Absent>
                      </>
                    )}
                  </div>
                </Info>
                {att.arrived ? (
                  <Check isCheck={true}>
                    <FontAwesomeIcon icon={faCircleCheck} size="xl" />
                    <span>{arrivedHM}</span>
                  </Check>
                ) : studyDate !== "not passed" && isAbsent ? (
                  <Check isCheck={false}>
                    <FontAwesomeIcon icon={faCircleXmark} size="xl" />
                    <span>불참</span>
                  </Check>
                ) : null}
              </BlockInfo>
            </Block>
          );
        })}
      </Layout>
      {isChangeModal && (
        <ModalPortal setIsModal={setIsChangeModal}>
          <StudyChangeArrivedModal user={user} setIsModal={setIsChangeModal} />
        </ModalPortal>
      )}
    </>
  );
}
const Layout = styled.div`
  margin: 0 var(--margin-main);
  margin-top: var(--margin-max);
  display: flex;
  flex-direction: column;
`;
const Block = styled.div`
  height: 60px;
  margin-bottom: var(--margin-sub);
  display: flex;
  align-items: center;
`;

const BlockInfo = styled.div`
  height: 100%;
  display: flex;
  flex: 1;
  margin-left: var(--margin-sub);
`;

const Absent = styled.span`
  font-size: 12px;
  margin-left: var(--margin-min);
`;

const Memo = styled.span``;

const Check = styled.div<{ isCheck: boolean }>`
  margin-left: auto;
  width: 40px;
  display: flex;
  justify-content: end;
  flex-direction: column;
  align-items: center;
  color: ${(props) =>
    props.isCheck ? "var(--color-mint)" : "var(--color-red)"};
  > span {
    display: inline-block;
    margin-top: var(--margin-min);
    font-size: 11px;
    color: var(--font-h4);
  }
`;
const Info = styled.div`
  width: 80%;

  flex-direction: column;
  display: flex;
  justify-content: center;
  padding: var(--padding-min) 0;
  > span {
    font-weight: 600;
    font-size: 15px;
  }
  > div {
    font-size: 13px;
    margin-top: var(--margin-min);
    color: var(--font-h3);
    display: flex;
    align-items: center;
  }
`;

const EditIconWrapper = styled.span`
  margin-left: var(--margin-min);
`;

export default ArrivedComment;
