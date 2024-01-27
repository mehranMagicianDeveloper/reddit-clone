import { Box, Text, Flex, Icon, MenuItem } from "@chakra-ui/react";
import React, { useState } from "react";
import CreateCommunityModal from "../../Modal/CreateCommunity/CreateCommunityModal";
import { GrAdd } from "react-icons/gr";
import { useRecoilValue } from "recoil";
import { communityState } from "@/src/atoms/communitiesAtom";
import MenuListItem from "./MenuListItem";
import { FaReddit } from "react-icons/fa";

type CommunitiesProps = {
  //user
};

const Communities: React.FC<CommunitiesProps> = () => {
  const [open, setOpen] = useState(false);
  const mySnippet = useRecoilValue(communityState).mySnippets;

  return (
    <>
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
      <Box mt={3} mb={4}>
        <Text pl={3} mb={1} fontSize="7pt" fontWeight={500}>
          MODERATING
        </Text>

        {mySnippet
          .filter((snippet) => snippet.isModerate)
          .map((snippet) => (
            <>
              <MenuListItem
                key={snippet.communityId}
                icon={FaReddit}
                displayText={`r/${snippet.communityId}`}
                link={`/r/${snippet.communityId}`}
                iconColor="brand.100"
                imageURL={snippet.imageURL}
              />
            </>
          ))}
      </Box>
      <Box mt={3} mb={4}>
        <Text pl={3} mb={1} fontSize="7pt" fontWeight={500}>
          MY COMMUNITIES
        </Text>
        <MenuItem
          width="100%"
          fontSize="10pt"
          _hover={{ bg: "gray.100" }}
          onClick={() => {
            setOpen(true);
          }}
        >
          <Flex>
            <Icon as={GrAdd} fontSize={20} mr={2} />
            Create Community
          </Flex>
        </MenuItem>
        {mySnippet.map((snippet) => (
          <>
            <MenuListItem
              key={snippet.communityId}
              icon={FaReddit}
              displayText={`r/${snippet.communityId}`}
              link={`/r/${snippet.communityId}`}
              iconColor="blue.500"
              imageURL={snippet.imageURL}
            />
          </>
        ))}
      </Box>
    </>
  );
};
export default Communities;
