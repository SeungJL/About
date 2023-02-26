import {
  faAdd,
  faCheck,
  faDeleteLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import styled from "styled-components";

export const VoteListInputItem = ({ voteListArr, setVoteListArr }) => {
  const voteListInput = useRef();
  const list = voteListInput.current;
  const [value, setValue] = useState("");
  let voteListIdx = 0;
  if (voteListArr.length !== 0)
    voteListIdx = voteListArr[voteListArr.length - 1].voteListIdx;

  if (list) {
  }
  const onAddBtnClicked = () => {
    setVoteListArr((old) => [...old, { voteListIdx: voteListIdx + 1, value }]);
    setValue("");
  };

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  };

  return (
    <div>
      {voteListIdx < 4 && (
        <>
          <span>{voteListIdx + 1}.&nbsp;&nbsp;</span>
          <ListInput
            ref={voteListInput}
            name="inputList"
            value={value}
            onChange={onChange}
          />
          <AddIcon onClick={onAddBtnClicked}>
            <FontAwesomeIcon icon={faCheck} />
          </AddIcon>
        </>
      )}
    </div>
  );
};
const ListInput = styled.input.attrs<{
  name: string;
  value: string;
}>((props) => ({
  name: props.name,
  value: props.value,
  placeholder: "입력하세요",
  placeholderTextColor: "black",
}))<{ name: string; value: string }>`
  background-color: lightGray;
  color: white;
  ::placeholder {
    color: rgb(0, 0, 0, 0.7);
  }
`;

const AddIcon = styled.button.attrs((props) => ({
  type: "button",
}))``;
