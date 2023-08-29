import { Badge } from "@chakra-ui/react";
import styled from "styled-components";
import { Location } from "../../../types/system";

function LocationTitle({ location }: { location: Location }) {
  return (
    <Layout>
      {false ? (
        <Badge variant="outline" fontSize="10px" mb="4px">
          준비중
        </Badge>
      ) : location === "강남" || location === "동대문" ? (
        <Badge colorScheme="yellow" variant="outline" fontSize="10px" mb="4px">
          {location === "강남" ? "9월 4일 오픈" : "모집중"}
        </Badge>
      ) : (
        <Badge colorScheme="teal" variant="outline" fontSize="10px" mb="4px">
          오픈
        </Badge>
      )}
      <Title>{location}</Title>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.span`
  font-size: 17px;
  font-weight: 600;
`;

export default LocationTitle;
