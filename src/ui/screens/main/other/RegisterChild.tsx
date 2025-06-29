import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
    Image,
    Platform,
    ActivityIndicator,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StackNavigationProp } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';

type Parent = {
    id: string;
    name: string;
    contact: string;
    relationship: string;
};

const relationshipOptions = [
    'Mother',
    'Father',
    'Legal Guardian',
    'Grandparent',
    'Other Relative'
];

interface RegisterChildScreenProps {
    navigation: StackNavigationProp<any>;
}

const RegisterChildScreen: React.FC<RegisterChildScreenProps> = ({ navigation }) => {
    // Child state
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
    const [medicalNotes, setMedicalNotes] = useState('');
    const [photo, setPhoto] = useState<string | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);

    // Parents state
    const [parents, setParents] = useState<Parent[]>([
        {
            id: '1',
            name: '',
            contact: '',
            relationship: 'Mother'
        }
    ]);

    // UI state
    const [loading, setLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    // Calculate age from DOB
    const calculateAge = (dob: Date): number => {
        const diff = Date.now() - dob.getTime();
        const ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    // Handle date change
    const onDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (selectedDate) {
            setDateOfBirth(selectedDate);
        }
    };

    // Parent management
    const addParent = () => {
        if (parents.length >= 4) {
            Alert.alert('Maximum reached', 'You can only add up to 4 parents/guardians');
            return;
        }

        const newParent: Parent = {
            id: Date.now().toString(),
            name: '',
            contact: '',
            relationship: parents.length === 0 ? 'Mother' : 'Father'
        };
        setParents([...parents, newParent]);
    };

    const removeParent = (id: string) => {
        if (parents.length <= 1) {
            Alert.alert('Error', 'At least one parent/guardian is required');
            return;
        }
        setParents(parents.filter(p => p.id !== id));
    };

    const updateParent = (id: string, field: keyof Parent, value: string) => {
        setParents(parents.map(p =>
            p.id === id ? { ...p, [field]: value } : p
        ));
    };

    // Form validation
    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};

        if (!firstName.trim()) errors.firstName = 'First name is required';
        if (!lastName.trim()) errors.lastName = 'Last name is required';

        if (!idNumber) {
            errors.idNumber = 'ID number is required';
        } else if (!/^[0-9]{13}$/.test(idNumber)) {
            errors.idNumber = 'Invalid ID number (must be 13 digits)';
        }

        const age = calculateAge(dateOfBirth);
        if (age > 6) errors.dateOfBirth = 'Child must be 6 years or younger';
        if (age < 0) errors.dateOfBirth = 'Invalid birth date';

        parents.forEach((parent, index) => {
            if (!parent.name.trim()) {
                errors[`parentName_${parent.id}`] = `Parent ${index + 1} name is required`;
            }
            if (!parent.contact.trim()) {
                errors[`parentContact_${parent.id}`] = `Parent ${index + 1} contact is required`;
            }
        });

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Form submission
    const handleSubmit = async () => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            // Prepare form data
            const formData = new FormData();

            // Add child data
            formData.append('child[firstName]', firstName);
            formData.append('child[lastName]', lastName);
            formData.append('child[idNumber]', idNumber);
            formData.append('child[dateOfBirth]', dateOfBirth.toISOString());
            formData.append('child[gender]', gender);
            formData.append('child[medicalNotes]', medicalNotes);

            if (photo) {
                formData.append('child[photo]', {
                    uri: photo,
                    type: 'image/jpeg',
                    name: 'child-photo.jpg',
                } as any);
            }

            // Add parents data
            parents.forEach((parent, index) => {
                formData.append(`parents[${index}][name]`, parent.name);
                formData.append(`parents[${index}][contact]`, parent.contact);
                formData.append(`parents[${index}][relationship]`, parent.relationship);
            });

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // On success
            Alert.alert(
                'Registration Successful',
                `${firstName} ${lastName} has been registered`,
                [{ text: 'OK', onPress: () => navigation.goBack() }]
            );

        } catch (error) {
            Alert.alert('Error', 'Failed to register child. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.title}>Register New Child</Text>
                <View style={{ width: 24 }} />
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
                        value={firstName}
                        onChangeText={text => {
                            setFirstName(text);
                            if (validationErrors.firstName) {
                                setValidationErrors(prev => ({ ...prev, firstName: '' }));
                            }
                        }}
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
                        value={lastName}
                        onChangeText={text => {
                            setLastName(text);
                            if (validationErrors.lastName) {
                                setValidationErrors(prev => ({ ...prev, lastName: '' }));
                            }
                        }}
                    />
                    {validationErrors.lastName && (
                        <Text style={styles.errorText}>{validationErrors.lastName}</Text>
                    )}
                </View>
            </View>

            <TextInput
                placeholder="ID Number (13 digits) *"
                style={[
                    styles.input,
                    validationErrors.idNumber && styles.inputError
                ]}
                value={idNumber}
                onChangeText={text => {
                    setIdNumber(text);
                    if (validationErrors.idNumber) {
                        setValidationErrors(prev => ({ ...prev, idNumber: '' }));
                    }
                }}
                keyboardType="numeric"
                maxLength={13}
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
                <Text style={dateOfBirth ? styles.inputText : styles.placeholderText}>
                    {dateOfBirth ? dateOfBirth.toLocaleDateString() : 'Date of Birth *'}
                </Text>
                <Ionicons name="calendar" size={20} color="#9ca3af" />
            </TouchableOpacity>
            {validationErrors.dateOfBirth && (
                <Text style={styles.errorText}>{validationErrors.dateOfBirth}</Text>
            )}

            {showDatePicker && (
                <DateTimePicker
                    value={dateOfBirth}
                    mode="date"
                    display="default"
                    maximumDate={new Date()}
                    onChange={onDateChange}
                />
            )}

            <View style={styles.genderContainer}>
                {['Male', 'Female', 'Other'].map((option) => (
                    <TouchableOpacity
                        key={option}
                        style={[
                            styles.genderOption,
                            gender === option && styles.selectedGenderOption
                        ]}
                        onPress={() => setGender(option as any)}
                    >
                        <Text style={gender === option ? styles.selectedGenderText : styles.genderText}>
                            {option}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Parents/Guardians Section */}
            <Text style={styles.sectionHeader}>Parents/Guardians</Text>

            {parents.map((parent) => (
                <View key={parent.id} style={styles.parentCard}>
                    <View style={styles.parentHeader}>
                        <Picker
                            selectedValue={parent.relationship}
                            style={styles.relationshipPicker}
                            onValueChange={(value) => updateParent(parent.id, 'relationship', value)}
                        >
                            {relationshipOptions.map(option => (
                                <Picker.Item key={option} label={option} value={option} />
                            ))}
                        </Picker>
                        {parents.length > 1 && (
                            <TouchableOpacity onPress={() => removeParent(parent.id)}>
                                <Ionicons name="close-circle" size={24} color="#ef4444" />
                            </TouchableOpacity>
                        )}
                    </View>

                    <TextInput
                        placeholder={`${parent.relationship} Name *`}
                        style={[
                            styles.input,
                            validationErrors[`parentName_${parent.id}`] && styles.inputError
                        ]}
                        value={parent.name}
                        onChangeText={(text) => {
                            updateParent(parent.id, 'name', text);
                            if (validationErrors[`parentName_${parent.id}`]) {
                                setValidationErrors(prev => ({ ...prev, [`parentName_${parent.id}`]: '' }));
                            }
                        }}
                    />
                    {validationErrors[`parentName_${parent.id}`] && (
                        <Text style={styles.errorText}>{validationErrors[`parentName_${parent.id}`]}</Text>
                    )}

                    <TextInput
                        placeholder="Contact Number *"
                        style={[
                            styles.input,
                            validationErrors[`parentContact_${parent.id}`] && styles.inputError
                        ]}
                        value={parent.contact}
                        onChangeText={(text) => {
                            updateParent(parent.id, 'contact', text);
                            if (validationErrors[`parentContact_${parent.id}`]) {
                                setValidationErrors(prev => ({ ...prev, [`parentContact_${parent.id}`]: '' }));
                            }
                        }}
                        keyboardType="phone-pad"
                    />
                    {validationErrors[`parentContact_${parent.id}`] && (
                        <Text style={styles.errorText}>{validationErrors[`parentContact_${parent.id}`]}</Text>
                    )}
                </View>
            ))}

            <TouchableOpacity style={styles.addParentButton} onPress={addParent}>
                <Ionicons name="add" size={20} color="#3b82f6" />
                <Text style={styles.addParentText}>Add Another Parent/Guardian</Text>
            </TouchableOpacity>

            {/* Medical Information */}
            <Text style={styles.sectionHeader}>Medical Information</Text>
            <TextInput
                placeholder="Allergies, conditions, etc. (optional)"
                style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                value={medicalNotes}
                onChangeText={setMedicalNotes}
                multiline
            />

            {/* Submit Button */}
            <TouchableOpacity
                style={[styles.submitButton, loading && styles.disabledButton]}
                onPress={handleSubmit}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <Text style={styles.submitButtonText}>Register Child</Text>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputError: {
        borderColor: '#ef4444',
    },
    inputText: {
        color: '#333',
    },
    placeholderText: {
        color: '#9ca3af',
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
    parentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    relationshipPicker: {
        flex: 1,
        height: 50,
        width: '100%',
    },
    addParentButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderWidth: 1,
        borderColor: '#3b82f6',
        borderRadius: 8,
        marginBottom: 16,
        justifyContent: 'center',
    },
    addParentText: {
        color: '#3b82f6',
        marginLeft: 8,
    },
    submitButton: {
        backgroundColor: '#3b82f6',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 24,
    },
    disabledButton: {
        backgroundColor: '#9ca3af',
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    errorText: {
        color: '#ef4444',
        fontSize: 12,
        marginTop: -8,
        marginBottom: 12,
    },
});

export default RegisterChildScreen;