import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

import UserImageIcon from "../../../../components/common/UserImageIcon";

import { IAttendence } from "../../../../types/studyDetails";
import { IUser } from "../../../../types/user";
import { useRecoilValue } from "recoil";
import { studyDateState } from "../../../../recoil/studyAtoms";

function CheckComment({ attendances }: { attendances: IAttendence[] }) {
  const studyDate = useRecoilValue(studyDateState);
  return (
    <Layout>
      {attendances.map((user, idx) => {
        if (studyDate !== "not passed" && !user?.firstChoice) return null;
        const arrivedTime = new Date(user.arrived);
        arrivedTime.setHours(arrivedTime.getHours() - 9);
        const arrivedHM = arrivedTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });

        return (
          <Block key={idx}>
            <UserImageIcon user={user.user as IUser} />
            <BlockInfo>
              <Info>
                <span>{(user.user as IUser).name}</span>
                <div>{user.memo}</div>
              </Info>
              {user.arrived && (
                <Check>
                  <FontAwesomeIcon icon={faCircleCheck} size="xl" />
                  <span>{arrivedHM}</span>
                </Check>
              )}
            </BlockInfo>
          </Block>
        );
      })}
    </Layout>
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

const Check = styled.div`
  margin-left: auto;
  width: 40px;
  display: flex;
  justify-content: end;
  flex-direction: column;
  align-items: center;
  color: var(--color-red);
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

export default CheckComment;
