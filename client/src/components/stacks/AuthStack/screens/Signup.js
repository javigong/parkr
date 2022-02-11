import * as React from "react";
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider } from "native-base";

const SignUpScreen = () => {
  return <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        {/* <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }}>
          Welcome
        </Heading> */}
        <Heading mt="1" _dark={{
        color: "warmGray.200"
      }} color="coolGray.600" fontWeight="medium" size="lg">
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
          </FormControl>
          <FormControl>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input borderColor="grey" type="password" />
          </FormControl>
          <Button mt="2" size="lg" colorScheme="rgb(94,39,161)">
            Sign in
          </Button>
        </VStack>
      </Box>
    </Center>;
};    

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
          <SignUpScreen />
      </Center>
    </NativeBaseProvider>
  );
}