import React from "react";

import { Pressable } from "native-base";

const ChooseCarRadioButton = (prop) => {

  return (
 
    <Pressable borderWidth={2} borderColor="#FD6B36" borderRadius={20} padding={3} height={2} alignSelf="center" mt={2} bg={prop.bg}>
    </Pressable>
  );
};

export default ChooseCarRadioButton;

