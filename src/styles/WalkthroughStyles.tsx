import {
    StyleSheet,
    Dimensions,
} from 'react-native';
import colors from '../config/colors';
import appFonts from '@/config/fonts';

const { width } = Dimensions.get('window');
export const WalkthroughStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    slide: {
        width,
        alignItems: 'center',
        padding: 20,
    },
    image: {
        width: '100%',
        height: 400,
        marginBottom: 30,
        objectFit: "contain",
        resizeMode: "contain"
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 10,
        fontFamily: `${appFonts.black}`,
        color: colors.gray[700]
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        paddingHorizontal: 20,
        color: colors.slate[400],
        fontFamily: `${appFonts.extaLight}`
    },
    footer: {
        paddingBottom: 30,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    dots: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },

    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ccc',
        marginHorizontal: 4,
    },

    activeDot: {
        width: 24,
        height: 8,
        borderRadius: 8,
        backgroundColor: colors.primary[400], // or your theme primary
    },

    footerControls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    linkText: {
        fontSize: 16,
        color: colors.primary[500],
    },
    btnFull: {
        width: "100%"
    },
    btnMin: {
        minWidth: 120, zIndex: 100
    }
});