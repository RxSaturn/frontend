import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import EventInfoCard from "./event-info-card";
import SocialMediaCard from "./social-media-card";
import UserInfoCard from "./user-info-card";
import { EventInfoActivities } from "@/core/types/user";

interface UserHeaderProps {
  isLoading: boolean;
  activities?: EventInfoActivities;
}

const UserHeader: React.FC<UserHeaderProps> = ({ isLoading, activities }) => {
  return (
    <Flex flexDirection="column" position="relative">
      <Box
        h="150px"
        padding={4}
        bg="linear-gradient(to right,rgba(16,43,175,0.95),rgba(22,100,255,0.95))"
      />

      <Grid px={4} gap={5} h="120px" bg="white" templateColumns="repeat(12, 1fr)">
        <GridItem colSpan={{ base: 12, md: 6, xl: 4 }} marginTop="-100px">
          <UserInfoCard isLoading={isLoading} />
        </GridItem>

        <GridItem
          display={{ base: "none", md: "block" }}
          colSpan={{ base: 0, md: 6, xl: 4 }}
          marginTop="-100px"
        >
          <EventInfoCard isLoading={isLoading} activities={activities} />
        </GridItem>

        <GridItem
          display={{ base: "none", xl: "block" }}
          colSpan={{ base: 0, xl: 4 }}
          marginTop="-100px"
        >
          <SocialMediaCard />
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default UserHeader;
