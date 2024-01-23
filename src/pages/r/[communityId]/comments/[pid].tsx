import { communityState } from "@/src/atoms/communitiesAtom";
import About from "@/src/components/Community/About";
import PageContent from "@/src/components/Layout/PageContent";
import PostItem from "@/src/components/Posts/PostItem";
import { auth } from "@/src/firebase/clientApp";
import usePosts from "@/src/hooks/usePosts";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";

const PostPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const { postStateValue, setPostStateValue, onDeletePost, onVote } =
    usePosts();

  const fetchPost = async () => {};

  useEffect(() => {
    if (!postStateValue.selectedPost) {
      return;
    }
    fetchPost();
  });

  return (
    <PageContent>
      <>
        {postStateValue.selectedPost && (
          <PostItem
            post={postStateValue.selectedPost!}
            userIsCreator={user?.uid === postStateValue.selectedPost?.creatorId}
            userVoteValue={
              postStateValue.postVotes.find(
                (vote) => vote.postId === postStateValue.selectedPost?.id
              )?.voteValue
            }
            onVote={onVote}
            onDeletePost={onDeletePost}
          />
        )}

        {/* {comments} */}
      </>
      <></>
    </PageContent>
  );
};
export default PostPage;
