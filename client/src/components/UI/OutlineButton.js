import { Button } from "native-base";

const OutlineButton = (props) => {
  return (
    <Button
      colorScheme="orange"
      variant="outline"
      borderRadius="20"
      m="1.5"
      size="lg"
    >
      {props.buttonText}
    </Button>
  );
};

export default OutlineButton;
