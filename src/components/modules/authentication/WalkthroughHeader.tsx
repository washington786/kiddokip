import { StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { Text } from 'react-native-paper'

const WalkthroughHeader: FC<{ onPress(): void }> = ({ onPress }) => {
    return (
        <View style={styles.con}>
            <Text onPress={onPress} variant='labelMedium'>Skip</Text>
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