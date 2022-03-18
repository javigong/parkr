import React from "react";
import ParkingSpotDetailsCard from "../../cards/ParkingSpotDetailsCard";

const HostDetailsScreen = ({ route, navigation }) => {
  const { item, currentDate, type } = route.params;

  return (
    <ParkingSpotDetailsCard
      item={item}
      currentDate={currentDate}
      type={type}
      navigation={navigation}
    />
  );
};

export default HostDetailsScreen;