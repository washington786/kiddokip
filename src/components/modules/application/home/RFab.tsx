import { StyleSheet } from 'react-native'
import React from 'react'
import { FAB } from 'react-native-paper'
import colors from '@/config/colors';

interface props {
    handleFab(): void;
}

const RFab = ({ handleFab }: props) => {
    return (
        <FAB icon={'plus'} style={styles.con} onPress={handleFab} color={colors.slate[50]} />
    )
}

export default RFab

const styles = StyleSheet.create({
    con: { position: "absolute", bottom: 6, right: 8, margin: 16, backgroundColor: colors.primary[400] }
})