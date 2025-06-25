import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { navigationTypes } from '@/types/navigationTypes';
import LoginPage from '@/ui/pages/authentication/LoginPage';
import RegisterPage from '@/ui/pages/authentication/RegisterPage';
import WalkthroughPage from '@/ui/pages/WalkthroughPage';

const Stack = createNativeStackNavigator<navigationTypes>();

const RootStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='walkthrough'>
            <Stack.Screen name='login' component={LoginPage} />
            <Stack.Screen name='register' component={RegisterPage} />
            <Stack.Screen name='walkthrough' component={WalkthroughPage} />
        </Stack.Navigator>
    )
}

export default RootStack

const styles = StyleSheet.create({})