import * as React from "react";
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider } from "native-base";

const LoginScreen = () => {
  return <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        {/* <Heading size="xl" fontWeight="600" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }}>
          Welcome to Parkr
        </Heading> */}
        <Heading mt="1" _dark={{
        color: "warmGray.200"
      }} color="coolGray.600" fontWeight="medium" size="md">
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email ID</FormControl.Label>
            <Input borderColor="grey" />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input borderColor="grey" type="password" />
            <Link _text={{
            fontSize: "md",
            fontWeight: "500",
            color: "rgb(94,39,161)"
          }} alignSelf="flex-end" mt="1">
              Forget Password?
            </Link>
          </FormControl>
          <Button mt="2" size="lg" colorScheme="rgb(94,39,161)">
            Sign in
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text fontSize="md" color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
              I'm a new user.{" "}
            </Text>
            <Link _text={{
            color: "rgb(94,39,161)",
            fontWeight: "medium",
            fontSize: "md"
          }} href="#">
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>;
};

    export default () => {
        return (
          <NativeBaseProvider>
            <Center flex={1} px="3">
                <LoginScreen />
            </Center>
          </NativeBaseProvider>
        );
    };