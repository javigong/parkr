import React, { useState } from "react";
import { Button } from "native-base";

const ParkingTypeButton = (props) => {
  const [colorState, setColorState] = useState(false);

  const colorHandler = () => {
    setColorState(!colorState);
  };

  return (
    <Button
      borderRadius="17"
      width="1/4"
      m="1.5"
      alignSelf="center"
      width="fitContent"
      _text={colorState ? { color: "white" } : { color: "gray.500" }}
      backgroundColor={colorState ? "orange.400" : "gray.300"}
      onPress={colorHandler}
    >
      {props.buttonText}
    </Button>
  );
};

export default ParkingTypeButton;
