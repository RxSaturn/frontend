import { SETCSponsors, Sponsors } from "@/core/types/principal";
import { useTranslate } from "@/core/hooks/use-translate";
import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import { SponsorsPlan } from "@/core/enum/sponsors-plan/2023";

interface PrincipalSponsorsProps {
  sponsors: SETCSponsors | undefined;
}

export const PrincipalSponsors: React.FC<PrincipalSponsorsProps> = ({ sponsors }) => {
  const t = useTranslate(["common"]);
  let sicoobLogo: Sponsors | undefined = undefined;

  const getImageSizeByPlan = (plan: string) => {
    switch (plan) {
      case SponsorsPlan.Diamond:
        return "150px";
      case SponsorsPlan.Gold:
        return "130px";
      case SponsorsPlan.Silver:
        return "110px";
      case SponsorsPlan.Bronze:
        return "90px";
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
        gridGap={4}
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
              const size = getImageSizeByPlan(company.plan);
              if (company.company != "Sicoob Credibam") {
                return (
                  <Image
                    src={img}
                    maxWidth={size}
                    objectFit="contain"
                    alt={company.company}
                    key={`${company.company}-${index}`}
                  />
                );
              } else {
                sicoobLogo = company;
              }
            });

            return (
              <Flex key={plan} flexDirection="column" alignItems="center">
                <Heading fontSize="lg" mb={4}>
                  {t(`common:${plan}`)}
                </Heading>
                <Flex mb={6}>
                  {sicoobLogo && (
                    <Image
                      src={
                        new URL(
                          `/src/assets/img/sponsors/${sicoobLogo.image.replace(".jpg", ".png")}`,
                          import.meta.url,
                        ).href
                      }
                      maxWidth={{
                        base: "100%",
                        lg: `calc(${getImageSizeByPlan(sicoobLogo.plan)} * 2)`,
                      }}
                      objectFit="contain"
                      alt={sicoobLogo.company}
                    />
                  )}
                </Flex>
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
