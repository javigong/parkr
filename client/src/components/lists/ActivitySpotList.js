import { FlatList } from "native-base";
import React from "react";
import ActivitySpotCard from "../cards/ActivitySpotCard";
import HostSpotCard from "../cards/HostSpotCard";
import ParkingSpotCard from "../cards/ParkingSpotCard";

const ActivitySpotList = ({
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
          <ActivitySpotCard
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

export default ActivitySpotList;
