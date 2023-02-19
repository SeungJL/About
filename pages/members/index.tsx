import { fa0, faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import CategoryFilter from "../../components/Members/CategoryFilter";

import UserBlock from "../../components/Members/UserBlock";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  > * {
    border: 1px solid black;
  }
`;

const Header = styled.header`
  height: 45px;
`;

const Navigation = styled.nav`
  margin-bottom: 5vh;
`;
const NavigationHeader = styled.header`
  color: rgb(0, 0, 0, 0.7);
  height: 45px;
  display: flex;
  justify-content: space-between;

  padding: 12px;
  background-color: pink;
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

const FilterNav = styled.nav`
  background-color: green;
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
  background-color: pink;
  width: 40px;
  height: 30px;
  border-radius: 10px;
`;

const MembersMain = styled.main`
  padding: 20px;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, 65px);
  grid-auto-rows: 60px;
`;

export interface ICategory {
  name: string;
  isSortUp?: boolean;
}

function Members() {
  const router = useRouter();
  const [isNavOpend, setIsNavOpened] = useState(false);
  const [category, setCategory] = useState<ICategory>({ name: "" });
  const onUserBlockClicked = () => {
    router.push(`/`);
  };

  const onFilterClicked = () => {
    setIsNavOpened((isOpen) => !isOpen);
  };
  return (
    <Layout>
      <Header></Header>
      <Navigation>
        <NavigationHeader>
          <Filter onClick={onFilterClicked}>
            <FontAwesomeIcon icon={faFilter} />
            <span>filter</span>
          </Filter>
          <Search>
            <span>search</span>
            <FontAwesomeIcon icon={faSearch} />
          </Search>
        </NavigationHeader>
        {isNavOpend && (
          <FilterNav>
            <CategoryFilter category={category} setCategory={setCategory} />
          </FilterNav>
        )}
      </Navigation>
      <TitleHeader>
        <span>스터디원 리스트</span>
        <UserRankBtn>Rank</UserRankBtn>
      </TitleHeader>
      <MembersMain>
        {userList.map((user, idx) => (
          <UserBlock
            key={idx}
            userInfo={user}
            onUserBlockClicke={onUserBlockClicked}
          />
        ))}
      </MembersMain>
    </Layout>
  );
}
export default Members;

const userList = [
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
  {
    name: "이승주",
    id: "1",
    age: 27,
    mbti: "ENTP",
    가입일: "2021-02-08",
    role: "회장",
  },
];
