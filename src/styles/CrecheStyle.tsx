import colors from '@/config/colors';
import appFonts from '@/config/fonts';
import { Platform, StyleSheet } from 'react-native'

export const CrecheStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
        paddingVertical: 12,
        backgroundColor: 'white'
    },
    progressContainer: {
        flexDirection: 'row',
        marginBottom: 24
    },
    progressStep: {
        height: 4,
        flex: 1,
        marginHorizontal: 4,
        borderRadius: 2
    },
    activeStep: {
        backgroundColor: colors.primary[400]
    },
    inactiveStep: {
        backgroundColor: colors.slate[300]
    },
    stepContainer: {
        marginBottom: 24
    },
    input: {
        marginBottom: 5,
        fontSize: 16,
        minHeight: 50
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: colors.slate[200],
        borderRadius: 6,
        marginBottom: 16,
        overflow: 'hidden',
        minHeight: 60,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 2
    },
    primaryButton: {
        backgroundColor: colors.primary[500],
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 6,
        flex: 1,
        width: "100%"
    },
    secondaryButton: {
        backgroundColor: colors.gray[300],
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 6,
        marginRight: 8
    },
    submitButton: {
        backgroundColor: colors.green[600]
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 16,
        textTransform: "uppercase"
    },
    label: {
        fontFamily: `${appFonts.light}`,
        fontSize: 14,
        color: colors.slate[400]
    },
    timeButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    timeText: {
        fontSize: 16,
    },
    picker: {
        width: Platform.OS === 'ios' ? '100%' : undefined,
    },
    rowGap: {
        gap: 4
    },
    wrapperSpace: {
        flex: 1
    }
});