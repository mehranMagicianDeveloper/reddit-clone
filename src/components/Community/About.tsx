import { Community } from "@/src/atoms/communitiesAtom";
import { Box, Divider, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

type AboutProps = {
  communityData: Community;
};

const About: React.FC<AboutProps> = ({ communityData }) => {
  return (
    <Box position="sticky" top="14px">
      <Flex
        justify="space-between"
        align="center"
        bg="blue.400"
        color="white"
        padding={3}
        borderRadius="4px 4px 0px 0px"
      >
        <Text fontFamily="10pt" fontWeight={700}>
          About Commmunity
        </Text>
        <Icon as={HiOutlineDotsHorizontal} />
      </Flex>
      <Flex direction="column" padding={3} bg="white" border="0px 0px 4px 4px">
        <Stack>
          <Flex width="100%" padding={2} fontSize="10pt" fontWeight={700}>
            <Flex direction="column" flexGrow={1}>
              <Text>{communityData.numberOfMembers.toLocaleString()}</Text>
              <Text>Members</Text>
            </Flex>
            <Flex direction="column" flexGrow={1}>
              <Text>1</Text>
              <Text>Online</Text>
            </Flex>
          </Flex>
          <Divider />
        </Stack>
      </Flex>
    </Box>
  );
};
export default About;
