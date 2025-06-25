import { Image, StyleSheet } from 'react-native'
import React from 'react'
import RWrapper from './RWrapper'
import RLoader from './RLoader'

const RSplash = () => {
    return (
        <RWrapper style={styles.con}>
            <Image
                source={require("../../../assets/logo.svg")}
                resizeMode="contain"
                resizeMethod="resize"
                style={styles.img}
            />
            <RLoader />
        </RWrapper>
    )
}

export default RSplash

const styles = StyleSheet.create({
    con: {
        justifyContent: "center",
        alignItems: "center",
        gap: 8
    },
    img: {
        height: 80,
        width: 80
    }
})