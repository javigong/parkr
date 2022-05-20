import { FlatList } from "native-base";
import React from "react";
import HostSpotCard from "../cards/HostSpotCard";
import ParkingSpotCard from "../cards/ParkingSpotCard";

const ParkingSpotList = ({
  data,
  currentDate,
  type,
  navigation,
  startDate,
  endDate,
}) => {
  return (
    <>
      <FlatList
        my="2"
        data={data}
        renderItem={({ item }) => (
          <ParkingSpotCard
            item={item}
            currentDate={currentDate}
            startDate={startDate}
            endDate={endDate}
            type={type}
            navigation={navigation}
          />
        )}
        keyExtractor={(item) => item.idParkingSlot.toString()}
        showsVerticalScrollIndicator={true}
      />
    </>
  );
};

export default ParkingSpotList;
