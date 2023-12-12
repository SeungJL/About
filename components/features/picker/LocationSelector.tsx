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
        {[...LOCATION_USE_ALL, "동대문"].map((location) => {
          const name = LOCATION_CONVERT[location];
          return (
            <Option key={location} value={location}>
              {name}
              {name.length < 4 && " 지역"}
            </Option>
          );
        })}
      </Select>
    </Layout>
  );
}

const Select = styled.select`
  height: 24px;
  border-radius: 4px;
  border: 1px solid var(--font-h5);
  background-color: white;
  color: var(--font-h3);
  font-weight: 400;

  font-size: 13px;
  border: none;
  text-align: end;
  :focus {
    outline: none;
  }
`;

const Option = styled.option``;

const Layout = styled.div`
  display: flex;
`;

export default LocationSelector;
