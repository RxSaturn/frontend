import { random } from "@/core/helpers";
import {
  Skeleton,
  Table,
  TableContainer,
  TableContainerProps,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

interface TableSkeletonProps extends TableContainerProps {
  columns: number;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ columns = 4, ...restProps }) => {
  return (
    <TableContainer mt={5} {...restProps}>
      <Table variant="simple">
        <Thead>
          <Tr>
            {[...Array(columns)].map(() => (
              <Th key={random()}>
                <Skeleton width="50%" height="5px" borderRadius="20px" />
              </Th>
            ))}
          </Tr>
        </Thead>

        <Tbody>
          {[...Array(4)].map(() => (
            <Tr key={random()}>
              {[...Array(columns)].map(() => (
                <Td key={random()}>
                  <Skeleton width="50%" height="5px" borderRadius="20px" />
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableSkeleton;
