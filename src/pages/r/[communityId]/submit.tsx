import { communityState } from "@/src/atoms/communitiesAtom";
import About from "@/src/components/Community/About";
import PageContent from "@/src/components/Layout/PageContent";
import NewPostForm from "@/src/components/Posts/NewPostForm";
import { auth } from "@/src/firebase/clientApp";
import useCommunityData from "@/src/hooks/useCommunityData";
import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";

type submitProps = {};

const Submit: React.FC<submitProps> = () => {
  const [user] = useAuthState(auth);
  const { communityStateValue } = useCommunityData();

  console.log("COMMUNITY: ", communityStateValue);

  return (
    <PageContent>
      <>
        <Box padding="14px 0px" borderBottom="1px solid" borderColor="white">
          <Text>Create Post</Text>
        </Box>
        {user && <NewPostForm user={user} />}
      </>
      <>
        {communityStateValue.currentCommunity && (
          <About communityData={communityStateValue.currentCommunity} />
        )}
      </>
    </PageContent>
  );
};
export default Submit;
