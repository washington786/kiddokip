import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Alert,
    ActivityIndicator
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { navigationTypes } from '@/types/navigationTypes';
import useTransition from '@/hooks/navigation/useTransition';
import { RTopBar } from '@/components/modules/application/children';
import { RCol, RInput, RKeyboardView, RPickerContainer, Scroller } from '@/components/common';
import { Picker } from '@react-native-picker/picker';
import { Button } from 'react-native-paper';
import { ChildFormStyles as styles, PickerStyle } from '@/styles';
import colors from '@/config/colors';

import { Text as RNText } from "react-native-paper";

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

const EditChildScreen = () => {
    const [child, setChild] = useState<Child | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const { childId } = useRoute<RouteProp<navigationTypes, "EditChild">>().params

    // Fetch child data
    useEffect(() => {
        const fetchChild = async () => {
            try {
                // Simulate API call - replace with actual fetch
                await new Promise(resolve => setTimeout(resolve, 800));

                const mockChild: Child = {
                    id: childId,
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
    }, [childId]);

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

    const { onBack } = useTransition();


    const handleSave = async () => {

        setSaving(true);
        try {
            // Simulate API call - replace with actual save
            await new Promise(resolve => setTimeout(resolve, 1500));

            Alert.alert(
                'Success',
                'Child information updated successfully',
                [{ text: 'OK', onPress: onBack }]
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
        <>
            {/* Header */}
            <RTopBar title='Edit Child' isRight={true} isTextIcon={true} onRightIconPress={handleSave} />

            <Scroller style={{ paddingHorizontal: 6, paddingBottom: 70 }}>

                {/* Basic Information */}
                {/* <Text style={styles.sectionHeader}>Basic Information</Text> */}
                <RNText variant='titleMedium'>Basic Information</RNText>
                <RKeyboardView style={{ paddingHorizontal: 0, marginHorizontal: 0 }}>
                    <RCol>
                        <RInput placeholder='First Name' value={child.firstName} />
                        <RInput placeholder='Last Name' value={child.lastName} />
                        <RInput placeholder='ID Number(13 digits)' value={child.idNumber} />
                        <RPickerContainer>
                            <Picker>
                                <Picker.Item value={child.gender} label={child.gender} />
                                <Picker.Item value={'male'} label='Male' />
                                <Picker.Item value={'female'} label='Female' />
                                <Picker.Item value={'other'} label='Other' />
                            </Picker>
                        </RPickerContainer>
                    </RCol>

                    {/* Parents/Guardians Section */}
                    <RNText variant='titleMedium' style={{ paddingVertical: 6 }}>Parents/Guardian</RNText>
                    {
                        child.parents.map((parent) => (
                            <View style={styles.parentCard} key={parent.name}>
                                <RCol >
                                    <RNText>{parent.relationship}</RNText>

                                    <RInput placeholder={`${parent.relationship}`} value={parent.name} />
                                    <RInput placeholder={`${parent.relationship}`} value={parent.contact} />
                                </RCol>
                            </View>
                        ))
                    }

                    {/* Medical Information */}
                    <RNText variant='titleMedium' style={{ paddingVertical: 6 }}>Medical Information</RNText>
                    <RInput placeholder='Allergies, conditions, etc. (optional)' value={child.medicalNotes} onChangeText={() => { }} multiline={true} style={{ minHeight: 200 }} />

                    {/* Submit Button */}
                    <Button loading={loading} mode='contained' theme={{ colors: { background: colors.primary[800] } }} onPress={() => { }} style={PickerStyle.btn}>Register Child</Button>
                </RKeyboardView>


            </Scroller>
        </>
    );
};

export default EditChildScreen;