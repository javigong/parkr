import React from "react";
import { Box, Center, Text } from "native-base";
import { SafeAreaView } from "react-native";
import ParkingSpotDetailsCard from "../../cards/ParkingSpotDetailsCard";

const DetailsScreen = ({ route, navigation }) => {
  const { item, currentDate, type } = route.params;

  console.log(item);

  return (
    <ParkingSpotDetailsCard
      item={item}
      currentDate={currentDate}
      type={type}
      navigation={navigation}
    />
  );
};

export default DetailsScreen;
 