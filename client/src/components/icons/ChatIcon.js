import React from "react";
import Svg, { Path, G, Defs, Rect, ClipPath } from "react-native-svg";

const ChatIcon = ({ color }) => {
  return (
    <Svg
      width="27"
      height="25"
      viewBox="0 0 27 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M19.7438 3.91074C14.8026 -0.298454 7.29925 0.525084 3.45607 6.10684C0.619444 10.316 1.07697 16.0808 4.55413 19.741C8.4888 23.8586 14.6196 24.3162 18.9203 21.205L24.502 23.2181C25.0511 23.4011 25.6001 22.7606 25.3256 22.2116L22.3059 17.1788C24.5935 12.7866 23.587 7.29639 19.7438 3.91074Z"
        stroke={color}
        strokeWidth="2"
        stroke-miterlimit="10"
      />
      <Path
        d="M13.1558 14.0677C14.1665 14.0677 14.9858 13.2484 14.9858 12.2376C14.9858 11.2269 14.1665 10.4075 13.1558 10.4075C12.145 10.4075 11.3257 11.2269 11.3257 12.2376C11.3257 13.2484 12.145 14.0677 13.1558 14.0677Z"
        fill={color}
      />
      <Path
        d="M7.29932 14.5253C8.56273 14.5253 9.58693 13.5011 9.58693 12.2376C9.58693 10.9742 8.56273 9.95004 7.29932 9.95004C6.03591 9.95004 5.01172 10.9742 5.01172 12.2376C5.01172 13.5011 6.03591 14.5253 7.29932 14.5253Z"
        fill={color}
      />
      <Path
        d="M18.2798 13.6102C19.0378 13.6102 19.6524 12.9957 19.6524 12.2376C19.6524 11.4796 19.0378 10.8651 18.2798 10.8651C17.5217 10.8651 16.9072 11.4796 16.9072 12.2376C16.9072 12.9957 17.5217 13.6102 18.2798 13.6102Z"
        fill={color}
      />
    </Svg>
  );
};

export default ChatIcon;
