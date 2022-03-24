import React from "react";
import Svg, { Path } from "react-native-svg";

const ParkIcon = ({ color }) => {
  return (
    <Svg
      width="21"
      height="25"
      viewBox="0 0 21 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M6.22612 21.771V17.371H14.0261C14.4261 17.371 14.7261 17.371 15.1261 17.2794C15.5261 17.1877 15.9261 17.096 16.3261 16.9127C16.7261 16.7294 17.1261 16.546 17.4261 16.271C17.8261 15.996 18.1261 15.6294 18.3261 15.2627C18.6261 14.896 18.8261 14.4377 18.9261 13.8877C19.1261 13.3377 19.1261 12.7877 19.1261 12.146V6.92104C19.1261 6.55438 19.1261 6.18771 19.0261 5.82105C18.9261 5.45438 18.8261 4.99605 18.6261 4.62938C18.5261 4.26271 18.3261 3.80438 18.0261 3.52938C17.7261 3.16271 17.4261 2.88771 17.0261 2.61271C16.6261 2.33771 16.2261 2.15438 15.7261 1.97104C15.2261 1.78771 14.6261 1.69604 14.0261 1.69604H7.22612C6.92612 1.69604 6.52612 1.69604 6.12612 1.78771C5.72612 1.87938 5.32612 1.97104 5.02612 2.15438C4.62612 2.33771 4.22612 2.52104 3.82612 2.79604C3.52612 3.07105 3.22612 3.43771 2.92612 3.80438C2.62612 4.26271 2.42612 4.62938 2.22612 5.17938C2.12612 5.72938 2.02612 6.27938 2.02612 6.92104V21.771C2.02612 22.7794 2.92612 23.696 4.12612 23.696C5.22612 23.6044 6.22612 22.7794 6.22612 21.771ZM15.1261 11.871C15.1261 12.3294 15.0261 12.696 14.8261 12.8794C14.6261 13.1544 14.2261 13.246 13.8261 13.246H6.22612V7.10438C6.22612 6.64605 6.32612 6.27938 6.62612 6.09605C6.82612 5.82105 7.22612 5.72938 7.72612 5.72938H13.8261C14.2261 5.72938 14.6261 5.82105 14.8261 6.09605C15.0261 6.37105 15.1261 6.64605 15.1261 7.19605V11.871V11.871Z"
        stroke={color}
        strokeWidth="2"
        stroke-miterlimit="10"
      />
    </Svg>
  );
};

export default ParkIcon;