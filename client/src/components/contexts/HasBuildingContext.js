import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const HasBuildingContext = createContext({});

export const HasBuildingProvider = ({ children }) => {
  const [hasBuilding, setHasBuilding] = useState("");

  const storeHasBuilding = async () => {
    try {
      await AsyncStorage.setItem("hasBuilding", hasBuilding);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    storeHasBuilding;
  }, [hasBuilding]);

  return (
    <HasBuildingContext.Provider value={{ hasBuilding, setHasBuilding }}>
      {children}
    </HasBuildingContext.Provider>
  );
};
