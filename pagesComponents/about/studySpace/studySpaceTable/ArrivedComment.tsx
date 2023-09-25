import {
  faCircleCheck,
  faCircleHeart,
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
import ProfileIcon from "../../../../components/common/user/Profile/ProfileIcon";
import ModalPortal from "../../../../components/modals/ModalPortal";
import { useStudyAbsentQuery } from "../../../../hooks/study/queries";
import StudyChangeArrivedModal from "../../../../modals/study/StudyChangeArrivedModal";
import { prevPageUrlState } from "../../../../recoil/previousAtoms";
import { studyDateStatusState } from "../../../../recoil/studyAtoms";
import { transferUserDataState } from "../../../../recoil/transferDataAtoms";
import { IAttendance } from "../../../../types/study/studyDetail";
import { IUser } from "../../../../types/user/user";

interface IArrivedComment {
  attendances: IAttendance[];
}

function ArrivedComment({ attendances }: IArrivedComment) {
  const router = useRouter();
  const { data: session } = useSession();
  const voteDate = dayjs(router.query.date as string);

  const studyDateStatus = useRecoilValue(studyDateStatusState);
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
    setBeforePage(router?.asPath);
    router.push(`/profile/${user.uid}}`);
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
          if (studyDateStatus !== "not passed" && !att?.firstChoice)
            return null;
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

          const absentArr = absentData?.filter((who) => who?.uid === user?.uid);
          const isAbsent =
            absentArr?.length >= 1 && absentArr[absentArr.length - 1];
          return (
            <Block key={idx} onClick={() => onClickUser(user)}>
              <ProfileIcon user={user} size="md" />
              <BlockInfo>
                <Info>
                  <NameContainer>
                    <span>{user.name}</span>
                    <HeartWrapper>
                      <FontAwesomeIcon
                        icon={faCircleHeart}
                        color="var(--color-red)"
                        flip="horizontal"
                        style={{ animationDuration: "2s" }}
                      />
                    </HeartWrapper>
                  </NameContainer>
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
                ) : studyDateStatus !== "not passed" && isAbsent ? (
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

const NameContainer = styled.div`
  display: flex;
  align-items: center;
  > span:first-child {
    color: var(--font-h1);
    font-weight: 600;
    font-size: 15px;
    margin-right: var(--margin-min);
  }
`;

const HeartWrapper = styled.div`
  margin-bottom: 3px;
  display: flex;
  align-items: center;
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
