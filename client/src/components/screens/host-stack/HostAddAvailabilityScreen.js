import React from "react";
import { Box, Center, Text } from "native-base";
import { SafeAreaView } from "react-native";

const HostAddAvailabilityScreen = ({ route, navigation }) => {
  const { type } = route.params;

  return (
    <SafeAreaView>
      <Center>
        <Text>HostAddAvailabilityScreen</Text>
      </Center>
    </SafeAreaView>
  );
};

export default HostAddAvailabilityScreen;