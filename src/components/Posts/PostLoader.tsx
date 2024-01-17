import {
  Box,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";
import React from "react";

type PostLoaderProps = {};

const PostLoader: React.FC<PostLoaderProps> = () => {
  return (
    <Stack spacing={6}>
      <Box padding="6" boxShadow="lg" bg="white">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
        <Skeleton mt={4} height="300px" />
      </Box>
      <Box padding="6" boxShadow="lg" bg="white">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
        <Skeleton mt={4} height="300px" />
      </Box>
      <Box padding="6" boxShadow="lg" bg="white">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
        <Skeleton mt={4} height="300px" />
      </Box>
    </Stack>
  );
};
export default PostLoader;
