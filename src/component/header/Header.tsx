import * as React from "react";
import { View, StyleSheet } from "react-native";

export const Header = () => (
    <View style={styles.header}/>
)

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 25,
    }
})