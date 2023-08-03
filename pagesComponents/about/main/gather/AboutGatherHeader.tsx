import { Badge } from "@chakra-ui/react";
import styled from "styled-components";
import { Location } from "../../../../types/system";

interface IAboutGatherHeader {
  place: Location;
  title: string;
}

function AboutGatherHeader({ place, title }: IAboutGatherHeader) {
  return (
    <Layout>
      <Badge mr="var(--margin-md)" variant="solid" colorScheme="mintTheme">
        {place}
      </Badge>
      <Badge>{title}</Badge>
    </Layout>
  );
}

const Layout = styled.div``;

export default AboutGatherHeader;
