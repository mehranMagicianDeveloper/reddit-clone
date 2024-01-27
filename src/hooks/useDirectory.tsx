import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  DirectoryMenuItem,
  directoryMenuState,
} from "../atoms/directoryMenuAtom";
import { useRouter } from "next/router";
import { communityState } from "../atoms/communitiesAtom";
import { FaReddit } from "react-icons/fa";

const useDirectory = () => {
  const [directoryState, setDirecotyState] = useRecoilState(directoryMenuState);
  const communityStateValue = useRecoilValue(communityState);
  const router = useRouter();

  const onSelectedMenuItem = (menuItem: DirectoryMenuItem) => {
    setDirecotyState((prev) => ({
      ...prev,
      selectedMenuItem: menuItem,
    }));
    router.push(menuItem.link);
    if (directoryState.isOpen) {
      toggleMenuOpen();
    }
  };

  const toggleMenuOpen = () => {
    setDirecotyState((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
    }));
  };

  useEffect(() => {
    const { currentCommunity } = communityStateValue;
    if (currentCommunity) {
      setDirecotyState((prev) => ({
        ...prev,
        selectedMenuItem: {
          displayText: `r/${currentCommunity.id}`,
          link: `/r/${currentCommunity.id}`,
          icon: FaReddit,
          iconColor: "blue.500",
          imageURL: currentCommunity.imageURL,
        },
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [communityStateValue.currentCommunity]);

  return {
    directoryState,
    toggleMenuOpen,
    onSelectedMenuItem,
  };
};
export default useDirectory;
