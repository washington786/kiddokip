import { Text, View } from 'react-native'
import React from 'react'
import colors from '@/config/colors'

import { Ionicons } from "@expo/vector-icons"

const REmptyChildList = ({ styles }: { styles: any }) => {
    return (
        <View style={styles.emptyContainer}>
            <Ionicons name="people-outline" size={48} color={colors.slate[200]} />
            <Text style={styles.emptyText}>No children found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your filters</Text>
        </View>
    )
}

export default REmptyChildList