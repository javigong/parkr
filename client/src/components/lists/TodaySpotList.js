import { FlatList } from "native-base";
import React from "react";
import ParkingSpotCard from "../cards/ParkingSpotCard";

const TodaySpotList = ({ data }) => {
  return (
    <FlatList
      my="2"
      data={data}
      renderItem={({ item }) => <ParkingSpotCard item={item} />}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default TodaySpotList;
