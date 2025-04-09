import { SETCSponsors } from "@/core/types/principal";
import { useTranslate } from "@/core/hooks/use-translate";
import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import { SponsorsPlan } from "@/core/enum/sponsors-plan/2024";

type PrincipalSponsorsProps = {
  sponsors: SETCSponsors | undefined;
};

export const PrincipalSponsors = ({ sponsors }: PrincipalSponsorsProps) => {
  const t = useTranslate(["common"]);

  const getImageSizeByPlan = (plan: string) => {
    switch (plan) {
      case SponsorsPlan.Executive:
        return "250px";
      case SponsorsPlan.Black:
        return "130px";
      case SponsorsPlan.Supporter:
        return "130px";
      default:
        return "90px";
    }
  };

  return (
    <Flex
      px={8}
      as="section"
      width="100%"
      id="sponsors"
      maxWidth="1320px"
      margin="24px auto"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      gridGap={{ base: 6, md: 6 }}
    >
      <Heading fontWeight="medium" textAlign="center">
        {t("common:our-sponsors")}
      </Heading>

      <Flex
        gridGap={7}
        flexWrap="wrap"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        {sponsors &&
          Object.entries(sponsors).map(([plan, companies]) => {
            const imagesHtml = companies.map((company, index) => {
              const img = new URL(`/src/assets/img/sponsors/${company.image}`, import.meta.url)
                .href;
              let size = getImageSizeByPlan(company.plan);

              if (company.company === "Mata Larica") {
                size = "225px";
              }

              return (
                <Image
                  src={img}
                  maxWidth={size}
                  objectFit="contain"
                  alt={company.company}
                  key={`${company.company}-${index}`}
                />
              );
            });

            return (
              <Flex key={plan} flexDirection="column" alignItems="center">
                <Heading fontSize="lg" mb={3}>
                  {t(`common:${plan}`)}
                </Heading>

                <Flex gridGap={6} flexWrap="wrap" justifyContent="center">
                  {imagesHtml}
                </Flex>
              </Flex>
            );
          })}
      </Flex>
    </Flex>
  );
};
