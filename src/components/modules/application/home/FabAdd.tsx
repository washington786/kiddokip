import { StyleProp, StyleSheet, ViewStyle } from 'react-native'
import React, { FC } from 'react'
import { AnimatedFAB } from 'react-native-paper'
import colors from '@/config/colors';

interface props {
    visible: boolean;
    style?: StyleProp<ViewStyle>;
    setIsExtended?(item: boolean): void;
    isExtended: boolean;
    handlePress(): void;
}

const FabAdd: FC<props> = ({ visible, style, isExtended, handlePress }) => {
    return (
        <AnimatedFAB
            icon={'plus'}
            label={'add child'}
            extended={isExtended}
            onPress={handlePress}
            visible={visible}
            animateFrom={'right'}
            iconMode={'dynamic'}
            style={[styles.fabStyle, styles.fab, style]}
            color={colors.slate[50]}
        />
    )
}

export default FabAdd

const styles = StyleSheet.create({
    fabStyle: {
        bottom: 16,
        right: 16,
        position: 'absolute',
    },
    fab: {
        backgroundColor: colors.primary[600]
    }
})