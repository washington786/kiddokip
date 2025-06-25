import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'

const WalkthroughHeader = () => {
    return (
        <View style={styles.con}>
            <Text onPress={() => { }} variant='labelMedium'>Skip</Text>
        </View>
    )
}

export default WalkthroughHeader

const styles = StyleSheet.create({
    con: {
        alignItems: "flex-end",
        justifyContent: "flex-end",
        paddingHorizontal: 10,
        paddingVertical: 10
    }
})