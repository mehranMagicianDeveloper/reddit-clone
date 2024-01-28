import { Community } from "@/src/atoms/communitiesAtom";
import { firestore } from "@/src/firebase/clientApp";
import useCommunityData from "@/src/hooks/useCommunityData";
import { Flex } from "@chakra-ui/react";
import firebase from "firebase/compat/app";
import { collection, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Recommendations: React.FC = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(false);
  const { communityStateValue, onJoinOrLeaveCommunity } = useCommunityData();

  const getCommunityRecommendations = async () => {
    try {
      const communitiesQuery = query(collection(firestore, "communities"));
    } catch (error: any) {
      console.log("getCommunityRecommendations error: ", error);
    }
  };

  useEffect(() => {
    getCommunityRecommendations();
  }, []);

  return (
    <Flex>
      <Flex></Flex>
    </Flex>
  );
};
export default Recommendations;
