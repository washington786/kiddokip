import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    Alert,
    ActivityIndicator,
    Platform
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type Child = {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: 'Male' | 'Female' | 'Other';
    idNumber: string;
    photo?: string;
    medicalNotes?: string;
    parents: {
        name: string;
        contact: string;
        relationship: string;
    }[];
};

type RootStackParamList = {
    EditChild: { childId: string };
};

interface EditChildScreenProps {
    navigation: StackNavigationProp<RootStackParamList, 'EditChild'>;
    route: RouteProp<RootStackParamList, 'EditChild'>;
}

const EditChildScreen: React.FC<EditChildScreenProps> = ({ navigation, route }) => {
    const [child, setChild] = useState<Child | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    // Fetch child data
    useEffect(() => {
        const fetchChild = async () => {
            try {
                // Simulate API call - replace with actual fetch
                await new Promise(resolve => setTimeout(resolve, 800));

                const mockChild: Child = {
                    id: route.params.childId,
                    firstName: 'Lindiwe',
                    lastName: 'Mkhize',
                    dateOfBirth: '2020-05-15',
                    gender: 'Female',
                    idNumber: '1234567890123',
                    photo: 'https://example.com/child-photo.jpg',
                    medicalNotes: 'No known allergies',
                    parents: [
                        {
                            name: 'Nozipho Mkhize',
                            contact: '+27711234567',
                            relationship: 'Mother'
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
    }, [route.params.childId]);

    const calculateAge = (dob: string): number => {
        const diff = Date.now() - new Date(dob).getTime();
        const ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    const handleChange = (field: keyof Child, value: string) => {
        if (child) {
            setChild({ ...child, [field]: value });
            if (validationErrors[field]) {
                setValidationErrors(prev => ({ ...prev, [field]: '' }));
            }
        }
    };

    const handleParentChange = (index: number, field: keyof Child['parents'][0], value: string) => {
        if (child) {
            const updatedParents = [...child.parents];
            updatedParents[index][field] = value;
            setChild({ ...child, parents: updatedParents });
        }
    };

    const validateForm = (): boolean => {
        if (!child) return false;

        const errors: Record<string, string> = {};

        if (!child.firstName.trim()) errors.firstName = 'First name is required';
        if (!child.lastName.trim()) errors.lastName = 'Last name is required';
        if (!child.idNumber) errors.idNumber = 'ID number is required';

        const age = calculateAge(child.dateOfBirth);
        if (age > 6) errors.dateOfBirth = 'Child must be 6 years or younger';

        child.parents.forEach((parent, index) => {
            if (!parent.name.trim()) {
                errors[`parentName_${index}`] = 'Parent name is required';
            }
            if (!parent.contact.trim()) {
                errors[`parentContact_${index}`] = 'Contact number is required';
            }
        });

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSave = async () => {
        if (!child || !validateForm()) return;

        setSaving(true);
        try {
            // Simulate API call - replace with actual save
            await new Promise(resolve => setTimeout(resolve, 1500));

            Alert.alert(
                'Success',
                'Child information updated successfully',
                [{ text: 'OK', onPress: () => navigation.goBack() }]
            );
        } catch (error) {
            Alert.alert('Error', 'Failed to save changes');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#3b82f6" />
            </View>
        );
    }

    if (!child) {
        return (
            <View style={styles.errorContainer}>
                <Text>Child not found</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.title}>Edit Child</Text>
                <TouchableOpacity onPress={handleSave} disabled={saving}>
                    {saving ? (
                        <ActivityIndicator size="small" color="#3b82f6" />
                    ) : (
                        <Text style={styles.saveButtonText}>Save</Text>
                    )}
                </TouchableOpacity>
            </View>

            {/* Basic Information */}
            <Text style={styles.sectionHeader}>Basic Information</Text>

            <View style={styles.nameContainer}>
                <View style={{ flex: 1, marginRight: 8 }}>
                    <TextInput
                        placeholder="First Name *"
                        style={[
                            styles.input,
                            validationErrors.firstName && styles.inputError
                        ]}
                        value={child.firstName}
                        onChangeText={(text) => handleChange('firstName', text)}
                    />
                    {validationErrors.firstName && (
                        <Text style={styles.errorText}>{validationErrors.firstName}</Text>
                    )}
                </View>

                <View style={{ flex: 1 }}>
                    <TextInput
                        placeholder="Last Name *"
                        style={[
                            styles.input,
                            validationErrors.lastName && styles.inputError
                        ]}
                        value={child.lastName}
                        onChangeText={(text) => handleChange('lastName', text)}
                    />
                    {validationErrors.lastName && (
                        <Text style={styles.errorText}>{validationErrors.lastName}</Text>
                    )}
                </View>
            </View>

            <TextInput
                placeholder="ID Number *"
                style={[
                    styles.input,
                    validationErrors.idNumber && styles.inputError
                ]}
                value={child.idNumber}
                onChangeText={(text) => handleChange('idNumber', text)}
                keyboardType="numeric"
            />
            {validationErrors.idNumber && (
                <Text style={styles.errorText}>{validationErrors.idNumber}</Text>
            )}

            <TouchableOpacity
                style={[
                    styles.input,
                    validationErrors.dateOfBirth && styles.inputError
                ]}
                onPress={() => setShowDatePicker(true)}
            >
                <Text style={styles.inputText}>
                    {new Date(child.dateOfBirth).toLocaleDateString()}
                </Text>
                <Ionicons name="calendar" size={20} color="#9ca3af" />
            </TouchableOpacity>
            {validationErrors.dateOfBirth && (
                <Text style={styles.errorText}>{validationErrors.dateOfBirth}</Text>
            )}

            {showDatePicker && (
                <DateTimePicker
                    value={new Date(child.dateOfBirth)}
                    mode="date"
                    display="default"
                    maximumDate={new Date()}
                    onChange={(event, date) => {
                        setShowDatePicker(Platform.OS === 'ios');
                        if (date) {
                            handleChange('dateOfBirth', date.toISOString().split('T')[0]);
                        }
                    }}
                />
            )}

            <View style={styles.genderContainer}>
                {['Male', 'Female', 'Other'].map((option) => (
                    <TouchableOpacity
                        key={option}
                        style={[
                            styles.genderOption,
                            child.gender === option && styles.selectedGenderOption
                        ]}
                        onPress={() => handleChange('gender', option as any)}
                    >
                        <Text style={child.gender === option ? styles.selectedGenderText : styles.genderText}>
                            {option}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Parents/Guardians */}
            <Text style={styles.sectionHeader}>Parents/Guardians</Text>

            {child.parents.map((parent, index) => (
                <View key={index} style={styles.parentCard}>
                    <Text style={styles.parentRole}>{parent.relationship}</Text>

                    <TextInput
                        placeholder="Full Name *"
                        style={[
                            styles.input,
                            validationErrors[`parentName_${index}`] && styles.inputError
                        ]}
                        value={parent.name}
                        onChangeText={(text) => handleParentChange(index, 'name', text)}
                    />
                    {validationErrors[`parentName_${index}`] && (
                        <Text style={styles.errorText}>{validationErrors[`parentName_${index}`]}</Text>
                    )}

                    <TextInput
                        placeholder="Contact Number *"
                        style={[
                            styles.input,
                            validationErrors[`parentContact_${index}`] && styles.inputError
                        ]}
                        value={parent.contact}
                        onChangeText={(text) => handleParentChange(index, 'contact', text)}
                        keyboardType="phone-pad"
                    />
                    {validationErrors[`parentContact_${index}`] && (
                        <Text style={styles.errorText}>{validationErrors[`parentContact_${index}`]}</Text>
                    )}
                </View>
            ))}

            {/* Medical Information */}
            <Text style={styles.sectionHeader}>Medical Information</Text>
            <TextInput
                placeholder="Allergies, conditions, etc."
                style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                value={child.medicalNotes}
                onChangeText={(text) => handleChange('medicalNotes', text)}
                multiline
            />

            <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSave}
                disabled={saving}
            >
                {saving ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        paddingBottom: 40,
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
        marginBottom: 24,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    saveButtonText: {
        color: '#3b82f6',
        fontWeight: 'bold',
        fontSize: 16,
    },
    photoContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#f3f4f6',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        borderWidth: 2,
        borderColor: '#e5e7eb',
    },
    photo: {
        width: '100%',
        height: '100%',
        borderRadius: 60,
    },
    photoText: {
        color: '#9ca3af',
        marginTop: 8,
    },
    sectionHeader: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
        marginTop: 16,
    },
    nameContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        fontSize: 16,
    },
    inputError: {
        borderColor: '#ef4444',
    },
    inputText: {
        color: '#333',
    },
    genderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    genderOption: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        marginHorizontal: 4,
        alignItems: 'center',
    },
    selectedGenderOption: {
        backgroundColor: '#3b82f6',
        borderColor: '#3b82f6',
    },
    genderText: {
        color: '#666',
    },
    selectedGenderText: {
        color: 'white',
        fontWeight: '500',
    },
    parentCard: {
        backgroundColor: '#f8fafc',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    parentRole: {
        fontWeight: '600',
        color: '#6b7280',
        marginBottom: 8,
    },
    errorText: {
        color: '#ef4444',
        fontSize: 12,
        marginTop: -8,
        marginBottom: 12,
    },
    saveButton: {
        backgroundColor: '#3b82f6',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 24,
    },
});

export default EditChildScreen;