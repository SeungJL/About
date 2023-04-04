import { Box, Flex, Input, Select, Text } from "@chakra-ui/react";
import axios from "axios";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { isPreviliged } from "../../libs/utils/authUtils";
import { User } from "../../models/user";
import { IUser } from "../../types/user";

export default function Admin() {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    axios.get("/api/admin/user").then(({ data }) => setUsers(data));
  }, []);

  const updateProfile = (profile) => {
    axios.post("/api/admin/user", { profile });
  };

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

  return (
    <Box>
      <Flex w="100%" justify="space-between" align="center">
        <Text flex="1" textAlign="center">
          이름
        </Text>
        <Text flex="1.1" textAlign="center">
          역할
        </Text>
        <Text flex="1" textAlign="center">
          활동
        </Text>
        <Text flex="0.8" textAlign="center">
          점수
        </Text>
        <Text flex="0.8" textAlign="center">
          포인트
        </Text>
      </Flex>
      {users.map((user) => (
        <Flex key={user.uid} w="100%" justify="space-between" align="center">
          <Text flex="1" textAlign="center">
            {user.name}
          </Text>
          <Select
            flex="1.1"
            defaultValue={user.role}
            m="0 5px"
            onChange={(e) => onRoleChanged(e.target.value, user)}
          >
            <option value="member">member</option>
            <option value="previliged">previliged</option>
          </Select>
          <Select
            onChange={(e) => onActiveChanged(e.target.value, user)}
            flex="1"
            defaultValue={user.isActive.toString()}
            m="0 5px"
          >
            <option value="true">true</option>
            <option value="false">false</option>
          </Select>
          <Input
            onBlur={(e) => onScoreChanged(e.target.value, user)}
            flex="0.5"
            textAlign="center"
            defaultValue={user.score}
          />
          <Input
            onBlur={(e) => onPointChanged(e.target.value, user)}
            flex="0.5"
            textAlign="center"
            defaultValue={user.point}
          />
        </Flex>
      ))}
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  const user = await User.findOne({ uid: session.uid });
  if (!user.role) {
    return {
      redirect: {
        permanent: false,
        destination: "/about",
      },
    };
  }
  if (user && !isPreviliged(user.role as string)) {
    return {
      redirect: {
        permanent: false,
        destination: "/forbidden",
      },
    };
  }
  return {
    props: {},
  };
};
