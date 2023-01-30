import { useRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, categoryState } from "../../recoil/atoms";

const Select = styled.select`
  width: 90px;
  font-size: 16px;
  margin-left: 15px;
  box-shadow: 2px 2px 1px black;
`;

function SelectGather() {
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setCategory(value as any);
  };
  return (
    <Select value={category} onInput={onInput}>
      <option value={Categories.plan}>plan</option>
      <option value={Categories.complete}>complete</option>
      <option value={Categories.cancel}>cancel</option>
    </Select>
  );
}
export default SelectGather;
