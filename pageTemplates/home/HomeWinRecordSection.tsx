import styled from "styled-components";
import SectionBar from "../../components2/molecules/bars/SectionBar";
import SummaryTable from "../../components2/organisms/tables/SummaryTable";
import { WIN_RECORD } from "../../storage/winRecord";
interface IHomeWinRecordSection {}
export default function HomeWinRecordSection({}: IHomeWinRecordSection) {
  const contentArr = WIN_RECORD.slice().reverse().slice(0, 12);

  return (
    <>
      <SectionBar title="이벤트 당첨 현황" />
      <Layout>
        <SummaryTable tableContentArr={contentArr} />
      </Layout>
    </>
  );
}

const Layout = styled.div`
  margin: 16px;
  border: var(--border-main-light);
  border-radius: var(--border-radius-sub);
`;
