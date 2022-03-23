import React, { useContext, useState } from "react";
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
import { HasBuildingContext } from "../../contexts/HasBuildingContext";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { hasBuilding, setHasBuilding } = useContext(HasBuildingContext);

  const onHandleSignup = () => {
    if (email !== "" && password !== "") {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log("Signup success");
          setHasBuilding(false);
        })
        .catch((err) => console.log(`Login err: ${err}`));
    }
    // navigation.navigate("ParkingLocationScreen");
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
                Welcome
              </Heading>
              <Heading
                mt="1"
                _dark={{
                  color: "warmGray.200",
                }}
                color="#FD6B36"
                fontWeight="medium"
                size="lg"
              >
                Sign up to continue!
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
                  py={3}
                  borderRadius="20px"
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
                  borderColor="#FD6B36"
                  py={3}
                  borderRadius="20px"
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
                mt="5"
                size="lg"
                bg="#FD6B36"
                borderRadius="20px"
                colorScheme="rgb(94,39,161)"
                onPress={onHandleSignup}
              >
                <Text fontSize="16px" fontWeight="bold" color="white">
                  Sign up
                </Text>
              </Button>
            </VStack>
          </Box>
        </Center>
      </Center>
    </Box>
  );
};

export default SignupScreen;
