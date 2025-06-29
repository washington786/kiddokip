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
import { ChildFormStyles as styles, PickerStyle } from '@/styles';
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
            {/* Header */}
            <RTopBar title='Register New Child' />
            <Scroller style={styles.container}>

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

export default RegisterChildScreen;