import { Flex, Text } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";

interface Timeline {
  text: string;
  active: boolean;
  finished: boolean;
}

interface TimeLineProps {
  timeline: Timeline[];
}

export const TimeLine: React.FC<TimeLineProps> = ({ timeline }) => {
  return (
    <Flex
      mb={7}
      padding={4}
      gridGap={12}
      width="100%"
      border="1px"
      borderRadius="15px"
      borderColor="gray.300"
      justifyContent="center"
    >
      {timeline.map((item, index) => {
        const activeColor = item?.active ? "#1664ff" : "gray.300";
        const finishedColor = item?.finished ? "#25D366" : "gray.300";

        const color = item.active ? activeColor : finishedColor;

        return (
          <Flex
            key={index}
            gridGap={3}
            alignItems="center"
            justifyContent="center"
            display={{ base: item?.active ? "flex" : "none", md: "flex" }}
          >
            <Text
              width="30px"
              border="1px"
              color={color}
              height="30px"
              display="flex"
              fontSize="16px"
              borderRadius="50%"
              alignItems="center"
              borderColor={color}
              justifyContent="center"
            >
              {item?.finished ? <FaCheck fontSize="12px" color={color} /> : index + 1}
            </Text>

            <Text color={color}>{item.text}</Text>
          </Flex>
        );
      })}
    </Flex>
  );
};
