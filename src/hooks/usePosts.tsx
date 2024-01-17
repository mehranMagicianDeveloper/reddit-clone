import React from "react";
import { useRecoilState } from "recoil";
import { postState } from "../atoms/postAtom";

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);

  const onVote = async () => {};
  const onSelectPost = () => {};
  const onDeletePost = async () => {};

  return {
    postStateValue,
    setPostStateValue,
  };
};
export default usePosts;
