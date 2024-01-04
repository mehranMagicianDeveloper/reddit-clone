import { Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  interface FormState {
    email: string;
    password: string;
  }

  const [loginForm, setLoginForm] = useState<FormState>({
    email: "",
    password: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
        name="email"
        placeholder="email"
        type="email"
        mb={2}
        onChange={handleOnChange}
      />
      <Input
        name="password"
        placeholder="password"
        type="password"
        onChange={handleOnChange}
      />
      <Button type="submit" width="100%" mt={2} mb={2} height="36px">
        Login
      </Button>
    </form>
  );
};
export default Login;
