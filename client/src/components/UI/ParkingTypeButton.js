import React, { useState } from "react";
import { Button, View } from "native-base";

const ParkingTypeButton = (props) => {
  const [colorState, setColorState] = useState(false);

  const colorHandler = () => {
    setColorState(!colorState);

    switch (props.buttonText) {
      case "Handicap":
        props.setParkingTypeFilter(1);
        break;
      case "Large":
        props.setParkingTypeFilter(2);
        break;
      case "EV Charger":
        props.setParkingTypeFilter(3);
        break;
      case "Motorcycle":
        props.setParkingTypeFilter(4);
        break;
      default:
        props.setParkingTypeFilter(0);
    }
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
