import PageContent from "@/src/components/Layout/PageContent";
import NewPostForm from "@/src/components/Post/NewPostForm";
import { auth } from "@/src/firebase/clientApp";
import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type submitProps = {};

const Submit: React.FC<submitProps> = () => {
  const [user] = useAuthState(auth);

  return (
    <PageContent>
      <>
        <Box padding="14px 0px" borderBottom="1px solid" borderColor="white">
          <Text>Create Post</Text>
        </Box>
        {user && <NewPostForm user={user} />}
      </>
      <>About side</>
    </PageContent>
  );
};
export default Submit;
