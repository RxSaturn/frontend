import { ActivityUsers } from "@/core/types/activity";
import { useDocumentTitle } from "@/core/hooks/use-document-title";
import { Flex, Heading, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

export const PrintPage: React.FC = () => {
  const { state } = useLocation();
  const { users, activityName } = state;
  useDocumentTitle(`Lista de presença - ${activityName}`);

  return (
    <Flex flexDirection="column">
      <Heading mb={4} fontSize="2xl">
        SETC - 2023
      </Heading>

      <Heading mb={4} fontSize="xl" fontWeight="semibold">
        Lista de presença - [{activityName}]
      </Heading>

      <Table>
        <Thead>
          <Tr border="1px solid" borderColor="gray.400">
            <Th
              p={2}
              width="35%"
              textAlign="center"
              border="1px solid"
              background="gray.200"
              borderColor="gray.400"
            >
              Nome
            </Th>

            {/* <Th
              p={2}
              width="10%"
              background="gray.200"
              textAlign="center"
              border="1px solid"
              borderColor="gray.400"
            >
              Curso
            </Th>

            <Th
              p={2}
              width="5%"
              background="gray.200"
              textAlign="center"
              border="1px solid"
              borderColor="gray.400"
            >
              Turma
            </Th> */}

            <Th
              p={2}
              width="50%"
              background="gray.200"
              textAlign="center"
              border="1px solid"
              borderColor="gray.400"
            >
              Assinatura
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {users.map((item: ActivityUsers, index: number) => {
            return (
              <Tr key={index} border="1px solid" borderColor="gray.400">
                <Td
                  p={2}
                  width="45%"
                  fontSize="12px"
                  border="1px solid"
                  fontWeight="medium"
                  borderColor="gray.400"
                >
                  {item.name}
                </Td>
                {/* <Td p={2} border="1px solid" borderColor="gray.400" width="12%"></Td>
                <Td p={2} border="1px solid" borderColor="gray.400" width="3%"></Td> */}
                <Td p={2} border="1px solid" borderColor="gray.400" width="40%"></Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Flex>
  );
};
