import { Box, Flex, Input, Select, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { IUser } from "../../types/user";

export default function Admin() {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    axios.get("/api/admin/user").then(({ data }) => setUsers(data));
  }, []);

  const updateProfile = (profile) => {};

  const onRoleChanged = (role: string, profile: IUser) => {
    const newProfile = { ...profile, role };
  };
  const onActiveChanged = (active: string, profile: IUser) => {
    const isActive = JSON.parse(active);
    const newProfile = { ...profile, isActive };
  };
  const onScoreChanged = (score, profile) => {
    if (isNaN(score)) {
      //숫자 아닌경우
      alert("올바른 값을 입력해주세요");
    } else {
      //숫자인경우
      const newProfile = { ...profile, score };
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
        <Text flex="1" textAlign="center">
          점수
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
            flex="1"
            textAlign="center"
            defaultValue={user.score}
          />
        </Flex>
      ))}
    </Box>
  );
}
