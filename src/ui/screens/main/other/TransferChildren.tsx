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
import { RouteProp, useRoute } from '@react-navigation/native';
import { RTopBar, RTransferItem } from '@/components/modules/application/children';
import { navigationTypes } from '@/types/navigationTypes';
import useTransition from '@/hooks/navigation/useTransition';
import { RCol, RInput } from '@/components/common';
import { Button, Searchbar } from 'react-native-paper';
import colors from '@/config/colors';
import { PickerStyle } from '@/styles';

// Types
type Crèche = {
    id: string;
    name: string;
    district: string;
    distance?: number;
};

const TransferChildScreen = () => {
    const route = useRoute<RouteProp<navigationTypes, "TransferChildren">>();
    const { childId, currentCrecheId } = route.params;
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCrèche, setSelectedCrèche] = useState<Crèche | null>(null);
    const [transferReason, setTransferReason] = useState('');
    const [loading, setLoading] = useState(false);
    const [crèches, setCrèches] = useState<Crèche[]>([]);

    const { onBack } = useTransition()

    useEffect(() => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setCrèches([
                { id: '2', name: 'Rainbow Crèche', district: 'District A', distance: 1.2 },
                { id: '3', name: 'Sunshine Daycare', district: 'District B', distance: 2.5 },
                { id: '4', name: 'Little Stars', district: 'District A', distance: 0.8 },
                { id: '5', name: 'Tiny Tots', district: 'District C', distance: 3.1 },
            ].filter(c => c.id !== currentCrecheId));
            setLoading(false);
        }, 1000);
    }, [currentCrecheId]);

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
                `${childId.length} child(ren) transferred to ${selectedCrèche.name}`,
                [
                    {
                        text: 'OK',
                        onPress: onBack
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
        <>
            {/* Header */}
            <RTopBar title={`Transfer Children`} />

            <View style={styles.container}>

                {/* Transfer Summary */}
                <RCol style={styles.summaryCard}>
                    <Text style={styles.summaryText}>
                        Transferring {childId.length} child{childId.length > 1 ? 'ren' : ''}
                    </Text>
                </RCol>

                {/* Search */}
                <Searchbar
                    placeholder='Search children...'
                    value={searchQuery}
                    onChangeText={(text: string): void => setSearchQuery(text)}
                    style={{ backgroundColor: colors.primary[50], borderWidth: 0.1, borderColor: colors.gray[500], borderRadius: 8, marginBottom: 12, height: 60 }}
                    mode='view'
                    showDivider={false}
                    traileringIcon={'filter'}
                    elevation={0}
                    onTraileringIconPress={() => setSearchQuery}
                />

                {/* Crèche List */}
                {loading ? (
                    <ActivityIndicator size="large" color="#3b82f6" style={styles.loader} />
                ) : (
                    <FlatList
                        data={filteredCrèches}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <RTransferItem item={item} selectedCrèche={selectedCrèche} setSelectedCrèche={setSelectedCrèche} styles={styles} />
                        )}
                        ListEmptyComponent={
                            <Text style={styles.emptyText}>No crèches found</Text>
                        }
                    />
                )}

                {/* Transfer Reason */}
                <RInput
                    placeholder="Reason for transfer (optional)"
                    value={transferReason}
                    onChangeText={setTransferReason}
                    multiline
                />

                {/* Transfer Button */}
                <Button loading={loading} style={PickerStyle.btn} theme={{ colors: { primary: colors.primary[500] } }} mode='contained'>Confirm Transfer</Button>

            </View>
        </>
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