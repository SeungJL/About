import { ChangeEvent, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IconMapMark } from "../public/icons/Icons";
import { locationState } from "../recoil/systemAtoms";
import { Location } from "../types/system";

function LocalSelector() {
  const [value, setValue] = useState<Location>();
  const [location, setLocation] = useRecoilState(locationState);

  useEffect(() => {
    setValue(location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const locationValue = event.currentTarget.value as Location;
    setLocation(locationValue);
    setValue(locationValue);
  };
  return (
    <Layout>
      <select value={value} onChange={onChange}>
        <option value="수원">수원</option>
        <option value="양천">양천구</option>
      </select>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  align-items: center;

  > select {
    width: 60px;
    color: var(--font-h2);
    background-color: var(--font-h8);
    font-size: 12px;
    font-weight: 600;
  }
`;

export default LocalSelector;
