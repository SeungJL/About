import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import styled from "styled-components";

export const VoteListInputItem = ({ addVoteListItem }) => {
  const voteListInput = useRef();
  const list = voteListInput.current;
  const [value, setValue] = useState("");
  const [voteListIdx, setVoteListIdx] = useState(1);

  if (list) {
  }
  const onAddBtnClicked = () => {
    addVoteListItem((old) => [...old, { voteListIdx, value }]);
    setVoteListIdx((idx) => idx + 1);
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
      <span>{voteListIdx}.&nbsp;&nbsp;</span>
      <ListInput
        ref={voteListInput}
        name="inputList"
        value={value}
        onChange={onChange}
      />
      <br />{" "}
      <AddIcon onClick={onAddBtnClicked}>
        <FontAwesomeIcon icon={faAdd} />
      </AddIcon>
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
  background-color: gray;
  color: white;
  ::placeholder {
    color: black;
  }
`;

const AddIcon = styled.button.attrs((props) => ({
  type: "button",
}))``;
