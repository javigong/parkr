import React, { createContext, useState} from 'react';

export const HasBuildingContext = createContext({});

export const HasBuildingProvider = ({ children }) => {
  const [hasBuilding, setHasBuilding] = useState(false);

  return (
    <HasBuildingContext.Provider value={{ hasBuilding, setHasBuilding }}>
      {children}
    </HasBuildingContext.Provider>
  );
};