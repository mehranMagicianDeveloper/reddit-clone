import { Community } from "@/src/atoms/communitiesAtom";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";

type AboutProps = {
  communityData: Community;
};

const About: React.FC<AboutProps> = ({ communityData }) => {
  return (
    <Box position="sticky" top="14px">
      <Flex></Flex>
      <Flex></Flex>
    </Box>
  );
};
export default About;
