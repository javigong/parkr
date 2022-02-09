import { Center, Text, Spinner } from 'native-base';
import React from 'react';

const Loading = () => {
  return (
    <Center>
      <Text><Spinner color="blue.500" />Loading results.</Text>
    </Center>
  )
}

export default Loading;