import React, { useEffect, useState } from "react";
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
} from "native-base";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onHandleLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => console.log("Login success"))
        .catch((err) => console.log(`Login err: ${err}`));
    }
  };

  return (
    <Box flex="1" bg="white">
      <Center flex={1} px="3">
        <Center w="100%">
          <Box safeArea p="2" py="8" w="90%" maxW="290">
            <Center>
              <Heading
                size="xl"
                fontWeight="600"
                color="#FD6B36"
                _dark={{
                  color: "warmGray.50",
                }}
              >
                Welcome to Parkr
              </Heading>
              <Heading
                mt="1"
                _dark={{
                  color: "warmGray.200",
                }}
                color="#FD6B36"
                fontWeight="medium"
                size="md"
              >
                Sign in to continue!
              </Heading>
            </Center>
            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>
                  <Text fontWeight="bold" color="#FD6B36">
                    Email ID
                  </Text>
                </FormControl.Label>
                <Input
                  borderColor="#FD6B36"
                  borderRadius="20px"
                  py={3}
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
                <FormControl.Label>
                  <Text fontWeight="bold" color="#FD6B36">
                    Password
                  </Text>
                </FormControl.Label>
                <Input
                  type="password"
                  borderColor="#FD6B36"
                  borderRadius="20px"
                  py={3}
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={true}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
                <Link
                  _text={{
                    fontSize: "md",
                    fontWeight: "500",
                    color: "rgb(94,39,161)",
                  }}
                  alignSelf="flex-end"
                  mt="1"
                >
                  <Text fontWeight="bold" color="#FD6B36">
                    Forget Password?
                  </Text>
                </Link>
              </FormControl>
              <Button
                mt="2"
                size="lg"
                borderRadius="20px"
                bg="#FD6B36"
                colorScheme="rgb(94,39,161)"
                onPress={onHandleLogin}
              >
                <Text fontSize="16px" fontWeight="bold" color="white">
                  Sign in
                </Text>
              </Button>
              <HStack mt="6" justifyContent="center">
                <Text
                  fontSize="md"
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  I'm a new user.{" "}
                </Text>
                <Link
                  _text={{
                    color: "rgb(94,39,161)",
                    fontWeight: "medium",
                    fontSize: "md",
                  }}
                  href="#"
                  onPress={() => navigation.navigate("SignupScreen")}
                >
                  <Text fontWeight="bold" color="#FD6B36">
                    Sign Up
                  </Text>
                </Link>
              </HStack>
            </VStack>
          </Box>
        </Center>
      </Center>
    </Box>
  );
};

export default LoginScreen;
