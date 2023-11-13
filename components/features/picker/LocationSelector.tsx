import { ChangeEvent, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import {
  LOCATION_CONVERT,
  LOCATION_RECRUITING,
  LOCATION_USE_ALL,
} from "../../../constants/location";
import { isMainLoadingState } from "../../../recoil/loadingAtoms";
import { locationState } from "../../../recoil/userAtoms";
import { Location } from "../../../types/system";

function LocationSelector() {
  const [value, setValue] = useState<Location>("수원");
  const [location, setLocation] = useRecoilState(locationState);
  const [isMainLoading, setIsMainLoading] = useRecoilState(isMainLoadingState);

  useEffect(() => {
    if (location) setValue(location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMainLoading]);

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const locationValue = event.currentTarget.value as Location;
    setLocation(locationValue);
    setValue(locationValue);
    if (LOCATION_RECRUITING.includes(locationValue)) return;
    setIsMainLoading(true);
  };

  return (
    <Layout>
      <Select value={value} onChange={onChange}>
        {LOCATION_USE_ALL.map((location) => (
          <Option key={location} value={location}>
            {LOCATION_CONVERT[location]} 지역
          </Option>
        ))}
      </Select>
    </Layout>
  );
}

const Select = styled.select`
  appearance: none;
  color: var(--font-h3);
  font-weight: 600;
  font-size: 12px;
  background: inherit;
  text-align: end;
  border: none;
  :focus {
    outline: none;
  }
`;

const Option = styled.option``;

const Layout = styled.div`
  display: flex;
`;

export default LocationSelector;
