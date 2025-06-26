import React from 'react'
import { RButton, RInput, RKeyboardView, RLogo, RRow, Scroller } from '@/components/common'
import { authStyles as styles } from '@/styles'
import colors from '@/colors'
import { Text } from 'react-native-paper'
import useTransition from '@/hooks/navigation/useTransition'

const RegisterPage = () => {
    const { login, createCreche } = useTransition();
    return (
        <Scroller style={styles.con}>
            <RLogo stylesLogo={[styles.logo, styles.spaceBottom]} />
            <RKeyboardView>
                <RInput placeholder='FirstName' customStyle={styles.input} placeholderTextColor={colors.gray[300]} keyboardType='default' />
                <RInput placeholder='LastName' customStyle={styles.input} placeholderTextColor={colors.gray[300]} keyboardType='default' />
                <RInput placeholder='Email' customStyle={styles.input} placeholderTextColor={colors.gray[300]} keyboardType='email-address' />
                <RInput placeholder='Phone Number' customStyle={styles.input} placeholderTextColor={colors.gray[300]} keyboardType='number-pad' />
                <RInput placeholder='Password' customStyle={styles.input} placeholderTextColor={colors.gray[300]} secureTextEntry />
                <RInput placeholder='Confirm Password' customStyle={styles.input} placeholderTextColor={colors.gray[300]} secureTextEntry />


                <RButton title='Create Account' onPressButton={createCreche} styleBtn={styles.btn} />

                <RRow style={[styles.center, styles.spaceTop]}>
                    <Text variant='labelSmall'>Already have an account?</Text>
                    <Text variant='labelMedium' style={{ color: colors.primary[600] }} onPress={login}>Sign In</Text>
                </RRow>

            </RKeyboardView>

        </Scroller>
    )
}

export default RegisterPage

