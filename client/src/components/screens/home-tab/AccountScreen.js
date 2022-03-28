import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Center, Image, Text, VStack } from "native-base";
import { Box, Button, Center, Heading, Image, Text, VStack } from "native-base";
import { StyleSheet } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import OutlineButton from "../../UI/OutlineButton";
import { HasBuildingContext } from "../../contexts/HasBuildingContext";
import SolidOrangeButton from "../../UI/SolidOrangeButton";
import { AuthenticatedUserContext } from "../../contexts/AuthenticatedUserContext";

const AccountScreen = ({ navigation }) => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const { hasBuilding, setHasBuilding } = useContext(HasBuildingContext);

  const [photoURL, setPhotoURL] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    if (user) {
      setPhotoURL(user.photoURL);
      setFullName(user.displayName);
      console.log("Account Screen:", user.displayName);
      setPhotoURL(user.providerData[0].photoURL);
      setFullName(user.providerData[0].displayName);
      setEmail(user.providerData[0].email);
    }
  }, []);

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
          <Center>
            <Image
              mb={5}
              size={185}
              resizeMode={"contain"}
              borderRadius={100}
              source={{
                uri: photoURL,
              }}
              alt="Alternate Text"
              alt="Profile photo"
            />
            <Box h="100">
              <Heading mb="2" size="lg" textAlign="center">
                {fullName}
              </Heading>
              <Text mb="5" size="md" textAlign="center">
                {email}
              </Text>
            </Box>
          </Center>
          <Text mb={5} fontSize={16} fontWeight="bold" textAlign="center">
            {fullName}
          </Text>
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
