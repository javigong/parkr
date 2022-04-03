import React from "react";
import { Box, Center, Text } from "native-base";
import { SafeAreaView } from "react-native";
import ParkingSpotDetailsCard from "../../cards/ParkingSpotDetailsCard";
import ActivitySpotDetailsCard from "../../cards/ActivitySpotDetailsCard";
import ActvExpiredSpotDetailsCard from "../../cards/ActvExpiredSpotDetailsCard";

const DetailsScreen = ({ route, navigation }) => {
  const { item, currentDate, type } = route.params;

  return (
    <>
      {type !== "inUse" && type !== "upcoming" && type !== "expired" ? (
        <ParkingSpotDetailsCard
          item={item}
          currentDate={currentDate}
          type={type}
          navigation={navigation}
        />
      ) : type !== "expired" ? (
        <ActivitySpotDetailsCard
          item={item}
          currentDate={currentDate}
          type={type}
          navigation={navigation}
        />
      ) : (
        <ActvExpiredSpotDetailsCard
          item={item}
          currentDate={currentDate}
          type={type}
          navigation={navigation}
        />
      )}
    </>
  );
};

export default DetailsScreen;
