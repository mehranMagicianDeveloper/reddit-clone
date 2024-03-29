import { Button, Flex, Input, Stack, Textarea } from "@chakra-ui/react";
import React from "react";

type TextInputsProps = {
  textInputs: {
    title: string;
    body: string;
  };
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCreatePost: () => void;
  loading: boolean;
};

const TextInputs: React.FC<TextInputsProps> = ({
  textInputs,
  onChange,
  handleCreatePost,
  loading,
}) => {
  return (
    <Stack spacing={3} width="100%">
      <Input
        name="title"
        value={textInputs.title}
        onChange={onChange}
        fontSize="10pt"
        borderRadius={4}
        placeholder="Title"
        _placeholder={{ color: "gray.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "black",
          boxShadow: "none",
        }}
      />
      <Textarea
        name="body"
        value={textInputs.body}
        height="100px"
        onChange={onChange}
        fontSize="10pt"
        borderRadius={4}
        placeholder="Text (optional)"
        _focus={{
          outline: "none",
          border: "1px solid",
          borderColor: "black",
          boxShadow: "none",
        }}
      />
      <Flex justify="flex-end">
        <Button
          height="36px"
          padding="0px 30px"
          disabled={true}
          onClick={handleCreatePost}
          isDisabled={!textInputs.title}
          isLoading={loading}
        >
          Post
        </Button>
      </Flex>
    </Stack>
  );
};
export default TextInputs;
