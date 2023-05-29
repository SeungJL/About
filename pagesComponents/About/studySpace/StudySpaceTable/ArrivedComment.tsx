import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";

import { IAttendence } from "../../../../types/studyDetails";
import { IUser } from "../../../../types/user";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { studyDateState, voteDateState } from "../../../../recoil/studyAtoms";
import { useAbsentDataQuery } from "../../../../hooks/vote/queries";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import dayjs from "dayjs";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useArrivedMutation } from "../../../../hooks/vote/mutations";
import { useEffect, useState } from "react";
import ModalPortal from "../../../../components/ModalPortal";
import ChangeArrivedMemoModal from "../../../../modals/study/ChangeArrivedMemoModal";
import { useSession } from "next-auth/react";
import ProfileIconMd from "../../../../components/common/Profile/ProfileIconMd";
import ProfileIconLg from "../../../../components/common/Profile/ProfileIconLg";
import { beforePageState } from "../../../../recoil/interactionAtoms";

function ArrivedComment({ attendances }: { attendances: IAttendence[] }) {
  const router = useRouter();
  const { data: session } = useSession();

  const voteDate = dayjs(router.query.date as string);
  const studyDate = useRecoilValue(studyDateState);
  const setBeforePage = useSetRecoilState(beforePageState);

  const { data: absentData } = useAbsentDataQuery(voteDate);

  const [isChangeModal, setIsChangeModal] = useState(false);
  const [user, setUser] = useState<IAttendence>();

  const onClickWriteBtn = (user: IAttendence) => {
    setUser(user);
    setIsChangeModal(true);
  };

  const onClickUser = (uid: string) => {
    console.log(uid);
    router.push(`/profile/${uid}}`);
    setBeforePage(router?.asPath);
  };

  const onClickEdit = (event) => {
    event.stopPropagation();
    onClickWriteBtn(user);
  };

  return (
    <>
      <Layout>
        {attendances?.map((user, idx) => {
          if (studyDate !== "not passed" && !user?.firstChoice) return null;
          const arrivedTime = user?.arrived
            ? new Date(user.arrived)
            : new Date(2023, 1, 1, 21, 0, 0);

          //임의로 체크로 해놨음. 나중에 방지 대책 필요.

          arrivedTime.setHours(arrivedTime.getHours() - 9);
          const arrivedHM = arrivedTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });
          const userI = user?.user as IUser;
          return (
            <Block key={idx} onClick={() => onClickUser(userI.uid)}>
              <ProfileIconLg user={userI} />
              <BlockInfo>
                <Info>
                  <span>{(user.user as IUser).name}</span>
                  <div>
                    {user.memo}
                    {user.memo && userI.uid === session?.uid && (
                      <span>
                        &nbsp;
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          color="var(--font-h1)"
                          onClick={onClickEdit}
                        />
                      </span>
                    )}
                  </div>
                </Info>
                {user.arrived || studyDate === "passed" ? (
                  <Check isCheck={true}>
                    <FontAwesomeIcon icon={faCircleCheck} size="xl" />
                    <span>{arrivedHM}</span>
                  </Check>
                ) : studyDate !== "not passed" &&
                  absentData?.find((who) => who.uid === userI?.uid) ? (
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
