import TableSkeleton from "@/components/skeleton/table-skeleton";
import { Finances } from "@/core/types/finances";
import { ROUTES } from "@/core/enum/routes";
import { useTranslate } from "@/core/hooks/use-translate";
import MenuPanel from "@/layouts/system";
import BodyPanel from "@/layouts/system/body-panel";
import HeaderPanel from "@/layouts/system/header-panel";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FinanceTable from "./finance-table";
import { useQuery } from "@tanstack/react-query";
import { useError } from "@/core/hooks/use-error";
import { useAxios } from "@/core/hooks/use-axios";

const FinancesPage: React.FC = () => {
  const { error } = useError();
  const { axios } = useAxios();
  const navigate = useNavigate();
  const t = useTranslate(["common", "validation"]);

  const handleNewButton = () => {
    navigate(ROUTES.NEW_FINANCE);
  };

  const query = useQuery({
    queryKey: ["finance"],
    queryFn: () => axios.getFn<Finances[]>("finances"),
  });

  useEffect(() => {
    if (query.isError) error.dispatch(query.error as AxiosError);
  }, [query.isError]);

  return (
    <MenuPanel>
      <Flex alignItems="center" flexDirection="column" justifyContent="center">
        <HeaderPanel>
          <Heading>{t("common:finance")}</Heading>
        </HeaderPanel>

        <BodyPanel>
          <Flex justifyContent="end" gridGap={2}>
            <Button colorScheme="blue" isDisabled={false} onClick={() => handleNewButton()}>
              {t("common:new-record")}
            </Button>
          </Flex>

          <Flex flexDirection="column" alignItems="center">
            {query.isLoading ? (
              <TableSkeleton mt={5} width="100%" columns={6} />
            ) : (
              <FinanceTable columnValues={query.data} />
            )}
          </Flex>
        </BodyPanel>
      </Flex>
    </MenuPanel>
  );
};

export default FinancesPage;
