import { faInfoCircle } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { IModal } from "../../../types/reactTypes";

function RuleIcon({ setIsModal }: IModal) {
  return (
    <Layout onClick={() => setIsModal(true)}>
      <FontAwesomeIcon icon={faInfoCircle} size="xl" color="var(--font-h2)" />
    </Layout>
  );
}

const Layout = styled.div`
  cursor: pointer;
`;

export default RuleIcon;
