import React, { useState } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { RTopBar } from '@/components/modules/application/children';

import { Button, Text as RNText } from "react-native-paper"
import { RCol, RInput, RKeyboardView, RPickerContainer, Scroller } from '@/components/common';
import colors from '@/config/colors';
import { PickerStyle } from '@/styles';
import { Parent } from '@/types/parent';
import { relationshipOptions } from '@/utils/relationships';


const RegisterChildScreen = () => {
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


    // Form submission
    const handleSubmit = async () => {

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
            // Alert.alert(
            //     'Registration Successful',
            //     `${firstName} ${lastName} has been registered`,
            //     [{ text: 'OK', onPress: () => navigation.goBack() }]
            // );

        } catch (error) {
            Alert.alert('Error', 'Failed to register child. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <RTopBar title='Register New Child' />
            <Scroller style={styles.container}>
                {/* Header */}

                {/* Basic Information */}
                <RNText variant='titleMedium' style={{ paddingVertical: 8 }}>Basic Information</RNText>

                <RKeyboardView style={{ paddingHorizontal: 0, marginHorizontal: 0 }}>
                    <RCol>
                        <RInput placeholder='First Name' />
                        <RInput placeholder='Last Name' />
                        <RInput placeholder='ID Number(13 digits)' />
                        <RPickerContainer>
                            <Picker>
                                <Picker.Item value={''} label='Select Gender' />
                                <Picker.Item value={'male'} label='Male' />
                                <Picker.Item value={'female'} label='Female' />
                                <Picker.Item value={'other'} label='Other' />
                            </Picker>
                        </RPickerContainer>
                    </RCol>

                    {/* Parents/Guardians Section */}
                    <RNText variant='titleMedium' style={{ paddingVertical: 6 }}>Parents/Guardian</RNText>
                    {
                        parents.map((parent) => (
                            <View style={styles.parentCard} key={parent.id}>
                                <RCol >
                                    <RPickerContainer>
                                        <Picker>
                                            {
                                                relationshipOptions.map((relationship) => <Picker.Item label={relationship} key={relationship} value={relationship} />)
                                            }
                                        </Picker>
                                    </RPickerContainer>
                                    {parents.length > 1 && (
                                        <TouchableOpacity onPress={() => removeParent(parent.id)}>
                                            <Ionicons name="close-circle" size={24} color={colors.red[700]} />
                                        </TouchableOpacity>
                                    )}
                                    <RInput placeholder={`${parent.relationship} Name`} />
                                    <RInput placeholder={`${parent.relationship} Contact`} />
                                </RCol>
                            </View>
                        ))
                    }
                    <Button onPress={addParent} mode='outlined' style={[PickerStyle.btn, PickerStyle.outline]} theme={{ colors: { primary: colors.primary[500] } }} icon={'plus'}>Add Another Parent/Guardian</Button>

                    {/* Medical Information */}
                    <RNText variant='titleMedium' style={{ paddingVertical: 6 }}>Medical Information</RNText>
                    <RInput placeholder='Allergies, conditions, etc. (optional)' value={medicalNotes} onChangeText={setMedicalNotes} multiline={true} style={{ minHeight: 200 }} />

                    {/* Submit Button */}
                    <Button loading={loading} mode='contained' theme={{ colors: { background: colors.primary[800] } }} onPress={handleSubmit} style={PickerStyle.btn}>Register Child</Button>
                </RKeyboardView>

            </Scroller>
        </>
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