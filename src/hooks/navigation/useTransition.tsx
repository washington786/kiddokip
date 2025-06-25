import { navigationTypes } from '@/types/navigationTypes';
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const useTransition = () => {
    const navigation = useNavigation<NativeStackNavigationProp<navigationTypes>>();

    function onBack() {
        navigation.goBack();
    }

    function getStarted() {
        navigation.replace("login")
    }

    function login() {
        navigation.navigate("login");
    }
    function register() {
        navigation.navigate("register");
    }
    function walkthrough() {
        navigation.navigate("walkthrough");
    }
    function createCreche() {
        navigation.navigate("createCreche");
    }

    return { onBack, login, register, walkthrough, getStarted, createCreche }
}

export default useTransition