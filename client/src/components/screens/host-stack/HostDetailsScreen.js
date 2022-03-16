import React from "react";
import { Box, Center, Text } from "native-base";
import { SafeAreaView } from "react-native";

const HostDetailsScreen = ({ route, navigation }) => {
  const { type } = route.params;

  return (
    <SafeAreaView>
      <Center>
        <Text>HostDetailsScreen</Text>
      </Center>
    </SafeAreaView>
  );
};

export default HostDetailsScreen;