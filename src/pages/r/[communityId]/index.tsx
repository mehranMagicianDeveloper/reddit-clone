import { Community, communityState } from "@/src/atoms/communitiesAtom";
import About from "@/src/components/Community/About";
import CreatePostLink from "@/src/components/Community/CreatePostLink";
import Header from "@/src/components/Community/Header";
import CommunityNotFound from "@/src/components/Community/NotFound";
import PageContent from "@/src/components/Layout/PageContent";
import Posts from "@/src/components/Posts/Posts";
import { firestore } from "@/src/firebase/clientApp";
import { Flex, Text } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import safeJsonStringify from "safe-json-stringify";

type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
  if (!communityData) {
    return <CommunityNotFound />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const setCommunityStateValue = useSetRecoilState(communityState);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setCommunityStateValue((prev) => ({
      ...prev,
      currentCommunity: communityData,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [communityData]);

  return (
    <Flex direction="column">
      <Header communityData={communityData} />
      <PageContent>
        <>
          <CreatePostLink />
          <Posts communityData={communityData} />
        </>
        <>
          <About communityData={communityData} />
        </>
      </PageContent>
    </Flex>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      context.query.communityId as string
    );
    const communityDoc = await getDoc(communityDocRef);

    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
            )
          : "",
      },
    };
  } catch (error) {
    // make an error page
    console.log("getServerSideError: ", error);
  }
}

export default CommunityPage;
