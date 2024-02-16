import styled from "styled-components";
import SectionBar from "../../components2/molecules/bars/SectionBar";
import SummaryTable from "../../components2/organisms/tables/SummaryTable";
import { WIN_RECORD } from "../../storage/winRecord";
interface IHomeWinRecordSection {}
export default function HomeWinRecordSection({}: IHomeWinRecordSection) {
  const contentArr = WIN_RECORD.slice().reverse().slice(0, 12);

  const tableInfosArr = contentArr.map((content) => [
    content.date,
    content.name,
    content.detail,
    content.present,
  ]);
  return (
    <>
      <SectionBar title="이벤트 당첨 현황" />
      <Layout>
        <SummaryTable
          headerInfos={["날짜", "이름", "내용", "상품"]}
          tableInfosArr={tableInfosArr}
          size="sm"
        />
      </Layout>
    </>
  );
}

const Layout = styled.div`
  margin: 16px;
  margin-bottom: 36px;
  border: var(--border);
  border-radius: var(--rounded-lg);
`;
