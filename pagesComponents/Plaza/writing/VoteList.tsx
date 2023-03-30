import { faCheck, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { PlazaContentVoteListModal } from "../../../modals/write/plaza/PlazaContentVoteListModal";

function VoteList({ setVoteList }) {
  const [voteListArr, setVoteListArr] = useState([]);

  useEffect(() => {
    setVoteList(voteListArr);
  }, [voteListArr]);
  const onDeleteBtnClicked = (idx) => {
    const NewArr = voteListArr?.map((item) => {
      const voteListIdx = item.voteListIdx;
      let newIdx = idx;
      if (voteListIdx > idx) newIdx = voteListIdx - 1;
      else newIdx = voteListIdx;
      return { voteListIdx: newIdx, value: item.value };
    });
    NewArr.splice(idx - 1, 1);
    setVoteListArr(NewArr);
  };
  const voteListInput = useRef(null);

  const [value, setValue] = useState("");
  let voteListIdx = 0;
  if (voteListArr.length !== 0)
    voteListIdx = voteListArr[voteListArr.length - 1].voteListIdx;

  const onAddBtnClicked = () => {
    if (value === "") {
      voteListInput.current.focus();
    } else {
      setVoteListArr((old) => [
        ...old,
        { voteListIdx: voteListIdx + 1, value },
      ]);
      setValue("");
    }
  };

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  };
  return (
    <Layout>
      <Header>투표</Header>
      {voteListArr.map((item, idx) => (
        <Item key={idx}>
          <span>{item.voteListIdx}.</span>
          <span>{item.value}</span>
          <FontAwesomeIcon
            icon={faMinus}
            onClick={() => onDeleteBtnClicked(idx + 1)}
          />
        </Item>
      ))}
      {voteListIdx < 4 && (
        <InputItem>
          <span>{voteListIdx + 1}.</span>
          <ListInput
            ref={voteListInput}
            name="inputList"
            value={value}
            onChange={onChange}
            placeholder="내용 입력"
          />
          <FontAwesomeIcon icon={faCheck} onClick={onAddBtnClicked} />
        </InputItem>
      )}
    </Layout>
  );
}
const Layout = styled.div`
  margin-top: 16px;
`;

const Header = styled.header`
  color: var(--font-h3);
  font-weight: 600;
  margin-bottom: 12px;
`;

const Item = styled.div`
  padding: 8px 0;
  display: flex;
  align-items: center;

  font-size: 15px;
  color: var(--font-h2);
  border-bottom: 1px solid var(--font-h5);
  > span:first-child {
    display: inline-block;
    width: 16px;
    margin-right: 12px;
  }

  > span:nth-child(2) {
    display: inline-block;
    height: 36px;
    width: 280px;
    display: flex;
    align-items: center;
    margin-right: 8px;
  }
`;

const InputItem = styled.div`
  padding: 8px 0;
  display: flex;
  align-items: center;
  font-size: 15px;
  border-bottom: 1px solid var(--font-h5);
  color: var(--font-h2);
  > span {
    margin-right: 12px;
  }
`;

const ListInput = styled.input`
  height: 36px;
  width: 280px;
  background-color: var(--font-h8);
  color: var(--font-h2);
  ::placeholder {
    color: var(--font-h3);
  }
  margin-right: 11px;
`;
const AddIcon = styled.button.attrs((props) => ({
  type: "button",
}))``;

const DeleteIcon = styled.button.attrs((props) => ({
  type: "button",
}))``;

export default VoteList;
