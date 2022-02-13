import React, { useLayoutEffect } from "react";
import { Box, Button, Center, Flex, Spacer, Text } from "native-base";
import { TouchableOpacity } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

const ParkingScreen = ({ navigation }) => {
  const onSignOut = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };
  return (
    <Flex h={40} alignItems="center">
      <Center size={250}>
        <Text>Work in progress...</Text>
      </Center>
      <Spacer />
      <Center size={250}>
        <Button onPress={onSignOut}>Sign out</Button>
      </Center>
    </Flex>
  );
};

export default ParkingScreen;
