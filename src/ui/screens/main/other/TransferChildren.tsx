import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Alert,
    ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Types
type Crèche = {
    id: string;
    name: string;
    district: string;
    distance?: number;
};

type RootStackParamList = {
    TransferChild: {
        childIds: string[];
        currentCrècheId: string;
    };
    // ... other screen definitions
};

type TransferChildScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'TransferChild'
>;

type TransferChildScreenRouteProp = RouteProp<RootStackParamList, 'TransferChild'>;

interface TransferChildScreenProps {
    navigation: TransferChildScreenNavigationProp;
    route: TransferChildScreenRouteProp;
}

const TransferChildScreen: React.FC<TransferChildScreenProps> = ({ navigation, route }) => {
    const { childIds, currentCrècheId } = route.params;
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCrèche, setSelectedCrèche] = useState<Crèche | null>(null);
    const [transferReason, setTransferReason] = useState('');
    const [loading, setLoading] = useState(false);
    const [crèches, setCrèches] = useState<Crèche[]>([]);

    // Fetch nearby crèches (mock data - replace with API call)
    useEffect(() => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setCrèches([
                { id: '2', name: 'Rainbow Crèche', district: 'District A', distance: 1.2 },
                { id: '3', name: 'Sunshine Daycare', district: 'District B', distance: 2.5 },
                { id: '4', name: 'Little Stars', district: 'District A', distance: 0.8 },
                { id: '5', name: 'Tiny Tots', district: 'District C', distance: 3.1 },
            ].filter(c => c.id !== currentCrècheId));
            setLoading(false);
        }, 1000);
    }, [currentCrècheId]);

    const handleTransfer = () => {
        if (!selectedCrèche) {
            Alert.alert('Error', 'Please select a crèche');
            return;
        }

        setLoading(true);
        // Simulate transfer API call
        setTimeout(() => {
            setLoading(false);
            Alert.alert(
                'Transfer Successful',
                `${childIds.length} child(ren) transferred to ${selectedCrèche.name}`,
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.goBack()
                    }
                ]
            );
        }, 1500);
    };

    const filteredCrèches = crèches.filter(crèche =>
        crèche.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crèche.district.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.title}>Transfer Child{childIds.length > 1 ? 'ren' : ''}</Text>
                <View style={{ width: 24 }} /> {/* Spacer */}
            </View>

            {/* Transfer Summary */}
            <View style={styles.summaryCard}>
                <Text style={styles.summaryText}>
                    Transferring {childIds.length} child{childIds.length > 1 ? 'ren' : ''}
                </Text>
            </View>

            {/* Search */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
                <TextInput
                    placeholder="Search crèches..."
                    style={styles.searchInput}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {/* Crèche List */}
            {loading ? (
                <ActivityIndicator size="large" color="#3b82f6" style={styles.loader} />
            ) : (
                <FlatList
                    data={filteredCrèches}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
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
                    )}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>No crèches found</Text>
                    }
                />
            )}

            {/* Transfer Reason */}
            <TextInput
                placeholder="Reason for transfer (optional)"
                style={styles.reasonInput}
                value={transferReason}
                onChangeText={setTransferReason}
                multiline
            />

            {/* Transfer Button */}
            <TouchableOpacity
                style={[
                    styles.transferButton,
                    (!selectedCrèche || loading) && styles.disabledButton
                ]}
                onPress={handleTransfer}
                disabled={!selectedCrèche || loading}
            >
                {loading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <Text style={styles.transferButtonText}>
                        Confirm Transfer
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    summaryCard: {
        backgroundColor: '#f0f9ff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    summaryText: {
        fontSize: 16,
        color: '#0369a1',
        fontWeight: '500',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 16,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    loader: {
        marginVertical: 40,
    },
    crècheCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    selectedCrècheCard: {
        borderColor: '#3b82f6',
        backgroundColor: '#f0f9ff',
    },
    crècheInfo: {
        flex: 1,
    },
    crècheName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 4,
    },
    crècheDetails: {
        fontSize: 14,
        color: '#666',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 32,
        color: '#999',
    },
    reasonInput: {
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 8,
        padding: 16,
        minHeight: 100,
        marginTop: 16,
        textAlignVertical: 'top',
    },
    transferButton: {
        backgroundColor: '#3b82f6',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 24,
    },
    disabledButton: {
        backgroundColor: '#9ca3af',
    },
    transferButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default TransferChildScreen;