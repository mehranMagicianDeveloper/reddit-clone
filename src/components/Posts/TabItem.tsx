import { Flex, Text, Icon } from "@chakra-ui/react";
import React from "react";
import { TabItemStr } from "./NewPostForm";

type TabItemProps = {
  tabItem: TabItemStr;
  selected: boolean;
  setSelectedTab: (value: string) => void;
};

const TabItem: React.FC<TabItemProps> = ({
  tabItem,
  selected,
  setSelectedTab,
}) => {
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
      color={selected ? "blue.500" : "gray.500"}
      borderWidth={selected ? "0px 1px 2px 0px" : "0px 1px 1px 0px"}
      borderBottomColor={selected ? "blue.500" : "gray.200"}
      borderRightColor="gray.200"
      onClick={() => setSelectedTab(tabItem.title)}
    >
      <Flex align="center" height="20px" mr={2}>
        <Icon as={tabItem.icon} mr={2} color={selected ? "blue.400" : ""} />
        <Text fontSize="10pt">{tabItem.title}</Text>
      </Flex>
    </Flex>
  );
};
export default TabItem;
