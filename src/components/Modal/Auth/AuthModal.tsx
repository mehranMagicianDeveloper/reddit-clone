import { authModalState } from "@/src/atoms/authModalAtom";
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";
import AuthInputs from "./AuthInputs";

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);

  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const handleOpen = () => {
    setModalState((prev) => ({
      ...prev,
      open: true,
    }));
  };

  const handleTitle = () => {
    if (modalState.view === "login") {
      return "Login";
    } else if (modalState.view === "signup") {
      return "Sign Up";
    } else if (modalState.view === "resetPassword") {
      return "Reset Password";
    }
  };

  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{handleTitle()}</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignContent="center"
            justifyContent="center"
          >
            <Flex
              direction="column"
              align="center"
              justify="center"
              width="70%"
              border="1px solid red"
            >
              {/* <OAuthButtons /> */}
              <AuthInputs />
              {/* <ResetPassword /> */}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AuthModal;
