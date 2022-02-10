import React from 'react';
import { Text, Center, Box, VStack, Button } from 'native-base';

const IndexScreen = () => {
    return (
        <>
        <Center>
            <Box>
              <VStack flex={1} space={4} justifyContent="center"> 
                <Text fontSize={25}>Welcome to Parkr</Text>
                <Button py={3} px={1} size="lg" backgroundColor="emerald.600">Login</Button>
                <Button py={3} px={1} size="lg" backgroundColor="emerald.600">Signup</Button>
              </VStack>   
            </Box>
        </Center>
        </>
    )
} 

export default IndexScreen;