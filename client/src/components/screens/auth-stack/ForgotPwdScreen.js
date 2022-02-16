import React from "react";
import { Text, Center, Box, VStack } from "native-base";

const ForgotPwdScreen = ({ navigation }) => {
  return (
    <>
      <Center>
        <Box>
          <VStack flex={1} space={4} justifyContent="center">
            <Text fontSize={25}>Forgot Password</Text>
          </VStack>
        </Box>
      </Center>
    </>
  );
};

export default ForgotPwdScreen;
