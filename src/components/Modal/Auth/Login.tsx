import { authModalState } from "@/src/atoms/authModalAtom";
import { auth } from "@/src/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/src/firebase/errors";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";

const Login: React.FC = () => {
  const setModalState = useSetRecoilState(authModalState);

  interface FormState {
    email: string;
    password: string;
  }

  const [loginForm, setLoginForm] = useState<FormState>({
    email: "",
    password: "",
  });

  const [singInWithEmailAndPassword, user, loading, userError] =
    useSignInWithEmailAndPassword(auth);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    singInWithEmailAndPassword(loginForm.email, loginForm.password);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        required
        name="email"
        placeholder="email"
        type="email"
        mb={2}
        onChange={handleOnChange}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />
      <Input
        required
        name="password"
        placeholder="password"
        type="password"
        mb={2}
        onChange={handleOnChange}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />
      <Text textAlign="center" color="red" fontSize="9pt">
        {FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>
      <Button
        type="submit"
        width="100%"
        mt={2}
        mb={2}
        height="36px"
        isLoading={loading}
      >
        Login
      </Button>
      <Flex justifyContent="center" fontSize="9pt">
        <Text mr={2}>New here ?</Text>
        <Text
          color="blue.500"
          fontWeight={700}
          mb={2}
          cursor="pointer"
          onClick={() => {
            setModalState((prev) => ({ ...prev, view: "signup" }));
          }}
        >
          Sign Up
        </Text>
      </Flex>
    </form>
  );
};
export default Login;
