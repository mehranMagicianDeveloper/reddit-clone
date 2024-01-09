import { authModalState } from "@/src/atoms/authModalAtom";
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/src/firebase/clientApp";
import ResetPassword from "./ResetPassword";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);

  const [user, loading, error] = useAuthState(auth);

  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  useEffect(() => {
    if (user) handleClose();
    handleSavingUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleTitle = () => {
    if (modalState.view === "login") {
      return "Login";
    } else if (modalState.view === "signup") {
      return "Sign Up";
    } else if (modalState.view === "resetPassword") {
      return "Reset Password";
    }
  };

  const handleSavingUser = async () => {
    if (user) {
      const userDocREf = doc(firestore, "users", user.uid);
      const userDoc = await getDoc(userDocREf);
      if (userDoc.exists()) {
        return;
      }
      await setDoc(userDocREf, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        providerData: user.providerData,
      });
    }
  };

  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">{handleTitle()}</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            pb={6}
          >
            <Flex
              direction="column"
              align="center"
              justify="center"
              width="70%"
            >
              {modalState.view !== "resetPassword" ? (
                <>
                  <OAuthButtons />
                  <Text
                    mb={6}
                    fontSize="12pt"
                    fontWeight={700}
                    color="gray.500"
                  >
                    ---------- OR ----------
                  </Text>
                  <AuthInputs />
                </>
              ) : (
                <ResetPassword />
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AuthModal;
