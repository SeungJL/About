import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import { MouseEvent, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ModalPortal from "../../../../components/ModalPortal";
import { useAbsentDataQuery } from "../../../../hooks/vote/queries";
import ChangeArrivedMemoModal from "../../../../modals/study/ChangeArrivedMemoModal";
import { studyDateState } from "../../../../recoil/studyAtoms";
import { IAttendance } from "../../../../types/studyDetails";
import { IUser } from "../../../../types/user";

import ProfileIcon from "../../../../components/common/Profile/ProfileIcon";
import {
  beforePageState,
  userDataState,
} from "../../../../recoil/interactionAtoms";

function ArrivedComment({ attendances }: { attendances: IAttendance[] }) {
  const router = useRouter();
  const { data: session } = useSession();

  const voteDate = dayjs(router.query.date as string);
  const studyDate = useRecoilValue(studyDateState);
  const setBeforePage = useSetRecoilState(beforePageState);
  const setUserData = useSetRecoilState(userDataState);

  const { data: absentData } = useAbsentDataQuery(voteDate);

  const [isChangeModal, setIsChangeModal] = useState(false);
  const [user, setUser] = useState<IAttendance>();

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

          //임의로 체크로 해놨음. 나중에 방지 대책 필요.

          arrivedTime.setHours(arrivedTime.getHours() - 9);
          const arrivedHM = arrivedTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });
          const user = att.user;
          return (
            <Block key={idx} onClick={() => onClickUser(user)}>
              <ProfileIcon user={user} size="md" />
              <BlockInfo>
                <Info>
                  <span>{user.name}</span>
                  <div>
                    {att.memo}
                    {att.memo && user.uid === session?.uid && (
                      <span>
                        &nbsp;
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          color="var(--font-h1)"
                          onClick={(e) => onClickEdit(e, att)}
                        />
                      </span>
                    )}
                  </div>
                </Info>
                {att.arrived || studyDate === "passed" ? (
                  <Check isCheck={true}>
                    <FontAwesomeIcon icon={faCircleCheck} size="xl" />
                    <span>{arrivedHM}</span>
                  </Check>
                ) : studyDate !== "not passed" &&
                  absentData?.find((who) => who.uid === user?.uid) ? (
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
          <ChangeArrivedMemoModal user={user} setIsModal={setIsChangeModal} />
        </ModalPortal>
      )}
    </>
  );
}
const Layout = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
`;
const Block = styled.div`
  height: 60px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
`;

const BlockInfo = styled.div`
  height: 100%;
  display: flex;
  flex: 1;
  margin-left: 12px;
`;

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
    margin-top: 4px;
    font-size: 11px;
    color: var(--font-h4);
  }
`;
const Info = styled.div`
  width: 80%;

  flex-direction: column;
  display: flex;
  justify-content: center;
  padding: 4px 0;
  > span {
    font-weight: 600;
    font-size: 15px;
  }
  > div {
    font-size: 13px;
    margin-top: 2px;
    color: var(--font-h3);
  }
`;

export default ArrivedComment;
