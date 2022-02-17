import React, { useLayoutEffect, useState } from "react";
import { Button, Center, Box, Text } from "native-base";
import { SafeAreaView, StyleSheet } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import SegmentedControlTab from 'react-native-segmented-control-tab';

const ParkingScreen = ({ navigation }) => {

    const [customStyleIndex, setCustomStyleIndex] = useState(0);

    const handleCustomIndexSelect = (index) => {
        setCustomStyleIndex(index);
    };

    const onSignOut = () => {
        signOut(auth).catch((error) => console.log("Error logging out: ", error));
    };
    return ( <
        >
        <
        SafeAreaView style = { styles.container } >
        <
        Box style = { styles.container } > { /* This is where we add the location details and notification */ } <
        SegmentedControlTab values = {
            ['Parking', 'Activity'] }
        selectedIndex = { customStyleIndex }
        onTabPress = { handleCustomIndexSelect }
        borderRadius = { 20 }
        tabsContainerStyle = {
            {
                height: 40,
                width: '85%',
                margin: 20,
                marginTop: 60,
                backgroundColor: 'none',
                borderStyle: 'solid',
                borderRadius: 20
            }
        }
        tabStyle = {
            {
                backgroundColor: 'rgba(255,255,255,0.4)',
                borderWidth: 0,
                borderColor: '#FD6B36'
            }
        }
        activeTabStyle = {
            { backgroundColor: 'white', marginTop: 0 } }
        tabTextStyle = {
            { color: 'white', fontWeight: 'bold' } }
        activeTabTextStyle = {
            { color: '#FD6B36' } }
        /> {
            customStyleIndex === 0 && ( <
                Box flex = "1"
                width = '100%' > { /* Here is where we add the parking component/container */ } <
                Text style = { styles.tabContent } > Tab one < /Text> <
                /Box>
            )
        } {
            customStyleIndex === 1 && ( <
                Box flex = "1"
                width = '100%' > { /* Here is where we add the activity component/container */ } <
                Text style = { styles.tabContent } > Tab two < /Text> <
                /Box>
            )
        } <
        /Box> <
        /SafeAreaView> <
        />
    );
};

export default ParkingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#FD6B36',
    },
    tabContent: {
        textAlign: 'center',
        height: '100%',
        color: 'black',
        backgroundColor: 'white',
        fontSize: 18
    },
});