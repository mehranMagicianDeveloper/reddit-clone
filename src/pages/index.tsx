import { Inter } from "next/font/google";
import PageContent from "../components/Layout/PageContent";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/clientApp";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { communityState } from "../atoms/communitiesAtom";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import usePosts from "../hooks/usePosts";
import { Post } from "../atoms/postAtom";
import PostLoader from "../components/Posts/PostLoader";
import { Stack } from "@chakra-ui/react";
import CreatePostLink from "../components/Community/CreatePostLink";
import PostItem from "../components/Posts/PostItem";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [user, loadingUesr] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const communityStateValue = useRecoilValue(communityState);
  const {
    postStateValue,
    setPostStateValue,
    onSelectPost,
    onDeletePost,
    onVote,
  } = usePosts();

  const buildUserHomeFeed = () => {};

  const buildNoUserFeed = async () => {
    setLoading(true);
    try {
      const postQuery = query(
        collection(firestore, "posts"),
        orderBy("postVotes", "desc"),
        limit(10)
      );

      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
    } catch (error: any) {
      console.log("buildNoUserFeed error: ", error);
    }
    setLoading(false);
  };

  const getUserPostVotes = () => {};

  useEffect(() => {
    if (!user && !loadingUesr) buildNoUserFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loadingUesr]);

  return (
    <PageContent>
      <>
        <CreatePostLink />
        {loading ? (
          <PostLoader />
        ) : (
          <Stack>
            {postStateValue.posts.map((post) => (
              <PostItem
                key={post.id}
                post={post}
                onSelectPost={onSelectPost}
                onVote={onVote}
                onDeletePost={onDeletePost}
                userVoteValue={
                  postStateValue.postVotes.find(
                    (postVote) => postVote.postId === post.id!
                  )?.voteValue
                }
                userIsCreator={user?.uid === post.creatorId}
              />
            ))}
          </Stack>
        )}
      </>
      <>{/* {Recommendations} */}</>
    </PageContent>
  );
}
