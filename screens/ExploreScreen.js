import React from 'react'
import { View, StyleSheet, Text, Button } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default ExploreScreen = ({ navigation }) => {
    const { colors } = useTheme();
    return (
        <View style={styles.container}>
            <Text style={{ color: colors.text }}>Explore Screen</Text>
            <Button title="Click Here" onPress={() => alert('Button Pressed')} />
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