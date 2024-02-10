import {
  CustomFlowbiteTheme,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

interface ITableContent {
  date: string;
  name: string;
  detail: string;
  present: string;
}

interface ISummaryTable {
  tableContentArr: ITableContent[];
}
export default function SummaryTable({ tableContentArr }: ISummaryTable) {
  return (
    <div className="p-4">
      <Table striped theme={customTheme}>
        <TableHead>
          <TableHeadCell>날짜</TableHeadCell>
          <TableHeadCell>이름</TableHeadCell>
          <TableHeadCell>내용</TableHeadCell>
          <TableHeadCell>상품</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {tableContentArr.map((content, idx) => (
            <TableRow
              key={idx}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <TableCell>{content.date}</TableCell>
              <TableCell>{content.name}</TableCell>
              <TableCell>{content.detail}</TableCell>
              <TableCell >
                {content.present}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

const customTheme: CustomFlowbiteTheme["table"] = {
  root: {
    base: "w-full text-left text-xs text-gray-500 dark:text-gray-400",
    shadow:
      "absolute bg-white dark:bg-black w-full h-full top-0 left-0 rounded-lg drop-shadow-md -z-10",
    wrapper: "relative",
  },
  body: {
    base: "group/body",
    cell: {
      base: "group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg px-2 py-1.5 text-center",
    },
  },
  head: {
    base: "group/head text-xs uppercase text-gray-700 dark:text-gray-400",
    cell: {
      base: "group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg bg-gray-50 dark:bg-gray-700 px-2 py-3 text-center",
    },
  },
  row: {
    base: "group/row",
    hovered: "hover:bg-gray-50 dark:hover:bg-gray-600",
    striped:
      "odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700",
  },
};
