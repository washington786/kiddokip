import React from 'react'
import { Child } from '@/components/modules/application/children'
import { useNavigation } from '@react-navigation/native'

const ChildrenScreen = () => {
    const navigation = useNavigation();
    return (
        <Child />
    )
}

export default ChildrenScreen