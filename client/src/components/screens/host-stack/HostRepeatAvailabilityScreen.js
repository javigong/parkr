import React from "react";
import { Box, Center, Text } from "native-base";
import { SafeAreaView } from "react-native";

const HostRepeatAvailabilityScreen = ({ route, navigation }) => {
  const { type } = route.params;

  return (
    <SafeAreaView>
      <Center>
        <Text>HostRepeatAvailabilityScreen</Text>
      </Center>
    </SafeAreaView>
  );
};

export default HostRepeatAvailabilityScreen;