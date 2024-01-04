import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import SearchInput from "./SearchInput";
import RightContent from "./RightContent/RightContent";
import AuthModal from "../Modal/Auth/AuthModal";

const Navbar: React.FC = () => {
  return (
    <Flex bg="white" height="45px" padding="6px 12px">
      <Flex align="center">
        <Image src="/images/redditFace.svg" alt="logo" height="30px" />
        <Image
          src="/images/redditText.svg"
          alt="logo"
          height="46px"
          display={{ base: "none", md: "unset" }}
        />
      </Flex>
      <SearchInput />
      <AuthModal />
      <RightContent />
    </Flex>
  );
};
export default Navbar;
