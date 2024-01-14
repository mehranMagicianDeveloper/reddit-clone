import { Flex, Text, Icon } from "@chakra-ui/react";
import React from "react";
import { TabItemStr } from "./NewPostForm";

type TabItemProps = {
  tabItem: TabItemStr;
  selected: boolean;
};

const TabItem: React.FC<TabItemProps> = ({ tabItem, selected }) => {
  return (
    <Flex
      align="center"
      justify="center"
      flexGrow={1}
      padding="14px 0px"
      cursor="pointer"
      _hover={{
        bg: "gray.50",
      }}
    >
      <Flex align="center" height="20px" mr={2}>
        <Icon as={tabItem.icon} mr={2} color={selected ? "blue.400" : ""} />
        <Text fontSize="10pt" color={selected ? "blue.400" : ""}>
          {tabItem.title}
        </Text>
      </Flex>
    </Flex>
  );
};
export default TabItem;
