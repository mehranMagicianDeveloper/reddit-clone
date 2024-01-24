import { Post, postState } from "@/src/atoms/postAtom";
import { firestore } from "@/src/firebase/clientApp";
import {
  Box,
  Flex,
  Text,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import {
  Timestamp,
  collection,
  doc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  where,
  writeBatch,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import CommentInput from "./CommentInput";
import CommentItem, { Comment } from "./CommentItem";

type CommentsProps = {
  user?: User;
  selectedPost: Post;
  communityId: string;
};

const Comments: React.FC<CommentsProps> = ({
  user,
  selectedPost,
  communityId,
}) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [createLoading, setCreateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const setPostState = useSetRecoilState(postState);

  const onCreateComment = async (commentText: string) => {
    setCreateLoading(true);
    //  create comment document
    //  update post comment number + 1
    try {
      const batch = writeBatch(firestore);

      const commentDocRef = doc(collection(firestore, "comments"));

      const newComment: Comment = {
        id: commentDocRef.id,
        creatorId: user!.uid,
        creatorDisplayText: user!.email!.split("@")[0],
        communityId: communityId,
        postId: selectedPost.id!,
        postTitle: selectedPost.title,
        text: commentText,
        createdAt: serverTimestamp() as Timestamp,
      };
      batch.set(commentDocRef, newComment);

      newComment.createdAt = { seconds: Date.now() / 1000 } as Timestamp;

      const postDocRef = doc(firestore, "posts", selectedPost.id!);
      batch.update(postDocRef, {
        numberOfComments: increment(1),
      });

      await batch.commit();

      //  update client state
      setCommentText("");

      setComments((prev) => [newComment, ...prev]);

      setPostState((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComments: prev.selectedPost?.numberOfComments! + 1,
        } as Post,
      }));
    } catch (error: any) {
      console.log("onCreateComment error", error);
    }
    setCreateLoading(false);
  };

  const onDeleteComment = async (comment: Comment) => {
    setDeleteLoading(true);
    // delete comment document
    // update post comment number -1

    try {
    } catch (error: any) {
      console.log("onDeleteComment error", error);
    }
    // update client state
    setDeleteLoading(false);
  };

  const getPostComments = async () => {
    try {
      const commentsQuery = query(
        collection(firestore, "comments"),
        where("postId", "==", selectedPost.id),
        orderBy("createdAt", "desc")
      );
      const commentDocs = await getDocs(commentsQuery);
      const comments = commentDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setComments(comments as Comment[]);
    } catch (error: any) {
      console.log("getPostComments error", error);
    }
    setFetchLoading(false);
  };

  useEffect(() => {
    if (!selectedPost) return;
    getPostComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPost]);

  return (
    <Box bg="white" borderRadius="0px 0px 4px 4px" padding={2}>
      <Flex
        direction="column"
        pl={10}
        pr={4}
        mb={6}
        fontSize="10pt"
        width="100%"
      >
        {!fetchLoading && (
          <CommentInput
            commentText={commentText}
            setCommentText={setCommentText}
            user={user}
            createLoading={createLoading}
            onCreateComment={onCreateComment}
          />
        )}
      </Flex>
      <Stack spacing={6} padding={2}>
        {fetchLoading ? (
          <>
            {[0, 1, 2].map((i) => (
              <Box key={i} padding={6} bg="white">
                <SkeletonCircle size="10" />
                <SkeletonText mt="4" noOfLines={2} spacing="4" />
              </Box>
            ))}
          </>
        ) : (
          <>
            {comments.length === 0 ? (
              <Flex
                direction="column"
                justify="center"
                align="center"
                borderTop="1px solid"
                borderColor="gray.100"
                padding={20}
              >
                <Text fontWeight={700} opacity={0.3}>
                  No Comments Yet
                </Text>
              </Flex>
            ) : (
              <>
                {comments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    onDeleteComment={onDeleteComment}
                    loadingDelete={deleteLoading}
                    userId={user?.uid as string}
                  />
                ))}
              </>
            )}
          </>
        )}
      </Stack>
    </Box>
  );
};
export default Comments;
