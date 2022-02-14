import React, { useLayoutEffect } from "react";
import { Button, Center, Text } from "native-base";
import { TouchableOpacity } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

const ParkingScreen = ({ navigation }) => {
  const onSignOut = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };
  return (
    <Center>
      <Text>ParkingScreen</Text>
      <Button onPress={onSignOut}>Sign out</Button>
    </Center>
  );
};

export default ParkingScreen;
