import { useRecoilState, useRecoilValue } from "recoil";
import { change, tempState } from "../recoil/atoms";

function Test() {
  const [A, setA] = useRecoilState(tempState);
  const [B, setB] = useRecoilState(change);
  const onChange = (event: any) => {
    setA(+event.target.value);
  };
  const onChange2 = (event: any) => {
    setB(+event.target.value);
  };
  return (
    <>
      <input value={A} onChange={onChange} />
      <input value={B} onChange={onChange2} />
    </>
  );
}
export default Test;
