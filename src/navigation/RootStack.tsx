import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { navigationTypes } from '@/types/navigationTypes';
import LoginPage from '@/ui/pages/authentication/LoginPage';
import RegisterPage from '@/ui/pages/authentication/RegisterPage';
import WalkthroughPage from '@/ui/pages/WalkthroughPage';
import CreateCrechePage from '@/ui/screens/Creche/CreateCreche';
import BottomTabNavigation from './BottomNavigation';

const Stack = createNativeStackNavigator<navigationTypes>();

const RootStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='app'>
            <Stack.Screen name='login' component={LoginPage} />
            <Stack.Screen name='register' component={RegisterPage} />
            <Stack.Screen name='walkthrough' component={WalkthroughPage} />
            <Stack.Screen name='createCreche' component={CreateCrechePage} />
            <Stack.Screen name='app' component={BottomTabNavigation} />
        </Stack.Navigator>
    )
}

export default RootStack

const styles = StyleSheet.create({})