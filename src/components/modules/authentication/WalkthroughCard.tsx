import { View, Text, Image } from 'react-native'
import React, { FC } from 'react'

interface props {
    item: any,
    styles: any
}
const WalkthroughCard: FC<props> = ({ item, styles }) => {
    return (
        <View style={styles.slide}>
            <Image source={item.image} style={styles.image} resizeMode="contain" />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
    )
}

export default WalkthroughCard