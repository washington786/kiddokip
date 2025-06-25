import colors from '@/colors';
import { StyleSheet } from 'react-native'

export const authStyles = StyleSheet.create({
    con: {
        alignItems: "center",
        justifyContent: "center",
        gap: 10
    },
    input: {
        borderRadius: 100,
        minHeight: 50,
    },
    placeholder: {
        color: colors.slate[300]
    },
    logo: { width: 100, height: 100, resizeMode: "contain" },
    fgTxt: { alignSelf: "flex-end", paddingRight: 8 },
    center: {
        alignItems: "center",
        gap: 6,
        justifyContent: "center",
    },
    spaceTop: {
        marginTop: 12
    },
    spaceBottom: {
        marginBottom: 12
    },
    btn: { backgroundColor: colors.primary[500], marginVertical: 8 }
});
