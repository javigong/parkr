import React from "react";
import { Box, Center, Text } from "native-base";
import { SafeAreaView } from "react-native";

const DetailsScreen = ({ route }) => {
  const { type } = route.params;

  return (
    <SafeAreaView>
      <Center>
        <Text>DetailsScreen - {type}</Text>
      </Center>
    </SafeAreaView>
  );
};

export default DetailsScreen;
