import React, { useState } from "react";
import { Button, View } from "native-base";

const ParkingTypeButton = (props) => {
  const [colorState, setColorState] = useState(false);

  const colorHandler = () => {
    setColorState(!colorState);
  };

  return (
    <View style={{ display: "flex", flexDirection: "row" }}>
      <Button
        borderRadius="17"
        m="1.5"
        alignSelf="center"
        _text={colorState ? { color: "white" } : { color: "gray.500" }}
        backgroundColor={colorState ? "orange.400" : "gray.300"}
        onPress={colorHandler}
      >
        {props.buttonText}
      </Button>
    </View>
  );
};

export default ParkingTypeButton;
