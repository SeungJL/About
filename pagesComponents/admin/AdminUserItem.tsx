import { Button, useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { useUpdateProfileMutation } from "../../hooks/admin/mutation";
import { IUser } from "../../types/user";

export const AdminUserItem = ({ user }: { user: IUser }) => {
  const toast = useToast();

  const { mutate: updateProfile } = useUpdateProfileMutation({
    onSuccess() {
      toast({
        title: "변경 완료",
        // description: "개인 정보 보호를 위해 게스트에게는 허용되지 않습니다.",
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "bottom",
      });
    },
  });

  const onRoleChanged = (role: string, profile: IUser) => {
    const newProfile = { ...profile, role };

    updateProfile(newProfile);
  };
  const onActiveChanged = (active: string, profile: IUser) => {
    const isActive = JSON.parse(active);
    const newProfile = { ...profile, isActive };
    updateProfile(newProfile);
  };
  const onScoreChanged = (score, profile) => {
    if (isNaN(score)) {
      //숫자 아닌경우
      alert("올바른 값을 입력해주세요");
    } else {
      //숫자인경우
      const newProfile = { ...profile, score };
      updateProfile(newProfile);
    }
  };
  const onPointChanged = (point, profile) => {
    if (isNaN(point)) {
      //숫자 아닌경우
      alert("올바른 값을 입력해주세요");
    } else {
      //숫자인경우
      const newProfile = { ...profile, point };
      updateProfile(newProfile);
    }
  };

  const scoreRef = useRef(null);
  const pointRef = useRef(null);

  useEffect(() => {
    if (pointRef.current) {
      pointRef.current.value = user.point;
    }
    if (scoreRef.current) {
      scoreRef.current.value = user.score;
    }
  }, [user.point, user.score]);

  return (
    <Layout>
      <Summary>
        <div>
          <span>{user?.name}</span>
          <span> {user?.isActive ? "활동중" : "탈퇴"}</span>
        </div>
        <span>수원</span>
      </Summary>
      <Button
        color="white"
        backgroundColor="var(--color-mint)"
        size="sm"
        // onClick={() => onClick()}
      >
        상세내용
      </Button>

      {/* <Select
        defaultValue={user.role}
        onChange={(e) => onRoleChanged(e.target.value, user)}
      >
        <option value="member">M</option>
        <option value="previliged">P</option>
      </Select>
      <Select
        onChange={(e) => onActiveChanged(e.target.value, user)}
        defaultValue={user.isActive.toString()}
      >
        <option value="true">T</option>
        <option value="false">F</option>
      </Select>

      <Input
        ref={scoreRef}
        onBlur={(e) => onScoreChanged(e.target.value, user)}
        defaultValue={user.score}
      />

      <Input
        ref={pointRef}
        onBlur={(e) => onPointChanged(e.target.value, user)}
        defaultValue={user.point}
        style={{ borderRight: "none" }}
      /> */}
    </Layout>
  );
};
const Layout = styled.div`
  height: 72px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid var(--font-h5);
`;

const Summary = styled.div`
  flex: 1;
  padding: 0 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    display: flex;
    flex-direction: column;
    > span:first-child {
      font-weight: 600;
      font-size: 14px;
    }
    > span:last-child {
      font-size: 11px;
      color: var(--font-h3);
    }
  }
  > span {
    margin-right: 12px;
    font-size: 12px;
    font-weight: 600;
    color: var(--font-h2);
  }
`;

const Select = styled.select`
  background-color: inherit;
  width: 70px;
  text-align: center;
  border-right: 1px solid black;
`;

const Input = styled.input`
  width: 70px;
  text-align: center;
  border-right: 1px solid black;
  background-color: inherit;
`;
