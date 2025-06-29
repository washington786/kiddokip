import { View, Text, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import colors from '@/config/colors';

interface props {
    styles?: any;
    handleBatchTransfer(): void;
    selectedChildren: string[];
    setSelectedChildren(item: []): void
}
const RChildHeader: FC<props> = ({ styles, handleBatchTransfer, selectedChildren, setSelectedChildren }) => {
    return (
        <View style={styles.batchHeader}>
            <TouchableOpacity onPress={(): void => setSelectedChildren([])}>
                <Ionicons name="close" size={24} color={colors.gray[600]} />
            </TouchableOpacity>
            <Text style={styles.batchTitle}>{selectedChildren.length} selected</Text>
            <TouchableOpacity onPress={handleBatchTransfer}>
                <MaterialIcons name="transfer-within-a-station" size={24} color={colors.primary[600]} />
            </TouchableOpacity>
        </View>
    )
}

export default RChildHeader