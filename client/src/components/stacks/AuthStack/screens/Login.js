import React from 'react';
import { Text, Center, Box, VStack } from 'native-base';

const LoginScreen = () => {
    return (
        <>
        <Center>
            <Box>
              <VStack flex={1} space={4} justifyContent="center"> 
                <Text fontSize={25}>Login</Text>
              </VStack>   
            </Box>
        </Center>
        </>
    )
} 

export default LoginScreen;