import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { DispatchNumber } from "../../types/reactTypes";

interface ICountNum {
  value: number;
  setValue: DispatchNumber;
}

function CountNum({ value, setValue }: ICountNum) {
  return (
    <Layout>
      <IconWrapper
        isVisible={value > 1}
        disabled={value <= 1}
        onClick={() => setValue((old) => old - 1)}
      >
        <FontAwesomeIcon icon={faMinus} />
      </IconWrapper>
      <Count>{value}</Count>
      <IconWrapper isVisible={true} onClick={() => setValue((old) => old + 1)}>
        <FontAwesomeIcon icon={faPlus} />
      </IconWrapper>
    </Layout>
  );
}

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 80px;
`;

const IconWrapper = styled.button<{ isVisible: boolean }>`
  color: ${(props) => (props.isVisible ? "var(--font-h1)" : "var(--font-h6)")};
`;

const Count = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

export default CountNum;
