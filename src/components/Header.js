import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
    headerContainer : {
        display: "flex",
        marginTop: 55,
        alignItems : "center"
    },
    header : {
        fontWeight : "bold",
        fontSize : 20
    }
});

const { header, headerContainer } = styles;


const Header = () => {
    return (
        <View style={headerContainer}>
            <Text style={header}>
                Cryptocurrency App
            </Text>
        </View>
    );
};



export default Header;