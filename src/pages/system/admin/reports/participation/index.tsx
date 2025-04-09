import { useTranslate } from "@/core/hooks/use-translate";
import MenuPanel from "@/layouts/system";
import BodyPanel from "@/layouts/system/body-panel";
import HeaderPanel from "@/layouts/system/header-panel";
import { Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import { Card } from "@/pages/system/admin/reports/participation/card";
import { EventsInput } from "@/components-setc/inputs/select-events";
import { useForm } from "react-hook-form";
import { useError } from "@/core/hooks/use-error";
import { useAxios } from "@/core/hooks/use-axios";
import { useDocumentTitle } from "@/core/hooks/use-document-title";
import { useQuery } from "@tanstack/react-query";
import { ParticipationReport } from "@/core/types/reports";
import { ClassInput, CourseInput } from "@/components-setc/inputs";
import { OrderByInput } from "@/components-setc/inputs/select-order";
import { useEffect, useState } from "react";
import { SelectOptions } from "@/core/types/select-input";

export const ParticipationReportPage: React.FC = () => {
  const { error } = useError();
  const { axios } = useAxios();
  const methods = useForm({ mode: "onChange" });
  const t = useTranslate(["common", "menu"]);

  useDocumentTitle(t("menu:report-participation"));

  const [sort, setSort] = useState<{ key?: string; ascending?: boolean }>();
  const [filter, setFilter] = useState<{ course?: string; class?: string }>();

  const course: SelectOptions = methods.watch("course");
  const orderBy: SelectOptions = methods.watch("order");
  const classValue: string = methods.watch("class");

  const { data } = useQuery({
    queryKey: ["get-event-activities"],
    queryFn: () => axios.getFn<ParticipationReport[]>(`report/events/participation`),
  });

  useEffect(() => {
    setSort({ key: orderBy?.value });
    setFilter({ course: course?.value, class: classValue });
  }, [course, orderBy, classValue]);

  return (
    <MenuPanel>
      <Flex alignItems="center" flexDirection="column" justifyContent="center">
        <HeaderPanel>
          <Heading>{t("menu:report-participation")}</Heading>
        </HeaderPanel>

        <BodyPanel>
          <Grid templateColumns="repeat(12, 1fr)" gap={5} my={4}>
            <GridItem colSpan={4}>
              <CourseInput methods={methods} />
            </GridItem>

            <GridItem colSpan={4}>
              <ClassInput methods={methods} />
            </GridItem>

            <GridItem colSpan={4}>
              <OrderByInput methods={methods} />
            </GridItem>
          </Grid>

          <Flex mt={5} gridGap={4}>
            {data?.map((item, index) => {
              return <Card key={index} data={item} sort={sort} filter={filter} />;
            })}
          </Flex>
        </BodyPanel>
      </Flex>
    </MenuPanel>
  );
};
