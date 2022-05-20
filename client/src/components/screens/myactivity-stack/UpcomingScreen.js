import React from "react";
import { Box, Text } from "native-base";

const UpcomingScreen = ({ route, navigation }) => {
  const { type } = route.params;

  return (
    <SafeAreaView>
      <Center>
        <Text>UpcomingScreen</Text>
      </Center>
    </SafeAreaView>
  );
};

export default UpcomingScreen;