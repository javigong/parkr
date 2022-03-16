import React from "react";
import { Box, Center, Text } from "native-base";
import { SafeAreaView } from "react-native";

const ProfileScreen = ({ route, navigation }) => {
  const { type } = route.params;

  return (
    <SafeAreaView>
      <Center>
        <Text>ProfileScreen</Text>
      </Center>
    </SafeAreaView>
  );
};

export default ProfileScreen;