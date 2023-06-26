import { Button } from "@chakra-ui/react";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { SetStateAction, useState } from "react";
import styled from "styled-components";

interface ISearchLocation {
  location?: string;
  setLocation?: React.Dispatch<SetStateAction<string>>;
}

function SearchLocation({ location, setLocation }: ISearchLocation) {
  const [query, setQuery] = useState(location || "");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const apiUrl = "https://dapi.kakao.com/v2/local/search/keyword.json";
    const apiKey = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;

    try {
      const response = await axios.get(apiUrl, {
        headers: { Authorization: `KakaoAK ${apiKey}` },
        params: { query },
      });

      setResults(response.data.documents);
    } catch (error) {
      console.error("주소 검색에 실패했습니다.", error);
    }
  };

  const onClickItem = (name: string) => {
    setQuery(name);
    setResults([]);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setLocation && setLocation(value);
  };

  return (
    <Layout>
      <div>
        <Wrapper>
          <FontAwesomeIcon icon={faLocationDot} />
          <Input
            type="text"
            placeholder="장소를 입력해 주세요."
            value={query}
            onChange={onChange}
          />
        </Wrapper>
        <Button size="sm" onClick={handleSearch}>
          검색
        </Button>
      </div>
      <SearchContent isContent={results.length !== 0}>
        {results.length > 0 && (
          <ul>
            {results.map((result) => (
              <Item
                key={result.id}
                onClick={() => onClickItem(result.place_name)}
              >
                {result.place_name}
              </Item>
            ))}
          </ul>
        )}
      </SearchContent>
    </Layout>
  );
}
const Input = styled.input`
  height: 100%;
  width: 100%;
  margin-left: 4px;
  background-color: inherit;

  padding: 8px 1px;
  padding-left: 5px;
  ::placeholder {
    font-size: 13px;
  }
  :focus {
    outline: none;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  border-bottom: 1.5px solid var(--font-h5);
  padding-left: 1px;
  display: flex;
  align-items: center;
  width: 85%;
  margin-right: 8px;
`;

const SearchContent = styled.div<{ isContent: boolean }>`
  margin-top: 12px;
  height: ${(props) => (props.isContent ? "220px" : null)};
  padding-left: 12px;
  overflow: auto;
  border: ${(props) => (props.isContent ? "1px solid var(--font-h5)" : null)};
  border-radius: var(--border-radius);
  padding: 6px 8px;
`;

const Layout = styled.div`
  width: inherit;
  background-color: inherit;
  display: flex;
  flex-direction: column;
  > div:first-child {
    display: flex;
  }
`;

const Item = styled.div`
  color: var(--font-h2);
  padding: 5px 0;
`;

export default SearchLocation;
