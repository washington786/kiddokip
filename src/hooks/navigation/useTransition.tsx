import { useNavigation } from '@react-navigation/native'

const useTransition = () => {
    const navigation = useNavigation();

    function onBack() {
        navigation.goBack();
    }
    return { onBack }
}

export default useTransition