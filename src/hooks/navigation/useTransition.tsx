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

    function goToApp() {
        navigation.navigate("app");
    }

    function goToRegisterChild() {
        navigation.navigate("RegisterChild");
    }

    function goToTransferChild({ childId, currentCrecheId }: { childId: string[], currentCrecheId: string }) {
        navigation.navigate("TransferChildren", { childId, currentCrecheId });
    }

    function goToEditChild({ childId }: { childId: string }) {
        navigation.navigate("EditChild", { childId: childId });
    }

    function goToChildProfile({ childId }: { childId: string }) {
        navigation.navigate("ChildProfile", { childId: childId });
    }

    return { onBack, login, register, walkthrough, getStarted, createCreche, goToApp, goToChildProfile, goToEditChild, goToRegisterChild, goToTransferChild }
}

export default useTransition