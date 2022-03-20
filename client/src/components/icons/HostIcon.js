import React from "react";
import Svg, { Path, G, Defs, Rect, ClipPath } from "react-native-svg";

const HostIcon = ({ color }) => {
  return (
    <Svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clip-path="url(#clip0_644_3328)">
        <Path
          d="M9.03098 4.55396V2.55396L15.751 7.05395L9.03098 11.554V9.55395H4.55098C2.95098 9.55395 1.75098 8.4111 1.75098 7.05395C1.75098 5.62538 3.03098 4.55396 4.55098 4.55396H9.03098Z"
          stroke={color}
          stroke-width="2"
          stroke-miterlimit="10"
        />
        <Path
          d="M14.4915 8.55396V10.7625H19.0623C21.067 10.7625 22.751 11.9895 22.751 13.5846C22.751 15.1184 21.1472 16.4067 19.0623 16.4067H14.4915V18.554L5.75098 13.5233L14.4915 8.55396Z"
          stroke={color}
          stroke-width="2"
          stroke-miterlimit="10"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_644_3328">
          <Rect
            width="23.9143"
            height="24"
            fill="white"
            transform="translate(0.0429688 0.25)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default HostIcon;
