import PageContent from "@/src/components/Layout/PageContent";
import NewPostForm from "@/src/components/Post/NewPostForm";
import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

type submitProps = {};

const Submit: React.FC<submitProps> = () => {
  return (
    <PageContent>
      <>
        <Box padding="14px 0px" borderBottom="1px solid" borderColor="white">
          <Text>Create Post</Text>
        </Box>
        <NewPostForm />
      </>
      <>About side</>
    </PageContent>
  );
};
export default Submit;
