import React from "react";
import { Text, Center, Box, VStack, Button } from "native-base";

const IndexScreen = ({ navigation }) => {
  return (
    <>
      <Center>
        <Box>
          <VStack flex={1} space={4} justifyContent="center">
            <Text fontSize={25}>Welcome to Parkr</Text>
            <Button
              py={3}
              px={1}
              size="lg"
              backgroundColor="rgb(94,39,161)"
              onPress={() => navigation.navigate("LoginScreen")}
            >
              Login
            </Button>
            <Button
              py={3}
              px={1}
              size="lg"
              backgroundColor="rgb(94,39,161)"
              onPress={() => navigation.navigate("SignupScreen")}
            >
              Signup
            </Button>
          </VStack>
        </Box>
      </Center>
    </>
  );
};

export default IndexScreen;
