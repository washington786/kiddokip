import { View, Text, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'

import { Ionicons } from "@expo/vector-icons"

interface props {
    styles?: any;
    selectedCrèche: any;
    item: any;
    setSelectedCrèche(item: any): void;
}
const RTransferItem: FC<props> = ({ styles, item, selectedCrèche, setSelectedCrèche }) => {
    return (
        <TouchableOpacity
            style={[
                styles.crècheCard,
                selectedCrèche?.id === item.id && styles.selectedCrècheCard
            ]}
            onPress={() => setSelectedCrèche(item)}
        >
            <View style={styles.crècheInfo}>
                <Text style={styles.crècheName}>{item.name}</Text>
                <Text style={styles.crècheDetails}>
                    {item.district} • {item.distance} km away
                </Text>
            </View>
            {selectedCrèche?.id === item.id && (
                <Ionicons name="checkmark-circle" size={24} color="#3b82f6" />
            )}
        </TouchableOpacity>
    )
}

export default RTransferItem