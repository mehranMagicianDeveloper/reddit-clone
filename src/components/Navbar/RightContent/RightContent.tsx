import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import AuthButtons from "./AuthButtons";
import { signOut } from "firebase/auth";
import { auth } from "@/src/firebase/clientApp";

type RightContentProps = {
  user: any;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  return (
    <>
      {/* <AuthModal /> */}
      <Flex justify="center" align="center">
        {user ? (
          <Button
            height="28px"
            display={{ base: "none", md: "flex" }}
            width={{ base: "70px", md: "110px" }}
            onClick={() => signOut(auth)}
          >
            Log Out
          </Button>
        ) : (
          <AuthButtons />
        )}
      </Flex>
    </>
  );
};
export default RightContent;
