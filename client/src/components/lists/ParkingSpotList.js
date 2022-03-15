import { FlatList } from "native-base";
import React from "react";
import ParkingSpotCard from "../cards/ParkingSpotCard";

const ParkingSpotList = ({ data, startDate, endDate }) => {
  return (
    <FlatList
      my="2"
      data={data}
      renderItem={({ item }) => <ParkingSpotCard item={item} />}
      keyExtractor={(item) => item.idParkingSlot.toString()}
      showsVerticalScrollIndicator={true}
    />
  );
};

export default ParkingSpotList;
