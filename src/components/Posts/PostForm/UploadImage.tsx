/* eslint-disable @next/next/no-img-element */
import { Button, Flex, Image, Stack } from "@chakra-ui/react";
import React, { useRef } from "react";

type UploadImageProps = {
  selectedFile?: string;
  onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedTab: (value: string) => void;
  setSeletedFile: (value: string) => void;
};

const UploadImage: React.FC<UploadImageProps> = ({
  selectedFile,
  onSelectImage,
  setSelectedTab,
  setSeletedFile,
}) => {
  const selectedFileRef = useRef<HTMLInputElement>(null);

  return (
    <Flex direction="column" align="center" justify="center" width="100%">
      {selectedFile ? (
        <>
          <Image
            src={selectedFile}
            alt="selectedFile"
            maxWidth="400px"
            maxHeight="400px"
          />
          <Stack direction="row" mt={4}>
            <Button
              height="28px"
              onClick={() => {
                setSelectedTab("Post");
              }}
            >
              Back to Post
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setSeletedFile("");
              }}
              height="28px"
            >
              Remove
            </Button>
          </Stack>
        </>
      ) : (
        <Flex
          align="center"
          justify="center"
          border="1px solid"
          borderRadius={4}
          borderColor="gray.200"
          width="100%"
          height="200px"
        >
          <Button
            variant="outline"
            height="28px"
            onClick={() => {
              selectedFileRef.current?.click();
            }}
          >
            Upload
          </Button>

          <input
            ref={selectedFileRef}
            type="file"
            hidden
            onChange={onSelectImage}
          />
        </Flex>
      )}
    </Flex>
  );
};
export default UploadImage;
