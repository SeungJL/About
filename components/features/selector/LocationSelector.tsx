import { ChangeEvent, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isMainLoadingState } from "../../../recoil/loadingAtoms";
import { userLocationState } from "../../../recoil/userAtoms";
import { Location } from "../../../types/system";

function LocationSelector() {
  const [value, setValue] = useState<Location>("수원");
  const [location, setLocation] = useRecoilState(userLocationState);
  const setIsMainLoading = useSetRecoilState(isMainLoadingState);

  useEffect(() => {
    if (location) setValue(location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const locationValue = event.currentTarget.value as Location;
    setLocation(locationValue);
    setValue(locationValue);
    setIsMainLoading(true);
  };
  return (
    <Layout>
      <select value={value} onChange={onChange}>
        <option value="수원">수원</option>
        <option value="양천">양천구</option>
        <option value="안양">안양</option>
        <option value="강남">강남</option>
      </select>
    </Layout>
  );
}

const Layout = styled.div`
  > select {
    color: var(--font-h2);
    background-color: var(--font-h8);
    font-size: 14px;
    font-weight: 600;
    text-align: center;
  }
`;

export default LocationSelector;
