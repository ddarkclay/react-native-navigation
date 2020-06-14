import React from 'react'
import { View, StyleSheet, Text, Button } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default DetailsScreen = ({ navigation }) => {
    const { colors } = useTheme();
    return (
        <View style={styles.container}>
            <Text style={{ color: colors.text }}>Details Screen</Text>
            <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})