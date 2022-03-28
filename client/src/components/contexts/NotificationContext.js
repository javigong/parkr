import React, { createContext, useState } from "react";

export const NotificationContext = createContext({});

export const NotificationProvider = ({ children }) => {
  const [enable, setEnable] = useState(true);

  return (
    <NotificationContext.Provider value={{ enable, setEnable }}>
      {children}
    </NotificationContext.Provider>
  );
};
