import { faMinus, faPlus } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { DispatchNumber } from "../../../types/reactTypes";

interface ICountNum {
  value: number;
  setValue: DispatchNumber;
  unit?: "명";
  min?: number;
}

function CountNum({ value, setValue, unit, min = 1 }: ICountNum) {
  return (
    <Layout>
      <IconWrapper
        isMinus={true}
        isVisible={value > min}
        disabled={value <= min}
        onClick={() => setValue((old) => old - 1)}
      >
        <FontAwesomeIcon icon={faMinus} />
      </IconWrapper>
      <Count>
        {value}
        {unit}
      </Count>
      <IconWrapper
        isMinus={false}
        isVisible={true}
        onClick={() => setValue((old) => old + 1)}
      >
        <FontAwesomeIcon icon={faPlus} />
      </IconWrapper>
    </Layout>
  );
}

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 14px;
`;

const IconWrapper = styled.button<{ isMinus: boolean; isVisible: boolean }>`
  color: ${(props) => (props.isVisible ? "var(--font-h1)" : "var(--font-h6)")};
  padding: 0 var(--padding-min);
  margin-right: ${(props) => (props.isMinus ? "var(--margin-min)" : 0)};
  margin-left: ${(props) => (!props.isMinus ? "var(--margin-min)" : 0)};
  cursor: pointer;
`;

const Count = styled.span``;

export default CountNum;
