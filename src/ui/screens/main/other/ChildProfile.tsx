import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Modal,
    Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useRoute } from '@react-navigation/native';
import { navigationTypes } from '@/types/navigationTypes';
import useTransition from '@/hooks/navigation/useTransition';
import { RCol, RDivider, RText, Scroller } from '@/components/common';
import { RTopBar } from '@/components/modules/application/children';
import colors from '@/config/colors';
import { Parent } from '@/types/parent';
import { Button } from 'react-native-paper';
import { PickerStyle } from '@/styles';

type Child = {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    gender: 'Male' | 'Female' | 'Other';
    status: 'Active' | 'Transferred' | 'Graduated';
    photo?: string;
    enrollmentDate: string;
    idNumber: string;
    medicalNotes?: string;
    parents: {
        name: string;
        contact: string;
        relationship: string;
        id: any
    }[];
};

const ChildProfileScreen = () => {

    const [child, setChild] = useState<Child | null>(null);

    const [loading, setLoading] = useState(true);
    const [showMedicalModal, setShowMedicalModal] = useState(false);
    const [showTransferModal, setShowTransferModal] = useState(false);

    const { params } = useRoute<RouteProp<navigationTypes, "ChildProfile">>()
    const { childId } = params;

    const { goToEditChild, onBack } = useTransition()

    // Fetch child data (mock - replace with API call)
    useEffect(() => {
        const fetchChild = async () => {
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 800));

                // Mock data - replace with actual data fetching
                const mockChild: Child = {
                    id: childId,
                    firstName: 'Lindiwe',
                    lastName: 'Mkhize',
                    age: 3,
                    gender: 'Female',
                    status: 'Active',
                    photo: 'https://example.com/child-photo.jpg', // Replace with actual photo URI
                    enrollmentDate: '2023-01-15',
                    idNumber: '1234567890123',
                    medicalNotes: 'No known allergies. Up to date with vaccinations.',
                    parents: [
                        {
                            name: 'Nozipho Mkhize',
                            contact: '+27711234567',
                            relationship: 'Mother',
                            id: "2"
                        },
                        {
                            name: 'Thabo Mkhize',
                            contact: '+27717654321',
                            relationship: 'Father',
                            id: "13"
                        }
                    ]
                };

                setChild(mockChild);
            } catch (error) {
                Alert.alert('Error', 'Failed to load child data');
            } finally {
                setLoading(false);
            }
        };

        fetchChild();
    }, [childId]);


    const handleTransfer = () => {
        setShowTransferModal(true);
    };

    const confirmTransfer = () => {
        setShowTransferModal(false);
        Alert.alert('Transfer Initiated', 'The transfer process has been started');
    };

    return (
        <>
            {/* Header */}
            <RTopBar title='Child Profile' isRight={true} onRightIconPress={() => goToEditChild({ childId: childId })} />
            <RDivider />
            <Scroller>
                <RCol style={{ alignItems: "center", justifyContent: "space-between", position: "relative", minHeight: 60, backgroundColor: colors.slate[50], padding: 6, marginVertical: 8 }}>
                    {/* Profile Section */}
                    <View style={styles.profileSection}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.name}>{child?.firstName} {child?.lastName}</Text>
                            <Text style={styles.details}>
                                {child?.age} years • {child?.gender} • {child?.status}
                            </Text>
                        </View>
                    </View>

                    {/* Status Badge */}
                    <View style={[
                        styles.statusBadge,
                        child?.status === 'Active' ? styles.activeBadge :
                            child?.status === 'Transferred' ? styles.transferredBadge : styles.graduatedBadge
                    ]}>
                        <Text style={styles.statusText}>{child?.status}</Text>
                    </View>
                </RCol>

                {/* Basic Information */}
                <View style={styles.section}>
                    <RDivider />
                    <Text style={styles.sectionTitle}>Basic Information</Text>
                    <BasicItem icon={'calendar'} title={`Date of Birth: ${new Date(child?.enrollmentDate as any).toLocaleDateString()}`} />
                    <BasicItem icon={'finger-print'} title={`ID Number: ${child?.idNumber}`} />
                    <BasicItem icon={'school'} title={`Enrolled: ${new Date(child?.enrollmentDate as any).toLocaleDateString()}`} />
                </View>

                {/* Parents/Guardians */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Parents/Guardians</Text>
                    {child?.parents.map((parent, index) => (
                        <ParentCard parent={parent} key={index} />
                    ))}
                </View>

                {/* Medical Information */}
                <View style={styles.section}>
                    <View style={styles.sectionHeaderRow}>
                        <Text style={styles.sectionTitle}>Medical Information</Text>
                        <TouchableOpacity onPress={() => setShowMedicalModal(true)}>
                            {/* <Text style={styles.viewAllText}>View Details</Text> */}
                            <RText title='View Details' />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.medicalSummary} numberOfLines={3}>
                        {child?.medicalNotes || 'No medical information available'}
                    </Text>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                    <Button theme={{ colors: { primary: colors.primary[500] } }} mode='contained' style={PickerStyle.btn} onPress={handleTransfer}>Transfer Child</Button>
                </View>

                {/* Medical Notes Modal */}
                <Modal
                    visible={showMedicalModal}
                    animationType="slide"
                    transparent={false}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Medical Information</Text>
                            <TouchableOpacity onPress={() => setShowMedicalModal(false)}>
                                <Ionicons name="close" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={styles.modalContent}>
                            <Text style={styles.medicalDetails}>
                                {child?.medicalNotes || 'No medical information available'}
                            </Text>
                        </ScrollView>
                    </View>
                </Modal>

                {/* Transfer Modal */}
                <Modal
                    visible={showTransferModal}
                    animationType="fade"
                    transparent={true}
                >
                    <View style={styles.transferModalContainer}>
                        <View style={styles.transferModalContent}>
                            <Text style={styles.transferModalTitle}>Transfer Child</Text>
                            <Text style={styles.transferModalText}>
                                Are you sure you want to transfer {child?.firstName} to another crèche?
                            </Text>
                            <View style={styles.transferModalButtons}>
                                <TouchableOpacity
                                    style={[styles.modalButton, styles.cancelButton]}
                                    onPress={() => setShowTransferModal(false)}
                                >
                                    <Text style={styles.modalButtonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.modalButton, styles.confirmButton]}
                                    onPress={confirmTransfer}
                                >
                                    <Text style={styles.modalButtonText}>Confirm</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </Scroller>
        </>
    );
};

