import { Box, Flex, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { ChangeEvent, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Header from "../../components/layouts/Header";
import { useUpdateProfileMutation } from "../../hooks/admin/mutation";
import { useAdminUsersControlQuery } from "../../hooks/admin/quries";
import { AdminUserItem } from "../../pagesComponents/admin/AdminUserItem";
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
            <AdminUserItem key={idx} user={user} />
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
            <AdminUserItem key={idx} user={user} />
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
