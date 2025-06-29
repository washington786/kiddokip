import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Modal,
    TextInput,
    Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Searchbar } from 'react-native-paper';
import colors from '@/config/colors';

type Child = {
    id: string;
    name: string;
    photo?: string;
    status: 'Present' | 'Absent' | 'Not Marked';
    checkInTime?: string;
    checkOutTime?: string;
    absenceReason?: string;
    selected?: boolean;
};

const DailyAttendanceScreen = () => {
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [children, setChildren] = useState<Child[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAbsenceModal, setShowAbsenceModal] = useState(false);
    const [selectedChild, setSelectedChild] = useState<Child | null>(null);
    const [absenceReason, setAbsenceReason] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectionMode, setSelectionMode] = useState(false);

    // Fetch children data
    useEffect(() => {
        const fetchChildren = async () => {
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 800));

                // Mock data
                const mockChildren: Child[] = [
                    { id: '1', name: 'Lindiwe Mkhize', status: 'Not Marked', selected: false },
                    { id: '2', name: 'Thabo Bester', status: 'Not Marked', selected: false },
                    { id: '3', name: 'Nomsa Dlamini', status: 'Not Marked', selected: false },
                    { id: '4', name: 'Kgosi Moloi', status: 'Not Marked', selected: false },
                ];

                setChildren(mockChildren);
            } catch (error) {
                Alert.alert('Error', 'Failed to load children data');
            } finally {
                setLoading(false);
            }
        };

        fetchChildren();
    }, [date]);

    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const toggleSelectionMode = () => {
        setSelectionMode(!selectionMode);
        if (!selectionMode) {
            // When exiting selection mode, clear all selections
            setChildren(prevChildren =>
                prevChildren.map(child => ({ ...child, selected: false }))
            );
        }
    };

    const toggleChildSelection = (childId: string) => {
        setChildren(prevChildren =>
            prevChildren.map(child =>
                child.id === childId
                    ? { ...child, selected: !child.selected }
                    : child
            )
        );
    };

    const markSelectedPresent = () => {
        const selectedChildren = children.filter(child => child.selected);
        if (selectedChildren.length === 0) {
            Alert.alert('No Selection', 'Please select at least one child');
            return;
        }

        setChildren(prevChildren =>
            prevChildren.map(child =>
                child.selected
                    ? {
                        ...child,
                        status: 'Present',
                        checkInTime: new Date().toISOString(),
                        checkOutTime: undefined,
                        absenceReason: undefined,
                        selected: false
                    }
                    : child
            )
        );
        setSelectionMode(false);
    };

    const markSelectedAbsent = () => {
        const selectedChildren = children.filter(child => child.selected);
        if (selectedChildren.length === 0) {
            Alert.alert('No Selection', 'Please select at least one child');
            return;
        }

        if (selectedChildren.length > 1) {
            // For multiple children, mark all absent without reason
            setChildren(prevChildren =>
                prevChildren.map(child =>
                    child.selected
                        ? {
                            ...child,
                            status: 'Absent',
                            checkInTime: undefined,
                            checkOutTime: undefined,
                            absenceReason: 'Not specified',
                            selected: false
                        }
                        : child
                )
            );
            setSelectionMode(false);
        } else {
            // For single child, show reason modal
            const childToMark = selectedChildren[0];
            setChildren(prevChildren =>
                prevChildren.map(child =>
                    child.id === childToMark.id
                        ? {
                            ...child,
                            status: 'Absent',
                            checkInTime: undefined,
                            checkOutTime: undefined,
                            selected: false
                        }
                        : child
                )
            );
            setSelectedChild(childToMark);
            setShowAbsenceModal(true);
            setSelectionMode(false);
        }
    };

    const saveAbsenceReason = () => {
        if (selectedChild) {
            setChildren(prevChildren =>
                prevChildren.map(child =>
                    child.id === selectedChild.id
                        ? { ...child, absenceReason }
                        : child
                )
            );
            setShowAbsenceModal(false);
            setAbsenceReason('');
        }
    };

    const markCheckOut = (childId: string) => {
        setChildren(prevChildren =>
            prevChildren.map(child =>
                child.id === childId
                    ? { ...child, checkOutTime: new Date().toISOString() }
                    : child
            )
        );
    };

    const submitAttendance = async () => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            Alert.alert('Success', 'Attendance records saved successfully');
        } catch (error) {
            Alert.alert('Error', 'Failed to save attendance');
        } finally {
            setLoading(false);
        }
    };

    const filteredChildren = children.filter(child =>
        child.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const presentCount = children.filter(c => c.status === 'Present').length;
    const absentCount = children.filter(c => c.status === 'Absent').length;
    const selectedCount = children.filter(c => c.selected).length;

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { }}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <Text style={styles.dateText}>
                        {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleSelectionMode}>
                    <Ionicons
                        name={selectionMode ? "close" : "checkmark-circle"}
                        size={24}
                        color={selectionMode ? "#ef4444" : "#3b82f6"}
                    />
                </TouchableOpacity>
            </View>

            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}

            {/* Search */}
            <Searchbar
                placeholder='Search children...'
                value={searchQuery}
                onChangeText={(text: string): void => setSearchQuery(text)}
                style={{ backgroundColor: colors.primary[50], borderWidth: 0.1, borderColor: colors.gray[500], borderRadius: 8, marginVertical: 12, height: 60, marginHorizontal: 8 }}
                mode='view'
                showDivider={false}
                traileringIcon={'filter'}
                elevation={0}
                onTraileringIconPress={() => setSearchQuery}
            />


            {/* Stats */}
            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{children.length}</Text>
                    <Text style={styles.statLabel}>Total</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={[styles.statNumber, styles.presentStat]}>{presentCount}</Text>
                    <Text style={styles.statLabel}>Present</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={[styles.statNumber, styles.absentStat]}>{absentCount}</Text>
                    <Text style={styles.statLabel}>Absent</Text>
                </View>
            </View>

            {/* Selection Mode Actions */}
            {selectionMode && (
                <View style={styles.selectionActions}>
                    <Text style={styles.selectionCount}>{selectedCount} selected</Text>
                    <View style={styles.selectionButtons}>
                        <TouchableOpacity
                            style={[styles.selectionButton, styles.presentButton]}
                            onPress={markSelectedPresent}
                        >
                            <Text style={styles.selectionButtonText}>Mark Present</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.selectionButton, styles.absentButton]}
                            onPress={markSelectedAbsent}
                        >
                            <Text style={styles.selectionButtonText}>Mark Absent</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* Children List */}
            {loading ? (
                <ActivityIndicator size="large" color="#3b82f6" style={styles.loader} />
            ) : (
                <FlatList
                    data={filteredChildren}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[
                                styles.childCard,
                                item.selected && styles.selectedChildCard
                            ]}
                            onPress={() => {
                                if (selectionMode) {
                                    toggleChildSelection(item.id);
                                }
                            }}
                            onLongPress={() => {
                                if (!selectionMode) {
                                    setSelectionMode(true);
                                    toggleChildSelection(item.id);
                                }
                            }}
                            activeOpacity={0.7}
                        >
                            {selectionMode && (
                                <View style={styles.selectionIndicator}>
                                    {item.selected && (
                                        <Ionicons name="checkmark-circle" size={20} color="#3b82f6" />
                                    )}
                                </View>
                            )}

                            <View style={styles.childInfo}>
                                <View style={styles.avatar}>
                                    <Text style={styles.avatarText}>
                                        {item.name.charAt(0)}{item.name.split(' ')[1]?.charAt(0) || ''}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={styles.childName}>{item.name}</Text>
                                    {item.status === 'Present' && item.checkInTime && (
                                        <Text style={styles.timeText}>
                                            Checked in: {new Date(item.checkInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </Text>
                                    )}
                                    {item.absenceReason && (
                                        <Text style={styles.absenceReason} numberOfLines={1}>
                                            Reason: {item.absenceReason}
                                        </Text>
                                    )}
                                </View>
                            </View>

                            {!selectionMode && (
                                <View style={styles.actions}>
                                    {item.status === 'Present' ? (
                                        <>
                                            <TouchableOpacity
                                                style={[styles.actionButton, styles.checkOutButton]}
                                                onPress={() => markCheckOut(item.id)}
                                            >
                                                <Text style={styles.actionButtonText}>Check Out</Text>
                                            </TouchableOpacity>
                                            <View style={[styles.statusIndicator, styles.presentIndicator]} />
                                        </>
                                    ) : item.status === 'Absent' ? (
                                        <View style={[styles.statusIndicator, styles.absentIndicator]} />
                                    ) : (
                                        <>
                                            <TouchableOpacity
                                                style={[styles.actionButton, styles.presentButton]}
                                                onPress={() => {
                                                    setChildren(prevChildren =>
                                                        prevChildren.map(child =>
                                                            child.id === item.id
                                                                ? {
                                                                    ...child,
                                                                    status: 'Present',
                                                                    checkInTime: new Date().toISOString()
                                                                }
                                                                : child
                                                        )
                                                    );
                                                }}
                                            >
                                                <Text style={styles.actionButtonText}>Present</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={[styles.actionButton, styles.absentButton]}
                                                onPress={() => {
                                                    setSelectedChild(item);
                                                    setChildren(prevChildren =>
                                                        prevChildren.map(child =>
                                                            child.id === item.id
                                                                ? {
                                                                    ...child,
                                                                    status: 'Absent'
                                                                }
                                                                : child
                                                        )
                                                    );
                                                    setShowAbsenceModal(true);
                                                }}
                                            >
                                                <Text style={styles.actionButtonText}>Absent</Text>
                                            </TouchableOpacity>
                                        </>
                                    )}
                                </View>
                            )}
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>No children found</Text>
                    }
                />
            )}

            {/* Submit Button */}
            {!selectionMode && (
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={submitAttendance}
                    disabled={loading}
                >
                    <Text style={styles.submitButtonText}>
                        {loading ? 'Saving...' : 'Save Attendance'}
                    </Text>
                </TouchableOpacity>
            )}

            {/* Absence Reason Modal */}
            <Modal
                visible={showAbsenceModal}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Reason for Absence</Text>
                        <Text style={styles.modalSubtitle}>{selectedChild?.name}</Text>

                        <TextInput
                            style={styles.reasonInput}
                            placeholder="Enter reason (optional)"
                            value={absenceReason}
                            onChangeText={setAbsenceReason}
                            multiline
                        />

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => {
                                    setShowAbsenceModal(false);
                                    setAbsenceReason('');
                                }}
                            >
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.confirmButton]}
                                onPress={saveAbsenceReason}
                            >
                                <Text style={styles.modalButtonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    dateText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#3b82f6',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
        borderRadius: 8,
        paddingHorizontal: 12,
        margin: 16,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    presentStat: {
        color: '#10b981',
    },
    absentStat: {
        color: '#ef4444',
    },
    statLabel: {
        fontSize: 14,
        color: '#6b7280',
        marginTop: 4,
    },
    loader: {
        marginTop: 40,
    },
    childCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    selectedChildCard: {
        backgroundColor: '#f0f9ff',
    },
    selectionIndicator: {
        width: 24,
        marginRight: 8,
    },
    childInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#e0f2fe',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    avatarText: {
        color: '#0369a1',
        fontWeight: 'bold',
    },
    childName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    timeText: {
        fontSize: 12,
        color: '#6b7280',
        marginTop: 2,
    },
    absenceReason: {
        fontSize: 12,
        color: '#6b7280',
        marginTop: 2,
        maxWidth: 200,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        marginLeft: 8,
    },
    presentButton: {
        backgroundColor: '#dcfce7',
    },
    absentButton: {
        backgroundColor: '#fee2e2',
    },
    checkOutButton: {
        backgroundColor: '#fef3c7',
    },
    actionButtonText: {
        fontSize: 14,
        fontWeight: '500',
    },
    statusIndicator: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginLeft: 8,
    },
    presentIndicator: {
        backgroundColor: '#10b981',
    },
    absentIndicator: {
        backgroundColor: '#ef4444',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 40,
        color: '#9ca3af',
    },
    submitButton: {
        backgroundColor: '#3b82f6',
        padding: 16,
        margin: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        width: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    modalSubtitle: {
        fontSize: 16,
        color: '#6b7280',
        marginBottom: 16,
    },
    reasonInput: {
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 8,
        padding: 12,
        minHeight: 100,
        marginBottom: 16,
        textAlignVertical: 'top',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 8,
    },
    cancelButton: {
        backgroundColor: '#e5e7eb',
    },
    confirmButton: {
        backgroundColor: '#3b82f6',
    },
    modalButtonText: {
        fontWeight: 'bold',
    },
    selectionActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#f8fafc',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    selectionCount: {
        fontSize: 16,
        fontWeight: '500',
        color: '#334155',
    },
    selectionButtons: {
        flexDirection: 'row',
    },
    selectionButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 6,
        marginLeft: 8,
    },
    selectionButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#fff',
    },
});

export default DailyAttendanceScreen;