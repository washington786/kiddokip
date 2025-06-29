import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    RefreshControl,
    ListRenderItem,
    ViewStyle,
    TextStyle
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import useTransition from '@/hooks/navigation/useTransition';
import { Text as RNText, Searchbar } from "react-native-paper"
import colors from '@/config/colors';
import { ChildStatus, Gender, StatusFilter } from '@/types/child';
import RStatusFilter from './RStatusFilter';
import RChildItem from './RChildItem';
import { ChildStyles as styles } from '@/styles';
import { Child as IChild } from '@/interfaces/IChild';

const Child = () => {
    const { goToTransferChild, goToChildProfile, goToRegisterChild } = useTransition();
    // State with TypeScript types
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [activeFilter, setActiveFilter] = useState<StatusFilter>('All');
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [selectedChildren, setSelectedChildren] = useState<string[]>([]);
    const [showAgeFilter, setShowAgeFilter] = useState<boolean>(false);
    const [ageRange, setAgeRange] = useState<[number, number]>([0, 6]);

    // Sample data with proper typing
    const [childrenData, setChildrenData] = useState<IChild[]>([
        {
            id: '1',
            name: 'Lindiwe Mkhize',
            age: 3,
            gender: 'Female',
            status: 'Active',
            enrollmentDate: '2023-01-15'
        },
        {
            id: '2',
            name: 'Thabo Bester',
            age: 4,
            gender: 'Male',
            status: 'Active',
            enrollmentDate: '2023-02-20'
        },
        {
            id: '3',
            name: 'Nomsa Dlamini',
            age: 5,
            gender: 'Female',
            status: 'Transferred',
            enrollmentDate: '2022-11-05'
        },
        {
            id: '4',
            name: 'Kgosi Moloi',
            age: 2,
            gender: 'Male',
            status: 'Active',
            enrollmentDate: '2023-03-10'
        },
    ]);

    // Typed refresh handler
    const onRefresh = useCallback((): void => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1500);
    }, []);

    // Typed filter function
    const filteredChildren = childrenData.filter((child: IChild): boolean => {
        const matchesSearch = child.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = activeFilter === 'All' || child.status === activeFilter;
        const matchesAge = child.age >= ageRange[0] && child.age <= ageRange[1];
        return matchesSearch && matchesFilter && matchesAge;
    });

    // Typed selection handler
    const toggleSelection = (childId: string): void => {
        setSelectedChildren(prev =>
            prev.includes(childId)
                ? prev.filter(id => id !== childId)
                : [...prev, childId]
        );
    };

    // Typed navigation handler
    const handleBatchTransfer = (): void => {
        goToTransferChild({ childId: selectedChildren, currentCrecheId: "34" })
        setSelectedChildren([]);
    };

    // Typed render item
    const renderItem: ListRenderItem<IChild> = ({ item }) => (
        <RChildItem item={item} styles={styles} selectedChildren={selectedChildren} toggleSelection={toggleSelection} />
    );

    return (
        <View style={styles.container}>
            {/* Header with batch actions */}
            <View style={styles.header}>
                {selectedChildren.length > 0 ? (
                    <View style={styles.batchHeader}>
                        <TouchableOpacity onPress={(): void => setSelectedChildren([])}>
                            <Ionicons name="close" size={24} color="#333" />
                        </TouchableOpacity>
                        <Text style={styles.batchTitle}>{selectedChildren.length} selected</Text>
                        <TouchableOpacity onPress={handleBatchTransfer}>
                            <MaterialIcons name="transfer-within-a-station" size={24} color="#3b82f6" />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <>
                        {/* <Text style={styles.title}>Children Management</Text> */}
                        <RNText variant='headlineSmall'>Children Management</RNText>
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={goToRegisterChild}
                        >
                            <Ionicons name="add" size={24} color="white" />
                        </TouchableOpacity>
                    </>
                )}
            </View>

            {/* Search and Filters */}
            <Searchbar
                placeholder='Search children...'
                value={searchQuery}
                onChangeText={(text: string): void => setSearchQuery(text)}
                style={{ backgroundColor: colors.primary[50], borderWidth: 0.1, borderColor: colors.gray[500], borderRadius: 8, marginBottom: 12, height: 60 }}
                mode='view'
                showDivider={false}
                traileringIcon={'filter'}
                elevation={0}
                onTraileringIconPress={() => setShowAgeFilter(!showAgeFilter)}
            />

            {showAgeFilter && (
                <View style={styles.ageFilterContainer}>
                    <Text>Age Range: {ageRange[0]} - {ageRange[1]} years</Text>
                    {/* Implement your range slider here */}
                </View>
            )}

            {/* Status Filters */}
            <RStatusFilter activeFilter={activeFilter} setActiveFilter={setActiveFilter} styles={styles} />

            {/* Children List */}
            <FlatList
                data={filteredChildren}
                keyExtractor={(item: IChild): string => item.id}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[colors.primary[400]]}
                    />
                }
                renderItem={renderItem}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="people-outline" size={48} color={colors.slate[200]} />
                        <Text style={styles.emptyText}>No children found</Text>
                        <Text style={styles.emptySubtext}>Try adjusting your filters</Text>
                    </View>
                }
            />

            {/* Batch Action Footer */}
            {selectedChildren.length > 0 && (
                <View style={styles.batchFooter}>
                    <TouchableOpacity
                        style={styles.batchButton}
                        onPress={handleBatchTransfer}
                    >
                        <Text style={styles.batchButtonText}>
                            Transfer Selected ({selectedChildren.length})
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};


export default Child;