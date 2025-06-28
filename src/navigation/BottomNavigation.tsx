import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ChildrenScreen, HomeScreen, ProfileScreen, ReportsScreen } from "@/ui/screens/main";
import { navigationTypes } from "@/types/navigationTypes";
import { BottomTabStyles as styles } from "@/styles/BottomTabStyles";
import { RCustomTabBarButton, RTabBarIcon } from "@/components/modules/application";

const Tab = createBottomTabNavigator<navigationTypes>();

const BottomTabNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarHideOnKeyboard: true,
            }}
        >
            <Tab.Screen
                name="home"
                component={HomeScreen}
                options={{
                    tabBarLabel: "",
                    tabBarButton: (props) => <RCustomTabBarButton {...props} />,
                    tabBarIcon: ({ focused }) => (
                        <RTabBarIcon focused={focused} iconName="grid" label="Home" />
                    ),
                }}
            />
            <Tab.Screen
                name="children"
                component={ChildrenScreen}
                options={{
                    tabBarLabel: "",
                    tabBarButton: (props) => <RCustomTabBarButton {...props} />,
                    tabBarIcon: ({ focused }) => (
                        <RTabBarIcon focused={focused} iconName="body" label="children" />
                    ),
                }}
            />
            <Tab.Screen
                name="reports"
                component={ReportsScreen}
                options={{
                    tabBarLabel: "",
                    tabBarButton: (props) => <RCustomTabBarButton {...props} />,
                    tabBarIcon: ({ focused }) => (
                        <RTabBarIcon focused={focused} iconName="stats-chart" label="stats" />
                    ),
                }}
            />
            <Tab.Screen
                name="profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: "",
                    tabBarButton: (props) => <RCustomTabBarButton {...props} />,
                    tabBarIcon: ({ focused }) => (
                        <RTabBarIcon focused={focused} iconName="person" label="Profile" />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabNavigation;