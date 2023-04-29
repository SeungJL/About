import { Box, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/layouts/Header";
import { useAdminUsersControlQuery } from "../../hooks/admin/quries";
import { IUser } from "../../types/user";

export default function Admin() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [admins, setAdmins] = useState<IUser[]>([]);
  const [members, setMembers] = useState<IUser[]>([]);
  const [filtered, setFiltered] = useState<IUser[]>([]);

  useEffect(() => {
    axios.get("/api/admin/user").then(({ data }) => setUsers(data));
  }, []);

  useAdminUsersControlQuery({
    onSuccess(data) {
      const tempAdmins = [];
      const tempMembers = [];
      data.forEach((user) => {
        if (user.role === "previliged") tempAdmins.push(user);
        if (user.role === "member") tempMembers.push(user);
      });
      setAdmins(tempAdmins);
      setMembers(tempMembers);
      setFiltered(tempMembers);
    },
  });

  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (!value.length) setMembers(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onClickBtn = () => {
    const temp = members.filter((who) => who.name.includes(value));
    setFiltered(members);
    setMembers(temp);
  };

  return (
    <>
      <Header title="유저 관리" url="/admin" />
      <Layout>
        <Section>
          <SectionHeader>관리자</SectionHeader>
          {admins.map((user, idx) => (
            <UserSection key={idx} user={user} />
          ))}
        </Section>
        <Section>
          <SectionHeader>멤버</SectionHeader>
          <Search>
            <SearchInput
              placeholder="유저 검색"
              value={value}
              onChange={onChange}
            />
            <button onClick={onClickBtn}>검색</button>
          </Search>
          {members.map((user, idx) => (
            <UserSection key={idx} user={user} />
          ))}
        </Section>
      </Layout>
    </>
  );
}

const Search = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 12px;
  > button {
    font-weight: 600;
  }
`;
const SearchInput = styled.input`
  background-color: var(--font-h6);
  margin-right: 6px;
`;
const Layout = styled.div`
  padding: 14px 0;
`;

const SectionHeader = styled.header`
  height: 32px;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  background-color: var(--font-h6);
`;

const Section = styled.section`
  width: 100%;
  padding: 14px;
  display: flex;
  flex-direction: column;
`;

const UserSection = ({ user }: { user: IUser }) => {
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
    <SectionItem>
      <Item>{user.name}</Item>
      <Select
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
        onBlur={(e) => onScoreChanged(e.target.value, user)}
        defaultValue={user.score}
      />

      <Input
        onBlur={(e) => onPointChanged(e.target.value, user)}
        defaultValue={user.point}
        style={{ borderRight: "none" }}
      />
    </SectionItem>
  );
};

const SectionItem = styled.div`
  width: 100%;
  display: flex;
  height: 28px;
`;

const Item = styled.div`
  text-align: center;
  width: 70px;
  border-right: 1px solid black;
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