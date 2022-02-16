import React, { useState } from "react";
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
} from "native-base";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onHandleSignup = () => {
    if (email !== "" && password !== "") {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => console.log("Signup success"))
        .catch((err) => console.log(`Login err: ${err}`));
    }
    navigation.navigate("SignupFormScreen");
  };

  return (
    <Center flex={1} px="3">
      <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
          >
            Welcome
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: "warmGray.200",
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="lg"
          >
            Sign up to continue!
          </Heading>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Email ID</FormControl.Label>
              <Input
                borderColor="grey"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                borderColor="grey"
                type="password"
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </FormControl>
            {/* <FormControl>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input borderColor="grey" type="password" />
          </FormControl> */}
            <Button
              mt="2"
              size="lg"
              colorScheme="rgb(94,39,161)"
              onPress={onHandleSignup}
            >
              Sign up
            </Button>
          </VStack>
        </Box>
      </Center>
    </Center>
  );
};

export default SignupScreen;
