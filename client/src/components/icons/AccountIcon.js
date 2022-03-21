import React from "react";
import Svg, { Path, G, Defs, Rect, ClipPath } from "react-native-svg";

const AccountIcon = ({ color }) => {
  return (
    <Svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M12.5454 11.709C15.4336 11.709 17.7749 9.36766 17.7749 6.47949C17.7749 3.59132 15.4336 1.25 12.5454 1.25C9.65724 1.25 7.31592 3.59132 7.31592 6.47949C7.31592 9.36766 9.65724 11.709 12.5454 11.709Z"
        stroke={color}
        strokeWidth="2"
        stroke-miterlimit="10"
      />
      <Path
        d="M1.72559 23.25C1.72559 18.6517 4.97148 14.9549 8.93868 14.9549H16.0616C20.0288 14.9549 23.2747 18.6517 23.2747 23.25H1.72559Z"
        stroke={color}
        strokeWidth="2"
        stroke-miterlimit="10"
      />
    </Svg>
  );
};

export default AccountIcon;
