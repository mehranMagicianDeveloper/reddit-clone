import { auth } from "@/src/firebase/clientApp";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { error } from "console";
import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, user, loading, userError] =
    useSignInWithGoogle(auth);

  function handleGoogleOauth() {
    signInWithGoogle();
  }

  return (
    <Flex mb={6} width="100%" flexDirection="column">
      <Button
        variant="oauth"
        mb={3}
        isLoading={loading}
        onClick={handleGoogleOauth}
      >
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
      {userError && (
        <Text align="center" fontSize="9pt" color="red" mt={2}>
          {userError.message}
        </Text>
      )}
    </Flex>
  );
};
export default OAuthButtons;
