import {
  faArrowLeft,
  faBell,
  faFilter,
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { sortUserList } from "../../../libs/utils/membersUtil";
import {
  categoryState
} from "../../../recoil/membersAtoms";

import { GetServerSideProps } from "next";
import safeJsonStringify from "safe-json-stringify";
import dbConnect from "../../../libs/dbConnect";
import { User } from "../../../models/user";
import CategoryFilter from "../../../pagesComponents/Members/CategoryFilter";
import UserBlock from "../../../pagesComponents/Members/UserBlock";
import { IUser } from "../../../types/user";
const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  padding: 0 15px;
  height: 45px;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  > span {
    font-size: 1.4em;
    text-align: center;
  }
`;

const Navigation = styled.nav`
  margin-bottom: 3vh;
`;
const NavigationHeader = styled.header`
  color: rgb(0, 0, 0, 0.7);
  height: 45px;
  display: flex;
  justify-content: space-between;
  padding: 12px;
  background-color: rgb(0, 0, 0, 0.2);
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  > span {
    margin-left: 10px;
  }
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  > span {
    margin-right: 10px;
  }
`;

const FilterNav = styled(motion.nav)`
  background-color: rgb(0, 0, 0, 0.1);
`;

const TitleHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  > span {
    font-size: 1.4em;
  }
`;

const UserRankBtn = styled.button`
  width: 40px;
  height: 30px;
`;

const MembersMain = styled.main`
  padding: 10px;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, 80px);
  grid-auto-rows: 80px;
`;

const SearchInput = styled(motion.input)`
  width: 100px;
  transform-origin: right center;
  margin-right: 8px;
`;

export interface ICategory {
  name: string;
  status?: string;
}

function Members({ membersListAll }: { membersListAll: IUser[] }) {
  const membersList = membersListAll.filter((info) => info.isActive !== false);

  const [isNavOpend, setIsNavOpened] = useState(false);
  const [category, setCategory] = useRecoilState(categoryState);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [userList, setUserList] = useState<IUser[]>([]);

  const { data: session } = useSession();

  const onFilterClicked = () => {
    setIsNavOpened((isOpen) => !isOpen);
  };

  useEffect(() => {
    setUserList(membersList);
    setUserList((old) => sortUserList(old, category));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <Layout>
      <Header>
        <Link href={`/about`}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <span>Members</span>
      </Header>
      <Navigation>
        <NavigationHeader>
          <Filter onClick={onFilterClicked}>
            <FontAwesomeIcon icon={faFilter} />
            <span>filter</span>
          </Filter>
          <Search>
            <SearchInput
              placeholder="Search"
              animate={{ scaleX: isSearchOpen ? 1 : 0 }}
              transition={{ type: "linear" }}
            />

            <div onClick={() => setIsSearchOpen((isOpen) => !isOpen)}>
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </Search>
        </NavigationHeader>

        <FilterNav
          animate={{
            scaleY: isNavOpend ? 1 : 0,
            y: isNavOpend ? 0 : -40,
            height: isNavOpend ? 80 : 0,
          }}
          transition={{ type: "linear" }}
        >
          <CategoryFilter />
        </FilterNav>
      </Navigation>
      <TitleHeader>
        <span>스터디원 리스트</span>
        <UserRankBtn>
          <FontAwesomeIcon icon={faBell} />
        </UserRankBtn>
      </TitleHeader>

      <MembersMain>
        {userList?.map((user, idx) => (
          <UserBlock key={idx} userInfo={user} />
        ))}
      </MembersMain>
    </Layout>
  );
}
export default Members;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }

  await dbConnect();

  const user = await User.find();

  const membersListAll = JSON.parse(safeJsonStringify(user));

  return { props: { membersListAll } };
};
