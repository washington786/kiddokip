import { StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import colors from '@/config/colors'
import { RRow } from '@/components/common'
import { Text } from 'react-native-paper'

import { Feather } from "@expo/vector-icons";

interface props {
    date: Date,
    title: string
}

const RecentActivity: FC<props> = ({ date, title }) => {
    let fd = date.toLocaleDateString("en-ZA", { day: "2-digit", year: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })
    return (
        <View style={styles.con}>
            <RRow style={styles.dt}>
                <Feather name='calendar' />
                <Text variant='labelSmall'>{fd}</Text>
            </RRow>
            <Text variant='titleMedium' numberOfLines={2}>{title}</Text>
        </View>
    )
}

export default RecentActivity

const styles = StyleSheet.create({
    con: {
        width: "100%",
        minHeight: 60,
        backgroundColor: colors.slate[100],
        borderRadius: 10,
        flexDirection: "column",
        marginVertical: 5,
        paddingHorizontal: 8
    },
    dt: { gap: 4, alignSelf: "flex-end", alignItems: "center", justifyContent: "flex-end", paddingHorizontal: 8 }
})