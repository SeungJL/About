import { useState } from "react";
import styled from "styled-components";
import { createTimeArr } from "../../../utils/dateTimeUtils";
import RulletPicker from "../../atoms/RulletPicker";
import { IFooterOptions } from "../../Modal";
interface IRulletPickerTwo {}
export default function RulletPickerTwo({}: IRulletPickerTwo) {
  const [rulletIndex, setRulletIndex] = useState<{
    start: number;
    end: number;
  }>({ start: 8, end: 16 });

  const footerOptions: IFooterOptions = {
    main: {
      text: "변경",
      func: () => {},
    },
    sub: {
      text: "취소",
    },
    isFull: true,
  };

  const startItemArr = createTimeArr(10, 22);
  return (
    <Layout>
      <Wrapper>
        <RulletPicker
          text="시작 시간"
          rulletItemArr={startItemArr}
          rulletIndex={rulletIndex.start}
          setRulletIndex={(idx: number) =>
            setRulletIndex((old) => ({ ...old, start: idx }))
          }
        />
      </Wrapper>
      <Wrapper>
        <RulletPicker
          text="종료 시간"
          rulletItemArr={startItemArr}
          rulletIndex={rulletIndex.end}
          setRulletIndex={(idx: number) =>
            setRulletIndex((old) => ({ ...old, end: idx }))
          }
        />
      </Wrapper>
    </Layout>
  );
}

const Layout = styled.div`
  width: 100%;
  display: flex;
  > div:first-child {
    margin-right: 16px;
  }
`;

const Wrapper = styled.div`
  flex: 1;
`;
