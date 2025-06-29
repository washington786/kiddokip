import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { Feather } from "@expo/vector-icons";
import { RCol, RRow, RText } from '@/components/common';
import colors from '@/config/colors';
import { Searchbar, Text } from 'react-native-paper';
import { getTimeofDay } from '@/utils/timeOfTheDay';
import appFonts from '@/config/fonts';

const HomeHeader = () => {
    const day = getTimeofDay();
    return (
        <RCol>
            <TouchableWithoutFeedback>
                <Feather name='bell' size={33} style={{ alignSelf: "flex-end" }} />
            </TouchableWithoutFeedback>

            <RRow style={styles.row}>
                <Feather name='map-pin' size={20} color={colors.secondary[400]} />
                <RText title='Mopani District' style={styles.district} />
            </RRow>

            <Text variant='headlineMedium' style={styles.title}>good {day} Sunshine creche</Text>

            <Searchbar value='' placeholder='Search Child' placeholderTextColor={colors.gray[400]} style={styles.search} />

        </RCol>
    )
}

export default HomeHeader

const styles = StyleSheet.create({
    row: {
        alignItems: "center",
        gap: 6
    },
    district: {
        color: colors.gray[500],
        textTransform: "capitalize",
        fontFamily: `${appFonts.extaLight}`
    },
    title: {
        fontFamily: `${appFonts.semiBold}`,
        textTransform: "capitalize"

    },
    search: {
        backgroundColor: colors.primary[50],
        marginVertical: 12,
        borderWidth: 0.5,
        borderColor: colors.slate[300]
    }
})