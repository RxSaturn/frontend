import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import { EventCard } from "../event-card";
import { Event } from "@/core/types/events";

export type EventAccordionItemProps = {
  title: string;
  notResult: string;
  reload?: () => void;
  events: Event[] | undefined;
};

export const EventAccordionItem = ({
  title,
  events,
  notResult,
  reload,
}: EventAccordionItemProps) => {
  return (
    <AccordionItem>
      <AccordionButton
        color="white"
        background="linear-gradient(to right,rgba(16,43,175,0.95),rgba(22,100,255,0.95))"
        _hover={{
          background: "linear-gradient(to right,rgba(16,43,175,0.95),rgba(22,100,255,0.95))",
        }}
      >
        <Box as="span" flex="1" textAlign="left">
          {title}
        </Box>
        <AccordionIcon />
      </AccordionButton>

      <AccordionPanel pb={4}>
        <Flex gap={5} wrap="wrap">
          {!!events?.length ? (
            events.map((item, index) => {
              return <EventCard key={index} event={item} reload={reload} />;
            })
          ) : (
            <Text textAlign="center">{notResult}</Text>
          )}
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};
