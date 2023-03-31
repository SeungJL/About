import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { IAttendence } from "../../../../types/studyDetails";
import { IUser } from "../../../../types/user";
import UserImageIcon from "../../../../components/common/UserImageIcon";

function CheckComment({ attendances }: { attendances: IAttendence[] }) {
  return (
    <Layout>
      {attendances.map((user, idx) => (
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
                <span></span>
              </Check>
            )}
          </BlockInfo>
        </Block>
      ))}
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
const UserImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  border-radius: 17px;
  overflow: hidden;
  margin-right: 8px;
`;
const BlockInfo = styled.div`
  height: 100%;

  display: flex;
  flex: 1;
`;

const Check = styled.div`
  width: 40px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: var(--color-orange2);
`;
const Info = styled.div`
  width: 80%;

  flex-direction: column;
  display: flex;
  justify-content: space-around;
  padding: 8px 0;
  > span {
    font-weight: 600;
    font-size: 13px;
  }
  > div {
    font-size: 11px;
    color: var(--font-h3);
    overflow: hidden;
  }
`;

export default CheckComment;
