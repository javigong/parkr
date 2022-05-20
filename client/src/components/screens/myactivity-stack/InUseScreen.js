import React from "react";
import { Box, Text } from "native-base";

const InUseScreen = ({ route, navigation }) => {
  const { type } = route.params;

  return (
    <SafeAreaView>
      <Center>
        <Text>InUseScreen</Text>
      </Center>
    </SafeAreaView>
  );
};

export default InUseScreen;