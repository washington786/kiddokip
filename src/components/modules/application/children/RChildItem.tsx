import { View, Text, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import useTransition from '@/hooks/navigation/useTransition';
import { Child } from '@/interfaces/IChild';

import { Ionicons } from "@expo/vector-icons";

interface prop {
    styles: any;
    selectedChildren: any;
    toggleSelection(item: any): void;
    item: Child
}
const RChildItem: FC<prop> = ({ item, selectedChildren, styles, toggleSelection }) => {
    const { goToChildProfile } = useTransition()
    return (
        <TouchableOpacity
            style={[
                styles.childCard,
                selectedChildren.includes(item.id) && styles.selectedChildCard
            ]}
            onPress={(): void => selectedChildren.length > 0
                ? toggleSelection(item.id)
                : goToChildProfile({ childId: item.id })
            }
            onLongPress={(): void => toggleSelection(item.id)}
        >
            {selectedChildren.length > 0 && (
                <View style={[
                    styles.selectionCircle,
                    selectedChildren.includes(item.id) && styles.selectedCircle
                ]}>
                    {selectedChildren.includes(item.id) && (
                        <Ionicons name="checkmark" size={16} color="white" />
                    )}
                </View>
            )}

            <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                    {item.name.charAt(0)}{item.name.split(' ')[1]?.charAt(0)}
                </Text>
            </View>

            <View style={styles.childInfo}>
                <Text style={styles.childName}>{item.name}</Text>
                <Text style={styles.childDetails}>
                    {item.age} yrs • {item.gender} • Enrolled: {item.enrollmentDate}
                </Text>
            </View>

            <View style={[
                styles.statusBadge,
                item.status === 'Active' ? styles.activeBadge :
                    item.status === 'Transferred' ? styles.transferredBadge : styles.graduatedBadge
            ]}>
                <Text style={styles.statusText}>{item.status}</Text>
            </View>

            {selectedChildren.length === 0 && (
                <Ionicons name="chevron-forward" size={20} color="#999" />
            )}
        </TouchableOpacity>
    )
}

export default RChildItem