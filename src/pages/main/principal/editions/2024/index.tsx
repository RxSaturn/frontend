import { AxiosError } from "axios";
import Template from "@/layouts/main";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useError } from "@/core/hooks/use-error";
import { useAxios } from "@/core/hooks/use-axios";
import { PrincipalResponse } from "@/core/types/principal";
import { PrincipalHeader } from "./header";
import { PrincipalDetails } from "./details";
import { PrincipalAgenda } from "./agenda";
import { PrincipalInfo } from "./info";
import { PrincipalContact } from "./contact";
import { PrincipalOrganizers } from "./organizers";

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
      <PrincipalHeader/>
      <PrincipalDetails />
      <PrincipalAgenda agenda={agenda}/>
      <PrincipalInfo />
      <PrincipalContact />
      <PrincipalOrganizers team={team} />
    </Template>
  );
};

export default Principal;
