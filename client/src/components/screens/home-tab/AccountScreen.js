import React from "react";
import { Box, Button, Center, Text, VStack } from "native-base";
import { StyleSheet } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

const AccountScreen = ({ navigation }) => {
  const onSignOut = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  return (
    <Center flex={1} w="100%">
      <Box safeArea p="2" py="8" w="90%">
        <VStack>
          <Button
            colorScheme="rgb(253,107,54)"
            height={42}
            width="100%"
            mt="2"
            size="lg"
            borderRadius={20}
            onPress={onSignOut}
          >
            <Text color="white" fontWeight="bold">
              Log Out
            </Text>
          </Button>
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