import { CardBody, CardFooter, Card as ChakraCard } from "@chakra-ui/card";
import { Stack, Heading, Divider, Flex } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/layout";
import { BsFillPeopleFill } from "react-icons/bs";
import { useTranslate } from "@/core/hooks/use-translate";
import { Badge, Tooltip } from "@chakra-ui/react";
import { getActivityColor, orderArrayByKey } from "@/core/helpers";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PdfDocument } from "@/pages/system/admin/reports/participation/pdf-template";
import { ParticipationReport } from "@/core/types/reports";

export interface CardProps {
  data: ParticipationReport;
  filter?: { course?: string; class?: string };
  sort?: { key?: string; ascending?: boolean };
}

export const Card: React.FC<CardProps> = ({ data, filter, sort }) => {
  const t = useTranslate(["common"]);

  let filterData = data.users;

  if (filter?.course && filter?.class) {
    filterData = data.users.filter(
      (item) => item.course === filter.course && item.class === filter.class,
    );
  } else if (filter?.course) {
    filterData = data.users.filter((item) => item.course === filter.course);
  }

  if (sort?.key) {
    filterData = orderArrayByKey(filterData, sort.key, sort?.ascending);
  }

  const courseText = filter?.course ? `-${filter?.course}` : "";
  const classText = filter?.class ? `-${filter?.class}` : "";

  const fileName = `Relátorio presença - ${data.slug}${courseText}${classText}.pdf`;

  return (
    <Flex maxW="sm" w={{ base: "100%", lg: "sm" }}>
      <ChakraCard w="100%" rounded="lg" border="1px solid #EDF2F7" boxShadow="lg">
        <CardBody>
          <Badge colorScheme={getActivityColor(data.type)} textAlign="center">
            {t(`common:${data.type || "event"}`)}
          </Badge>

          <Stack mt="6" spacing="3">
            <Tooltip label={data.slug} hasArrow placement="top-start" aria-label="A tooltip">
              <Heading size="sm" noOfLines={2} cursor="help" lineHeight="1.4">
                {data.slug}
              </Heading>
            </Tooltip>

            <Flex color="gray.800" fontSize="xl" alignItems="center">
              <BsFillPeopleFill />

              <Text ml="2">
                {data.totalUsersPresent}/{data.totalUsers}
              </Text>
            </Flex>
          </Stack>
        </CardBody>

        <Divider />

        <CardFooter justifyContent="flex-end" alignItems="center">
          {filterData && (
            <PDFDownloadLink
              document={
                <PdfDocument
                  title={data.slug}
                  users={filterData}
                  classText={classText}
                  courseText={courseText}
                  columns={[
                    { name: "Nº", size: 5 },
                    { name: "Nome", size: !!courseText ? 60 : 50 },
                    { name: "Curso", size: 30, ignore: !!courseText },
                    { name: "Participação", size: 15 },
                  ]}
                />
              }
              fileName={fileName}
              style={{
                color: "white",
                height: "40px",
                display: "flex",
                fontSize: "16px",
                paddingLeft: "16px",
                borderRadius: "6px",
                paddingRight: "16px",
                alignItems: "center",
                fontWeight: "semibold",
                textDecoration: "none",
                backgroundColor: "#1863ff",
                border: "1px solid #e2e8f0",
              }}
            >
              {({ blob, url, loading, error }) =>
                loading ? "Loading document..." : "Baixar lista"
              }
            </PDFDownloadLink>
          )}
        </CardFooter>
      </ChakraCard>
    </Flex>
  );
};
