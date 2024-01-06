import { Flex, Icon } from "@chakra-ui/react";
import { BsDot, BsReddit } from "react-icons/bs";
import React from "react";

const ResetPassword: React.FC = () => {
  return (
    <Flex direction="column" alignItems="center" width="100%">
      <Icon as={BsReddit} color="brand.100" fontSize={40} mb={2} />
    </Flex>
  );
};
export default ResetPassword;
