import { FlatList } from "native-base";
import React from "react";
import ParkingSpotCard from "../cards/ParkingSpotCard";

const TodaySpotList = ({ data, currentDate }) => {
  return (
    <FlatList
      my="2"
      data={data}
      renderItem={({ item }) => <ParkingSpotCard item={item} currentDate={currentDate} />}
      keyExtractor={(item) => item.idParkingSlot.toString()}
      showsVerticalScrollIndicator={true}
    />
  );
};

export default TodaySpotList;
