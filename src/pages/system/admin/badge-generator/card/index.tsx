import { User } from "@/core/types/user";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import BadgeBrand from "@/assets/img/badge-brand.png";
import { useTranslate } from "@/core/hooks/use-translate";

interface BadgeCardProps {
  user: User;
  isOrganizerBagde: boolean;
}


// Lista de nomes que devem ser incluídos se forem o segundo nome
const includeSecondName = new Set([
  "caroline", "júlia", "paula", "clara", "henrique", "josé", 
  "miguel", "daniel", "eduardo", "antônio", "augusto", 
  "bruno", "marcos", "pedro", "vitor", "ygor", "césar", 
  "otávio", "roberto", "felipe", "vinicius", "vitória", 
  "fellype", "gabriel", "maria", "lucas", "roberta", "jhonata"
]);

// Função para normalizar o nome para comparação
const normalizeName = (name: string) => {
  return name.trim().toLowerCase();
};


export const BadgeCard: React.FC<BadgeCardProps> = ({ user, isOrganizerBagde }) => {
  const t = useTranslate(["common"]);

  // Função para formatar o nome
  const formatName = (name: string) => {
    const nameParts = name.trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];
    
    // Normaliza o nome do usuário para comparação
    const normalizedFullName = normalizeName(name);

    // Verifica se o nome é maior que 26 caracteres (Limite para a quebra)
    if (name.length > 26) {
      const secondName = nameParts.length > 2 ? nameParts[1] : '';
      
      // Verifica se o segundo nome está na lista normalizada
      if (secondName && includeSecondName.has(normalizeName(secondName))) {
        return `${firstName} ${secondName} ${lastName}`;
      }

      return `${firstName} ${lastName}`;
    }
    
    return name;
  };

  const displayName = formatName(user.name);

  return (
    <Flex
      width="225px"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      backgroundColor="white"
      border="2px dashed black"
      style={{ pageBreakInside: "avoid" }}
    >
      <Flex my={3} flexDirection="column" justifyContent="center" alignItems="center" px={3}>
        <Text color="black" fontSize="1rem" fontFamily="Oswald" textTransform="uppercase" textAlign="center">
          {displayName}
        </Text>
      </Flex>

      <Flex
        p={0.5}
        mb={2}
        width="100%"
        color="white"
        fontSize="1rem"
        fontFamily="Exo"
        fontWeight="bold"
        alignItems="center"
        letterSpacing="5px"
        justifyContent="center"
        textTransform="uppercase"
        backgroundColor="black"
      >
        {isOrganizerBagde ? t("common:organizer") : user.role_name}
      </Flex>
    </Flex>
  );
};
