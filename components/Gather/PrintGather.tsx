import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  Categories,
  gatherIdState,
  gatherState,
  IgatherItem,
} from "../../recoil/atoms";
import { faSquare } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ItemContainer = styled(motion.div)`
  margin: 20px 5px;
`;
const Date = styled.span`
  margin-right: 10px;
`;
const Item = styled.div`
  margin-top: 8px;
`;

const ButtonSection = styled.section`
  display: inline-block;
  > button {
    border: none;
    width: 60px;
    border-radius: 20px;
    font-size: 12px;
    margin-right: 4px;
    background-color: rgba(174, 110, 70, 1);
  }
`;

function PrintGather({ text, category, id, date }: IgatherItem) {
  const setGather = useSetRecoilState(gatherState);
  const setID = useSetRecoilState(gatherIdState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setGather((gather: any) => {
      const targetIndex = gather.findIndex((item: any) => item.id === id);
      const newGather = { text, id, category: name, date };

      return [
        ...gather.slice(0, targetIndex),
        newGather,
        ...gather.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <li>
      <ItemContainer layoutId={String(id)}>
        <span className="fa-li">
          <FontAwesomeIcon icon={faSquare} size="sm" />
        </span>
        <Date>{date}</Date>
        {category === Categories.plan && (
          <ButtonSection>
            <button onClick={() => setID(String(id))}>Join</button>
            <button name={Categories.complete} onClick={onClick}>
              complete
            </button>
            <button name={Categories.cancel} onClick={onClick}>
              Cancel
            </button>
          </ButtonSection>
        )}
        <Item>{text}</Item>
      </ItemContainer>
    </li>
  );
}
export default PrintGather;
