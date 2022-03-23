import React, { createContext, useState} from 'react';

export const ParkingLotContext = createContext({});

export const ParkingLotProvider = ({ children }) => {
  const [parkingLot, setParkingLot] = useState(false);

  return (
    <ParkingLotContext.Provider value={{ parkingLot, setParkingLot }}>
      {children}
    </ParkingLotContext.Provider>
  );
};