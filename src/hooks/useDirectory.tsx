import React from "react";
import { useRecoilState } from "recoil";
import { directoryMenuState } from "../atoms/directoryMenuAtom";

const useDirectory = () => {
  const [directoryState, setDirecotyState] = useRecoilState(directoryMenuState);

  return {
    directoryState,
  };
};
export default useDirectory;
