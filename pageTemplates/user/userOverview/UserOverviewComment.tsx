import { faPenCircle } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { USER_INFO } from "../../../constants/keys/queryKeys";
import { useResetQueryData } from "../../../hooks/custom/CustomHooks";
import {
  useCompleteToast,
  useFailToast,
} from "../../../hooks/custom/CustomToast";
import { useUserInfoFieldMutation } from "../../../hooks/user/mutations";
import { useUserInfoQuery } from "../../../hooks/user/queries";
import { isGuestState } from "../../../recoil/userAtoms";

function UserOverviewComment() {
  const completeToast = useCompleteToast();
  const failToast = useFailToast();
  const isGuest = useRecoilValue(isGuestState);
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const resetQueryData = useResetQueryData();

  const { data: userInfo, isLoading } = useUserInfoQuery();
  const { mutate: setComment } = useUserInfoFieldMutation("comment", {
    onSuccess() {
      resetQueryData([USER_INFO]);
    },
  });

  useEffect(() => {
    if (isLoading) return;
    setValue(userInfo?.comment || "안녕하세요! 잘 부탁드려요~ ㅎㅎ");
  }, [isLoading, userInfo]);

  useEffect(() => {
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const input = inputRef.current;
    input.addEventListener("focus", handleFocus);
    input.addEventListener("blur", handleBlur);

    return () => {
      input.removeEventListener("focus", handleFocus);
      input.removeEventListener("blur", handleBlur);
    };
  }, []);

  const handleWrite = () => {
    if (isGuest) {
      failToast("guest");
      return;
    }
    const input = inputRef.current;
    input.focus();
  };
  const onWrite = () => {
    const text = inputRef.current.value;
    setValue(text);
  };

  const handleSubmit = () => {
    if (userInfo.comment === value) {
      return;
    }

    setComment({ comment: value });
  };

  const iconStyle: React.CSSProperties & {
    "--fa-secondary-color": string;
    "--fa-secondary-opacity": number;
  } = {
    "--fa-secondary-color": "white",
    "--fa-secondary-opacity": 1,
    border: isFocused ? "1px solid var(--gray-1)" : "1px solid var(--gray-6)",
    borderRadius: "50%",
  };

  return (
    <Layout onClick={handleWrite}>
      <Message
        value={value}
        ref={inputRef}
        type="text"
        onBlur={handleSubmit}
        onChange={onWrite}
      />
      <button>
        <FontAwesomeIcon
          icon={faPenCircle}
          size="lg"
          color={isFocused ? "var(--gray-1)" : "var(--gray-4)"}
          className="fa-swap-opacity"
          style={iconStyle}
        />
      </button>
    </Layout>
  );
}

const Layout = styled.div`
  padding: var(--gap-1) var(--gap-2);
  border: var(--border-light);
  border-radius: var(--rounded);
  display: flex;
  align-items: center;
`;

const Message = styled.input`
  flex: 1;
  color: var(--gray-1);
  background-color: inherit;
  margin-right: auto;
  :focus {
    outline: none;
  }
`;

export default UserOverviewComment;
