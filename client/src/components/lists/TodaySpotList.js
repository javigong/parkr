import { FlatList } from "native-base";
import React from "react";
import ParkingSpotCard from "../cards/ParkingSpotCard";

const data = [
  {
    id: "1",
    ownerInitials: "FH",
    spotNumber: "10",
    type: "motorcycle",
    startDate: "Feb 20",
    startTime: "06:00",
    endDate: null,
    endTime: null,
    price: "1.50",
  },
  {
    id: "2",
    ownerInitials: "DF",
    spotNumber: "25",
    type: "ev",
    startDate: "Feb 20",
    startTime: "06:00",
    endDate: null,
    endTime: null,
    price: "4.50",
  },
  {
    id: "3",
    ownerInitials: "AW",
    spotNumber: "57",
    type: "standard",
    startDate: "Feb 20",
    startTime: "11:30",
    endDate: null,
    endTime: null,
    price: "2.00",
  },
  
];

const TodaySpotList = () => {
  return (
    <FlatList
    my="2"
      data={data}
      renderItem={({ item }) => (
        <ParkingSpotCard
          item={item}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default TodaySpotList;
