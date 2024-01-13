import {
  Flex,
  Text,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { User, signOut } from "firebase/auth";
import React from "react";
import { FaRedditSquare } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { IoSparkles } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin } from "react-icons/md";
import { auth } from "@/src/firebase/clientApp";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { authModalState } from "@/src/atoms/authModalAtom";
import { communityState } from "@/src/atoms/communitiesAtom";

type UserMenuProps = {
  user?: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const resetCommunityState = useResetRecoilState(communityState);
  const setModalState = useSetRecoilState(authModalState);

  const logOut = () => {
    signOut(auth);
    resetCommunityState();
  };

  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0px 6px"
        borderRadius={4}
        _hover={{ outline: "1px solid ", outlineColor: "gray.200" }}
      >
        <Flex align="center">
          {user ? (
            <>
              <Icon as={FaRedditSquare} fontSize={24} mr={1} color="gray.300" />
              <Flex
                direction="column"
                display={{ base: "none", md: "flex" }}
                fontSize="8pt"
                align="flex-start"
                mr={8}
              >
                <Text fontWeight={700}>
                  {user?.displayName || user.email?.split("@")[0]}
                </Text>
                <Flex>
                  <Icon as={IoSparkles} color="brand.100" mr={1} />
                  <Text color="gray.400">1 karma</Text>
                </Flex>
              </Flex>
            </>
          ) : (
            <Icon fontSize={24} mr={1} color="gray.400" as={VscAccount} />
          )}
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      {user ? (
        <MenuList>
          <MenuItem
            fontSize="10pt"
            fontWeight={700}
            _hover={{ bg: "blue.400", color: "white" }}
          >
            <Flex align="center">
              <Icon fontSize={20} mr={1} as={CgProfile} />
              Profile
            </Flex>
          </MenuItem>
          <MenuDivider />
          <MenuItem
            fontSize="10pt"
            fontWeight={700}
            _hover={{ bg: "blue.400", color: "white" }}
            onClick={logOut}
          >
            <Flex align="center">
              <Icon fontSize={20} mr={1} as={MdOutlineLogin} />
              Logout
            </Flex>
          </MenuItem>
        </MenuList>
      ) : (
        <MenuList>
          <MenuItem
            fontSize="10pt"
            fontWeight={700}
            _hover={{ bg: "blue.400", color: "white" }}
            onClick={() =>
              setModalState((prev) => ({ ...prev, open: true, view: "login" }))
            }
          >
            <Flex align="center">
              <Icon fontSize={20} mr={1} as={MdOutlineLogin} />
              Log In / Sing Up
            </Flex>
          </MenuItem>
        </MenuList>
      )}
    </Menu>
  );
};
export default UserMenu;
