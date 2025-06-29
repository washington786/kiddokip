import { Dimensions, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { FC } from 'react'
import { Text as RNText } from "react-native-paper"
import { Ionicons } from "@expo/vector-icons";
import colors from '@/config/colors';
import appFonts from '@/config/fonts';
import { RCol } from '@/components/common';

const width = Dimensions.get("screen").width;

interface props {
    title: string;
    icon: "person-remove-outline" | "person-add-outline" | "card-outline" | "people-outline";
    style?: StyleProp<ViewStyle>;
    number?: number;
}

const HomeBoxCard: FC<props> = ({ icon, title, style }) => {
    return (
        <View style={[styles.con, style]}>
            <Ionicons name={icon} size={35} color={colors.slate[50]} />
            <RCol style={styles.center}>
                <Text style={styles.title}>{title}</Text>
                <RNText style={styles.title} variant='titleMedium'>5</RNText>
            </RCol>
        </View>
    )
}

export default HomeBoxCard

const styles = StyleSheet.create({
    con: {
        minWidth: width * 0.45,
        minHeight: 130,
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        marginVertical: 8,
        borderRadius: 10
    },
    title: {
        color: colors.slate[50],
        fontFamily: `${appFonts.regular}`
    },
    center: {
        alignItems: "center",
        justifyContent: "center"
    }
})