import { authModalState } from "@/src/atoms/authModalAtom";
import { Button } from "@chakra-ui/react";
import React from "react";
import { useSetRecoilState } from "recoil";

const AuthButtons: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  const handleLogin = () => {
    setAuthModalState({ view: "login", open: true });
  };

  const handleSignUp = () => {
    setAuthModalState({ view: "signup", open: true });
  };

  return (
    <>
      <Button
        variant="outline"
        height="28px"
        display={{ base: "none", md: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        onClick={handleLogin}
      >
        Log in
      </Button>
      <Button
        height="28px"
        display={{ base: "none", md: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        onClick={handleSignUp}
      >
        Sign up
      </Button>
    </>
  );
};
export default AuthButtons;