interface props {
    title: string | any;
    icon: any;
}
function BasicItem({ icon, title }: props) {
    return (
        <View style={styles.infoRow}>
            <Ionicons name={icon} size={20} color="#6b7280" />
            <Text style={styles.infoText}>{title}</Text>
        </View>
    )
}

interface parent {
    parent: Parent
}
function ParentCard({ parent }: parent) {
    return (
        <View style={styles.parentCard} >
            <Text style={styles.parentRole}>{parent.relationship}</Text>
            <Text style={styles.parentName}>{parent.name}</Text>
            <View style={styles.contactRow}>
                <Ionicons name="call" size={16} color="#6b7280" />
                <Text style={styles.contactText}>{parent.contact}</Text>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    headerIcons: {
        flexDirection: 'row',
    },
    iconButton: {
        marginLeft: 16,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    photoContainer: {
        marginRight: 16,
    },
    photo: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    photoPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#f3f4f6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameContainer: {
        flex: 1,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    details: {
        fontSize: 16,
        color: '#6b7280',
    },
    statusBadge: {
        position: "absolute",
        top: 10,
        right: 10,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 5,
    },
    activeBadge: {
        backgroundColor: '#dcfce7',
    },
    transferredBadge: {
        backgroundColor: '#fee2e2',
    },
    graduatedBadge: {
        backgroundColor: '#fef9c3',
    },
    statusText: {
        fontSize: 14,
        fontWeight: '500',
    },
    section: {
        paddingHorizontal: 20,
        paddingTop: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
    },
    sectionHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    viewAllText: {
        color: '#3b82f6',
        fontSize: 14,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    infoText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#4b5563',
    },
    parentCard: {
        backgroundColor: '#f9fafb',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
    },
    parentRole: {
        fontSize: 14,
        color: '#6b7280',
        marginBottom: 4,
    },
    parentName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 4,
    },
    contactRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contactText: {
        marginLeft: 4,
        color: '#6b7280',
    },
    medicalSummary: {
        color: '#4b5563',
        lineHeight: 22,
    },
    medicalDetails: {
        color: '#4b5563',
        lineHeight: 24,
        fontSize: 16,
    },
    actionButtons: {
        flexDirection: 'row',
        padding: 20,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
        marginHorizontal: 8,
    },
    transferButton: {
        backgroundColor: '#f59e0b',
    },
    contactButton: {
        backgroundColor: '#3b82f6',
    },
    actionButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 8,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    modalContent: {
        flex: 1,
    },
    transferModalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    transferModalContent: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        width: '80%',
    },
    transferModalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
    },
    transferModalText: {
        fontSize: 16,
        color: '#4b5563',
        marginBottom: 24,
        textAlign: 'center',
    },
    transferModalButtons: {
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
});

export default ChildProfileScreen;