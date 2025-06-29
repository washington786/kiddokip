import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from "@expo/vector-icons"
import useTransition from '@/hooks/navigation/useTransition';
import colors from '@/config/colors';

interface props {
    title: string;
}

const RTopBar = ({ title }: props) => {
    const { onBack } = useTransition();
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={onBack}>
                <Ionicons name="arrow-back" size={24} color={colors.gray[500]} />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginBottom: 10,
        paddingVertical: 8,
        paddingHorizontal: 8,
        backgroundColor: "white"
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.gray[500],
        flex: 1,
        alignSelf: "center",
        textAlign: "center"
    },
});
export default RTopBar