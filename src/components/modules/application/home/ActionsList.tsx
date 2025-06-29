import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import HomeBoxCard from './HomeBoxCard'
import { actions } from '@/utils/homeActions'

const ActionsList = () => {
    return (
        <View>
            <FlatList data={actions} renderItem={({ item }) => <HomeBoxCard title={item.name} icon={item.icon as any} style={{
                backgroundColor: item.color
            }} />} numColumns={2} columnWrapperStyle={{ gap: 8 }} keyExtractor={(item) => item.id.toString()} />
        </View>
    )
}

export default ActionsList

const styles = StyleSheet.create({})