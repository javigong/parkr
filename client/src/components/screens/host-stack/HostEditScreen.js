import React from "react";
import { Box, Center, Text } from "native-base";
import { SafeAreaView } from "react-native";

const HostEditScreen = ({ route, navigation }) => {
  const { type } = route.params;

  return (
    <SafeAreaView>
      <Center>
        <Text>HostEditScreen</Text>
      </Center>
    </SafeAreaView>
  );
};

export default HostEditScreen;