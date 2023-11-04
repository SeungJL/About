import { Button } from "@chakra-ui/react";
import { faLocationDot } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { KeyboardEvent, useState } from "react";
import styled from "styled-components";
import { GatherLocation } from "../../../types/page/gather";
import { DispatchType } from "../../../types/reactTypes";

interface ISearchLocation {
  location?: string;
  setLocation?: DispatchType<GatherLocation>;
}

const API_URL = "https://dapi.kakao.com/v2/local/search/keyword.json";
const API_KEY = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;

function LocationSearch({ location, setLocation }: ISearchLocation) {
  const [value, setValue] = useState(location || "");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `KakaoAK ${API_KEY}` },
        params: { query: value },
      });

      setResults(response.data.documents);
    } catch (error) {
      console.error("주소 검색에 실패했습니다.", error);
    }
  };

  const onClickItem = (info: any) => {
    const placeName = info.place_name;
    setValue(placeName);
    setLocation({ main: placeName, sub: info.address_name });
    setResults([]);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
    setLocation((old) => ({ ...old, main: value }));
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const SearchColor = value === "" ? "blackAlpha" : "mintTheme";

  return (
    <Layout>
      <div>
        <Wrapper>
          <FontAwesomeIcon icon={faLocationDot} />
          <Input
            onKeyDown={handleKeyPress}
            type="search"
            placeholder="장소를 입력해 주세요."
            value={value}
            onChange={onChange}
          />
        </Wrapper>
        <SearchWrapper>
          <Button
            h="28px"
            size="sm"
            onClick={handleSearch}
            colorScheme={SearchColor}
          >
            검색
          </Button>
        </SearchWrapper>
      </div>
      <SearchContent isContent={results.length !== 0}>
        {results.length > 0 && (
          <>
            {results.map((result) => (
              <Item key={result.id} onClick={() => onClickItem(result)}>
                <span>{result.place_name}</span>
                <span>{result.place_name}</span>
              </Item>
            ))}
          </>
        )}
      </SearchContent>
    </Layout>
  );
}
const Layout = styled.div`
  width: inherit;
  background-color: inherit;
  display: flex;

  flex-direction: column;
  > div:first-child {
    display: flex;
  }
`;
const Input = styled.input`
  height: 100%;
  width: 100%;
  margin-left: var(--margin-min);
  background-color: inherit;
  padding: var(--padding-md) 0;
  padding-left: var(--padding-min);
  ::placeholder {
    font-size: 13px;
  }
  :focus {
    outline: none;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  border-bottom: var(--border-main);
  padding-left: var(--padding-min);
  display: flex;
  align-items: center;
  width: 85%;
  margin-right: var(--margin-md);
`;

const SearchContent = styled.div<{ isContent: boolean }>`
  margin-top: var(--margin-sub);
  height: ${(props) => props.isContent && "220px"};
  padding-left: var(--padding-sub);
  overflow: auto;
  border: ${(props) => (props.isContent ? "1px solid var(--font-h5)" : null)};
  border-radius: var(--border-radius-sub);
  padding: var(--padding-min);
`;

const Item = styled.div`
  color: var(--font-h2);
  padding: var(--padding-min) 0;
`;

const ItemPlace = styled.span``;

const ItemDetail = styled.span`
  color: var(--font-h3);
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default LocationSearch;
