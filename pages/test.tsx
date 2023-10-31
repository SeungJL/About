import { Button } from "@chakra-ui/react";
import { faA, faB, faO, faT, faU } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { ModalLayout } from "../components/modals/Modals";
import { TABLE_STRONG_COLORS } from "../constants/styles";

function Test() {
  // const { mutate, data } = useCollectionAlphabetMutation();
  // const { data: data2 } = useCollectionAlphabetQuery();

  // const onClick = () => {
  //   mutate("T");
  // };

  console.log(4);
  return (
    <ModalLayout size="xl" onClose={() => {}}>
      <Layout>
        <Button>클릭</Button>
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
