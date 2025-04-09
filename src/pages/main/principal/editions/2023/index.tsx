import Template from "@/layouts/main";
import { useAxios } from "@/core/hooks/use-axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useError } from "@/core/hooks/use-error";
import { AxiosError } from "axios";
import { PrincipalResponse } from "@/core/types/principal";
import { PrincipalHeader } from "./header";
import { PrincipalDetails } from "./details";
import { PrincipalInfo } from "./info";
import { PrincipalOrganizers } from "./organizers";
import { PrincipalSponsors } from "./sponsors";
import { PrincipalAgenda } from "./agenda";
import { PrincipalBenefits } from "./benefits";
import { PrincipalContact } from "./contact";
import { CallModal } from "@/components-setc/modals/call-modal";

const Principal: React.FC = () => {
  const { axios } = useAxios();
  const { error } = useError();

  const query = useQuery({
    queryKey: ["index"],
    queryFn: () => axios.getFn<PrincipalResponse>("index", undefined, false),
  });

  const data = query?.data?.data;
  const team = query?.data?.team;
  const agenda = query?.data?.schedule;
  const sponsors = query?.data?.sponsors;

  const [callModalIsOpen, setCallModalIsOpen] = useState(false);

  const onClose = () => {
    setCallModalIsOpen(false);
  };

  useEffect(() => {
    if (query.isError) error.dispatch(query.error as AxiosError);
  }, [query.isError]);

  return (
    <Template alignItems="center">
      <CallModal isOpen={callModalIsOpen} onClose={() => onClose()} />
      <PrincipalHeader enrollmentActive={data?.enrollment_active === "1"} />
      <PrincipalDetails />
      <PrincipalBenefits />
      <PrincipalAgenda agenda={agenda} />
      <PrincipalSponsors sponsors={sponsors} />
      <PrincipalInfo />
      <PrincipalContact />
      <PrincipalOrganizers team={team} />
    </Template>
  );
};

export default Principal;
