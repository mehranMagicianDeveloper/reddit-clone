import { Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

const OAuthButtons: React.FC = () => {
  return (
    <Flex mb={6} width="100%" flexDirection="column">
      <Button variant="oauth" mb={3}>
        <Image
          mr={3}
          height="20px"
          src="/images/googlelogo.png"
          alt="google logo"
        />
        <Text>Continue with Google</Text>
      </Button>
      <Button variant="oauth">
        <Image
          mr={3}
          height="20px"
          src="/images/redditFace.svg"
          alt="google logo"
        />
        <Text>Continue with Reddit</Text>
      </Button>
    </Flex>
  );
};
export default OAuthButtons;
