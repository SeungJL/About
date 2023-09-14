import { Select } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
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
    setIsMainLoading(true);
  };

  return (
    <>
      {!isMainLoading && (
        <Layout>
          <CustomSelect
            value={value}
            onChange={onChange}
            color="var(--font-h2)"
            bg="var(--font-h8)"
            fontWeight="600"
            textAlign="center"
            border="none"
            size="sm"
            ml="var(--margin-md)"
            _focus={{ border: "none" }}
          >
            <Options value="수원">수원</Options>
            <Options value="양천">양천구</Options>
            <Options value="안양">안양</Options>
            <Options value="강남">강남</Options>
          </CustomSelect>
        </Layout>
      )}
    </>
  );
}

const Layout = styled.div``;

const CustomSelect = styled(Select)`
  padding-right: 24px !important;
`;

const Options = styled.option`
  text-align: center !important;
`;

export default LocationSelector;
