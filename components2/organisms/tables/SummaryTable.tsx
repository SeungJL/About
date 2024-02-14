import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { faCircle } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    <TableContainer overflow="hidden">
      <Table variant="striped" size="sm" colorScheme="gray" whiteSpace="nowrap">
        <Thead>
          <Tr>
            <Th textAlign="center" p="4px 12px">
              날짜
            </Th>
            <Th textAlign="center" p="4px 12px">
              이름
            </Th>
            <Th textAlign="center" p="4px 12px">
              내용
            </Th>
            <Th textAlign="center" p="4px 12px">
              상품
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableContentArr.map((content, idx) => (
            <Tr key={idx}>
              <Td textAlign="center" p="4px 12px">
                {content.date}
              </Td>
              <Td textAlign="center" p="4px 12px">
                {content.name}
                <FontAwesomeIcon icon={faCircle} size="sm" />
              </Td>
              <Td textAlign="center" p="4px 12px">
                {content.detail}
              </Td>
              <Td textAlign="center" p="4px 12px">
                {content.present}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
