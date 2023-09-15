import { faPenToSquare } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { useFailToast } from "../../../hooks/CustomToast";
import { useUserInfoMutation } from "../../../hooks/user/mutations";
import { useUserInfoQuery } from "../../../hooks/user/queries";
import { isGuestState } from "../../../recoil/userAtoms";

function UserOverviewComment() {
  const failToast = useFailToast();
  const isGuest = useRecoilValue(isGuestState);
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState("");

  const { data: userInfo, isLoading } = useUserInfoQuery();
  const { mutate: updateUserInfo } = useUserInfoMutation();

  useEffect(() => {
    if (isLoading) return;
    setValue(userInfo?.comment || "안녕하세요! 잘 부탁드려요~ ㅎㅎ");
  }, [isLoading, userInfo]);

  const handleWrite = () => {
    if (isGuest) {
      failToast("guest");
      return;
    }
    const input = inputRef.current;
    input.disabled = false;
    input.focus();
  };
  const onWrite = () => {
    const text = inputRef.current.value;
    setValue(text);
  };
  const handleSubmit = () => {
    updateUserInfo({ ...userInfo, comment: value });
  };
  return (
    <Layout>
      <span>Comment</span>
      <div>
        <Message
          value={value}
          disabled={true}
          ref={inputRef}
          type="text"
          onBlur={handleSubmit}
          onChange={onWrite}
        />
        <span onClick={handleWrite}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </span>
      </div>
    </Layout>
  );
}

const Layout = styled.div`
  padding: 2px var(--padding-md);
  font-size: 12px;
  font-weight: 600;
  flex: 1;
  border: var(--border-sub);
  border-radius: var(--border-radius-sub);
  display: flex;
  flex-direction: column;
  > div {
    flex: 1;
    display: flex;
    align-items: center;
  }
`;

const Message = styled.input`
  width: 100%;
  color: var(--font-h2);
  background-color: inherit;
  font-size: 12px;
  margin-right: var(--margin-md);
`;

export default UserOverviewComment;
