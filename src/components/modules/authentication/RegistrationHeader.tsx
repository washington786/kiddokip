import { StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { Text } from 'react-native-paper'

interface prop {
    title: string;
    description: string;
}
const RegistrationHeader: FC<prop> = ({ description, title }) => {
    return (
        <View style={styles.con}>
            <Text variant='headlineMedium'>{title}</Text>
            <Text variant='bodySmall'>{description}</Text>
        </View>
    )
}

export default RegistrationHeader

const styles = StyleSheet.create({
    con: {
        gap: 4,
        marginVertical: 10
    }
})