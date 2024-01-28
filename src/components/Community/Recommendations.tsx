import { Community } from "@/src/atoms/communitiesAtom";
import { firestore } from "@/src/firebase/clientApp";
import useCommunityData from "@/src/hooks/useCommunityData";
import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
} from "@chakra-ui/react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaReddit } from "react-icons/fa";

const Recommendations: React.FC = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(false);
  const { communityStateValue, onJoinOrLeaveCommunity } = useCommunityData();

  const getCommunityRecommendations = async () => {
    try {
      const communitiesQuery = query(
        collection(firestore, "communities"),
        orderBy("numberOfMembers", "desc"),
        limit(5)
      );
      const communityDocs = await getDocs(communitiesQuery);
      const communities = communityDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCommunities(communities as Community[]);
      console.log("communities:", communities);
    } catch (error: any) {
      console.log("getCommunityRecommendations error: ", error);
    }
  };

  useEffect(() => {
    getCommunityRecommendations();
  }, []);

  return (
    <Flex
      direction="column"
      position="relative"
      bg="white"
      borderRadius={4}
      border="1px solid"
      borderColor="gray.300"
    >
      <Flex
        align="flex-end"
        color="white"
        padding="6px 10px"
        height="70px"
        borderRadius="4px 4px 0px 0px"
        fontWeight={700}
        bgImage="url(/images/recCommsArt)"
        backgroundSize="cover"
        bgGradient="linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0,0,0,0.75)),url(/images/recCommsArt.png)"
      >
        Top Communities
      </Flex>
      <Flex direction="column">
        {loading ? (
          <Stack mt={2} p={3}>
            <Flex justify="space-between" align="center">
              <SkeletonCircle size="10" />
              <Skeleton height="10px" width="70%" />
            </Flex>
            <Flex justify="space-between" align="center">
              <SkeletonCircle size="10" />
              <Skeleton height="10px" width="70%" />
            </Flex>
            <Flex justify="space-between" align="center">
              <SkeletonCircle size="10" />
              <Skeleton height="10px" width="70%" />
            </Flex>
          </Stack>
        ) : (
          <>
            {communities.map((community, index) => {
              const isJoined = !!communityStateValue.mySnippets.find(
                (snippet) => snippet.communityId === community.id
              );
              return (
                <Link key={community.id} href={`/r/${community.id}`}>
                  <Flex
                    align="center"
                    fontSize="10pt"
                    borderBottom="1px solid"
                    borderColor="gray.200"
                    padding="10px 12px"
                  >
                    <Flex width="69%" align="center">
                      <Flex width="15%">
                        <Text>{index + 1}</Text>
                      </Flex>
                      <Flex align="center" width="80%">
                        {community.imageURL ? (
                          <Image
                            src={community.imageURL}
                            alt="community"
                            borderRadius="full"
                            boxSize="28px"
                            mr={2}
                          />
                        ) : (
                          <Icon
                            as={FaReddit}
                            color="brand.100"
                            fontSize={30}
                            mr={2}
                          />
                        )}
                        <span
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {`r/${community.id}`}
                        </span>
                      </Flex>
                    </Flex>
                    <Box position="absolute" right="10px">
                      <Button
                        height="22px"
                        fontSize="8pt"
                        variant={isJoined ? "outline" : "solid"}
                        onClick={(event) => {
                          event.stopPropagation();
                          onJoinOrLeaveCommunity(community, isJoined);
                        }}
                      >
                        {isJoined ? "Joined" : "Join"}
                      </Button>
                    </Box>
                  </Flex>
                </Link>
              );
            })}
            <Box padding="10px 20px">
              <Button height="30px" width="100%">
                View All
              </Button>
            </Box>
          </>
        )}
      </Flex>
    </Flex>
  );
};
export default Recommendations;
