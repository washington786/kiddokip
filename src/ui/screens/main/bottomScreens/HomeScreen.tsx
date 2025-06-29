import { FlatList, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { ActionsList, ActivityList, FabAdd, HomeHeader, RFab } from '@/components/modules/application'
import useTransition from '@/hooks/navigation/useTransition';

const HomeScreen = () => {
    const [visible, setvisible] = useState(true);

    function handleFab() {
        setvisible(!visible);
    }

    const { goToRegisterChild } = useTransition()

    return (
        <>
            <FlatList data={[]}
                style={{ paddingHorizontal: 12, paddingVertical: 6, flex: 1, flexGrow: 1 }}
                renderItem={null}
                ListHeaderComponent={<HomeHeader />}
                ListFooterComponent={() => {
                    return (
                        <>
                            <ActionsList />
                            <ActivityList />
                        </>
                    )
                }}
            />
            {
                visible &&
                <RFab handleFab={handleFab} />
            }
            {
                !visible && <FabAdd handlePress={() => {
                    handleFab();
                    goToRegisterChild();
                }} isExtended={true} visible={!visible} setIsExtended={() => true} />
            }
        </>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})