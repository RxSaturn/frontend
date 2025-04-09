import { IAudit } from "@/core/types/audit";
import { transformDateInLocalDate } from "@/core/helpers";
import { useTranslate } from "@/core/hooks/use-translate";
import { Flex, Text } from "@chakra-ui/react";
import AuditModal from "./audit-modal";

interface AuditProps {
  audit: IAudit[];
  entityId: string;
}

const Audit: React.FC<AuditProps> = ({ audit, entityId }) => {
  const t = useTranslate(["common"]);

  const insertedAudit = audit?.filter((item) => item.type === "INSERT");
  const updatedAudit = audit?.filter((item) => item.type === "UPDATE");

  const generateMessage = (array: IAudit[], typeText: string) => {
    if (array && array?.length) {
      const date = transformDateInLocalDate(array[0].date);
      return `${array[0].name} ${typeText} ${date}.`;
    }
  };

  const insertedMessage = generateMessage(insertedAudit, t("inserted-on"));
  const updatedMessage = generateMessage(updatedAudit, t("updated-on"));

  return (
    <Flex justifyContent="space-between" alignItems="center" mt={5}>
      <Flex flexDirection="column">
        {insertedMessage && (
          <Text color="gray.500" fontSize="sm">
            {insertedMessage}
          </Text>
        )}

        {updatedMessage && (
          <Text color="gray.500" fontSize="sm">
            {updatedMessage}
          </Text>
        )}
      </Flex>

      <AuditModal entityId={entityId} />
    </Flex>
  );
};

export default Audit;
