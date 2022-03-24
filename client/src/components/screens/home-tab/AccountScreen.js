import React, { useContext } from "react";
import { Box, Button, Center, Text, VStack } from "native-base";
import { StyleSheet } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import OutlineButton from "../../UI/OutlineButton";
import { HasBuildingContext } from "../../contexts/HasBuildingContext";
import SolidOrangeButton from "../../UI/SolidOrangeButton";

const AccountScreen = ({ navigation }) => {
  const { hasBuilding, setHasBuilding } = useContext(HasBuildingContext);

  const onSignOut = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  const onChangeBld = () => {
    setHasBuilding(false);
  };

  return (
    <Center flex={1} w="100%" bg="white">
      <Box safeArea p="2" py="8" w="90%">
        <VStack>
          <OutlineButton buttonText="CHANGE BUILDING" onPress={onChangeBld} />
          <SolidOrangeButton buttonText="LOG OUT" onPress={onSignOut} />
        </VStack>
      </Box>
    </Center>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FD6B36",
  },
  tabContent: {
    textAlign: "center",
    height: "100%",
    color: "black",
    backgroundColor: "white",
    fontSize: 18,
  },
});
