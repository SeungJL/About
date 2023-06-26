import { faBalanceScale } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SetStateAction } from "react";
import styled from "styled-components";

interface IRuleIcon {
  setIsModal: React.Dispatch<SetStateAction<boolean>>;
}

function RuleIcon({ setIsModal }: IRuleIcon) {
  return (
    <Layout onClick={() => setIsModal(true)}>
      <FontAwesomeIcon icon={faBalanceScale} size="lg" color="var(--font-h2)" />
    </Layout>
  );
}

const Layout = styled.div`
  cursor: pointer;
`;

export default RuleIcon;
