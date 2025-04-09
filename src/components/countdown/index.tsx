import { Flex, Heading, Image, Text } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import Logo from "@/assets/img/setc.webp"

interface Countdown {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export const Countdown: React.FC = () => {
  const [countdown, setCountdown] = useState<Countdown | null>(null);
  const [FONT_SIZE_BASE, FONT_SIZE_LG] = ["2xl", "4xl"];

  const formatNumber = (value: number) => {
    return value.toString().padStart(2, "0");
  }

  useEffect(() => {
    const targetDate = new Date('2024-09-02T14:00:00');

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const timeRemaining = targetDate.getTime() - now;

      const days = formatNumber(Math.floor(timeRemaining / (1000 * 60 * 60 * 24)));
      const hours = formatNumber(Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      const minutes = formatNumber(Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)));
      const seconds = formatNumber(Math.floor((timeRemaining % (1000 * 60)) / 1000));

      setCountdown({ days, hours, minutes, seconds });

      if (timeRemaining < 0) {
        clearInterval(interval);
        setCountdown(null);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  
  setTimeout(() => {
    if (!countdown) {
      return <Heading color="#FFF">O Evento começou!</Heading>;
    }
  }, 500);
  
  if(countdown){
    return (
      <Flex
        direction="column"
        alignItems="center"
        color="#FFF"
        gridGap={5}
      >
        <Flex gridGap={5}>
          <Flex
            direction='column'
            alignItems='center'
          >
            <Heading fontSize={{ base: FONT_SIZE_BASE, lg: FONT_SIZE_LG}}>{countdown.days}</Heading>
            <Text>Dias</Text>
          </Flex>
          <Flex
            direction='column'
            alignItems='center'
            justifyContent='center'
          >
            <Heading fontSize={{ base: FONT_SIZE_BASE, lg: FONT_SIZE_LG}}>{countdown.hours}</Heading>
            <Text>Horas</Text>
          </Flex>
          <Flex
            direction='column'
            alignItems='center'
            justifyContent='center'
          >
            <Heading fontSize={{ base: FONT_SIZE_BASE, lg: FONT_SIZE_LG}}>{countdown.minutes}</Heading>
            <Text>Minutos</Text>
          </Flex>
          <Flex
            direction='column'
            alignItems='center'
            justifyContent='center'
          >
            <Heading fontSize={{ base: FONT_SIZE_BASE, lg: FONT_SIZE_LG}}>{countdown.seconds}</Heading>
            <Text>Segundos</Text>
          </Flex>
        </Flex>
        <Heading fontSize={{ base: "xl", lg: "3xl"}}>02 de Setembro, 2024 Bambuí</Heading>
      </Flex>
      
    );
  }
};