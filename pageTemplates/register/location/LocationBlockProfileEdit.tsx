import styled from "styled-components";
import { Location } from "../../../types/serviceTypes/locationTypes";

interface ILocationBlockProfileEdit {
  location: Location;
}

function LocationBlockProfileEdit({ location }: ILocationBlockProfileEdit) {
  return <Layout>{location}</Layout>;
}

const Layout = styled.div`
  font-size: 17px;
  font-weight: 600;
`;

export default LocationBlockProfileEdit;
