import { Button } from "native-base";

const SolidOrangeButton = (props) => {
  return (
    <Button
      bg="#FD6B36"
      borderRadius="20"
      _text={{ color: "white" }}
      variant="solid"
      m="1.5"
      size="lg"
      width={props.width}
      onPress={props.onPress}
    >
      {props.buttonText}
    </Button>
  );
};

export default SolidOrangeButton;
