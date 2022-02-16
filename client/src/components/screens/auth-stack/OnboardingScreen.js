import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Image } from 'native-base';
import Onboarding from 'react-native-onboarding-swiper';

const Done = ({ ...props }) => {
    return <TouchableOpacity style={{ marginHorizontal: 15}} { ...props }><Text style={{ fontSize: 16 }}>Done</Text></TouchableOpacity>
}

const Dots = ({selected}) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.3)';
    return (
        <View style={{
            width: 10,
            height: 10,
            borderRadius: 50,
            marginHorizontal: 3,
            backgroundColor
        }}/>
    );
}

const OnboardingScreen = ({ navigation }) => {

    return (
        <>
        <Onboarding
        onSkip={() => navigation.replace("IndexScreen")}
        onDone={() => navigation.replace("IndexScreen")}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        pages={[
            {
                backgroundColor: '#a6e4d0',
                // image: <Image source={require('../../../../assets/*.png')} />,
                title: 'Onboarding 1',
                subtitle: ''
            },
            {
                backgroundColor: '#fdeb93',
                // image: <Image source={require('../../../../assets/*.png')} />,
                title: 'Onboarding 2',
                subtitle: ''
            },
            {
                backgroundColor: '#e6b4d5',
                // image: <Image source={require('../../../../assets/*.png')} />,
                title: 'Onboarding 3',
                subtitle: ''
            },
            ]}
        />
        </>
    )
};

export default OnboardingScreen;