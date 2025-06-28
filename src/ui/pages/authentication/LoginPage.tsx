import React from 'react'
import { RButton, RInput, RKeyboardView, RLogo, RRow, Scroller } from '@/components/common'
import { authStyles as styles } from '@/styles';

import { Text } from 'react-native-paper'
import colors from '@/colors';
import useTransition from '@/hooks/navigation/useTransition';

const LoginPage = () => {
    const { register, goToApp } = useTransition();
    return (
        <Scroller style={styles.con}>
            <RLogo stylesLogo={[styles.logo, styles.spaceBottom]} />
            <RKeyboardView>
                <RInput placeholder='Email' customStyle={styles.input} placeholderTextColor={colors.gray[300]} />
                <RInput placeholder='Password' customStyle={styles.input} placeholderTextColor={colors.gray[300]} />
                <Text variant='labelLarge' style={styles.fgTxt}>Forgot Password</Text>

                <RButton title='Sign In' onPressButton={goToApp} styleBtn={styles.btn} />

                <RRow style={[styles.center, styles.spaceTop]}>
                    <Text variant='labelSmall'>Don't have an account?</Text>
                    <Text variant='labelMedium' style={{ color: colors.primary[600] }} onPress={register}>Sign Up</Text>
                </RRow>

            </RKeyboardView>

        </Scroller>
    )
}

export default LoginPage