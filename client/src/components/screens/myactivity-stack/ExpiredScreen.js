import React from "react";
import { Box, Text } from "native-base";

const ExpiredScreen = ({ route, navigation }) => {
  const { type } = route.params;

  return (
    <SafeAreaView>
      <Center>
        <Text>ExpiredScreen</Text>
      </Center>
    </SafeAreaView>
  );
};

export default ExpiredScreen;