import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import RecentActivity from './RecentActivity'
import { Text } from 'react-native-paper'
import { RDivider } from '@/components/common'

interface Activity {
    name: string, date: Date, id: string
}

const activities: Activity[] = [
    { date: new Date(20250629), id: "#1", name: "Scoial worker visit" }
]

const ActivityList = () => {
    return (
        <View style={styles.con}>
            <Text variant='titleMedium'>Recent Activities</Text>
            <RDivider />
            <FlatList data={activities} renderItem={({ item }) => <RecentActivity date={item.date} title={item.name} />} keyExtractor={(item) => item.id.toString()} />
        </View>
    )
}

export default ActivityList

const styles = StyleSheet.create({
    con: {
        marginVertical: 8
    }
})