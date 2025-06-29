import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { StatusFilter } from '@/types/child';

interface prop {
    styles?: any;
    activeFilter: any;
    setActiveFilter(filter: StatusFilter): void;
}

const RStatusFilter: FC<prop> = ({ styles, activeFilter, setActiveFilter }) => {
    return (
        <View style={styles.filterContainer}>
            {(['All', 'Active', 'Transferred', 'Graduated'] as StatusFilter[]).map((filter) => (
                <TouchableOpacity
                    key={filter}
                    style={[
                        styles.filterButton,
                        activeFilter === filter && styles.activeFilter
                    ]}
                    onPress={(): void => setActiveFilter(filter)}
                >
                    <Text style={activeFilter === filter ? styles.activeFilterText : styles.filterText}>
                        {filter}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>

    )
}

export default RStatusFilter

const styles = StyleSheet.create({})