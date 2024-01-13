import { Community, CommunitySnippet } from "@/src/atoms/communitiesAtom";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { communityState } from "../atoms/communitiesAtom";
import { auth, firestore } from "../firebase/clientApp";

const useCommunityData = () => {
  const [user] = useAuthState(auth);
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);

  const [loading, setLoading] = useState(false);
  const [errorm, setError] = useState("");

  const onJoinOrLeaveCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    // is user singed in
    // if not open auth modal

    if (isJoined) {
      leaveCommunity(communityData.id);
      return;
    }
    joinCommunity(communityData);
  };

  const getMySnippets = async () => {
    try {
      setLoading(true);
      const snippetDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippets`)
      );
      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: snippets as CommunitySnippet[],
      }));
      console.log("snippets: ", snippets);
      setLoading(false);
    } catch (error) {
      console.log("getMySnippetsError", error);
    }
  };

  const joinCommunity = (communityData: Community) => {
    // batch write
    // creating a new community snippet
    // update the number of members
    // update ui witch means that you must update recoil state
  };

  const leaveCommunity = (communityId: string) => {};

  useEffect(() => {
    if (!user) return;
    getMySnippets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading,
  };
};
export default useCommunityData;
