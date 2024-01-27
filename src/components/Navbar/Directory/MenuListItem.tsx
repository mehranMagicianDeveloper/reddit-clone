import useDirectory from "@/src/hooks/useDirectory";
import { Flex, Icon, Image, MenuItem, Text } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";

type MenuListItemProps = {
  displayText: string;
  link: string;
  icon: IconType;
  iconColor: string;
  imageURL?: string;
};

const MenuListItem: React.FC<MenuListItemProps> = ({
  displayText,
  link,
  icon,
  iconColor,
  imageURL,
}) => {
  const { onSelectedMenuItem } = useDirectory();

  return (
    <MenuItem
      width="100%"
      fontSize="10pt"
      _hover={{ bg: "gray.100" }}
      onClick={() => {
        onSelectedMenuItem({
          displayText: displayText,
          link: link,
          icon: icon,
          iconColor: iconColor,
          imageURL: imageURL,
        });
      }}
    >
      <Flex align="center">
        {imageURL ? (
          <Image
            src={imageURL}
            borderRadius="full"
            boxSize="18pt"
            mr={2}
            alt="community"
          />
        ) : (
          <Icon as={icon} fontSize={20} mr={2} color={iconColor} />
        )}
        <Text>{displayText}</Text>
      </Flex>
    </MenuItem>
  );
};
export default MenuListItem;
