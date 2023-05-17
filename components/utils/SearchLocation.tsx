import { Button } from "@chakra-ui/react";
import { faLocation, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

function SearchLocation() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const apiUrl = "https://dapi.kakao.com/v2/local/search/keyword.json";
    const apiKey = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
    console.log(apiKey);

    try {
      const response = await axios.get(apiUrl, {
        headers: { Authorization: `KakaoAK ${apiKey}` },
        params: { query },
      });
      console.log(response);
      setResults(response.data.documents);
    } catch (error) {
      console.error("주소 검색에 실패했습니다.", error);
    }
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
            onChange={(e) => setQuery(e.target.value)}
          />
        </Wrapper>
        <Button size="sm" onClick={handleSearch}>
          검색
        </Button>
      </div>
      <SearchContent>
        {results.length > 0 && (
          <ul>
            {results.map((result) => (
              <li key={result.id}>{result.place_name}</li>
            ))}
          </ul>
        )}
      </SearchContent>
    </Layout>
  );
}
const Input = styled.input`
  height: 100%;
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

const SearchContent = styled.div`
  margin-top: 12px;
  height: 200px;
  padding-left: 12px;
  overflow: auto;
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

export default SearchLocation;
