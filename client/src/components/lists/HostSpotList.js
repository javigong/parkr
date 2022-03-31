import { FlatList } from "native-base";
import React from "react";
import HostSpotCard from "../cards/HostSpotCard";
import ParkingSpotCard from "../cards/ParkingSpotCard";

const HostSpotList = ({
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
          <HostSpotCard
            item={item}
            currentDate={currentDate}
            startDate={startDate}
            endDate={endDate}
            type={type}
            navigation={navigation}
          />
        )}
        keyExtractor={(item) => item.rsvparkingslotid.toString()}
        showsVerticalScrollIndicator={true}
      />
    </>
  );
};

export default HostSpotList;
