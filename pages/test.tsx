import { Button } from "@chakra-ui/react";
import { faA, faB, faO, faT, faU } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { ModalLayout } from "../components/modals/Modals";
import { TABLE_STRONG_COLORS } from "../constants/styles";
import { useCollectionAlphabetMutation } from "../hooks/collection/mutations";
import { useCollectionAlphabetQuery } from "../hooks/collection/queries";

function Test() {
  const { mutate, data } = useCollectionAlphabetMutation();
  const { data: data2 } = useCollectionAlphabetQuery();
  console.log(data2);
  const onClick = () => {
    mutate("T");
  };
  console.log(data);
  return (
    <ModalLayout size="xl" onClose={() => {}}>
      <Layout>
        <Button onClick={onClick}>클릭</Button>
        <FontAwesomeIcon icon={faA} size="3x" color={TABLE_STRONG_COLORS[0]} />
        <FontAwesomeIcon icon={faB} size="3x" color={TABLE_STRONG_COLORS[1]} />
        <FontAwesomeIcon icon={faO} size="3x" color={TABLE_STRONG_COLORS[3]} />
        <FontAwesomeIcon icon={faU} size="3x" color={TABLE_STRONG_COLORS[2]} />
        <FontAwesomeIcon icon={faT} size="3x" color={TABLE_STRONG_COLORS[4]} />
      </Layout>
    </ModalLayout>
  );
}

const Layout = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  > * {
    margin-right: 4px;
  }
`;

export default Test;
