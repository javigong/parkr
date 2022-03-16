import { FlatList } from "native-base";
import React from "react";
import ParkingSpotCard from "../cards/ParkingSpotCard";

const ParkingSpotList = ({ data, currentDate, type, navigation }) => {
  return (
    <FlatList
      my="2"
      data={data}
      renderItem={({ item }) => <ParkingSpotCard item={item} currentDate={currentDate} type={type} navigation={navigation}/>}
      keyExtractor={(item) => item.idParkingSlot.toString()}
      showsVerticalScrollIndicator={true}
    />
  );
};

export default ParkingSpotList;
