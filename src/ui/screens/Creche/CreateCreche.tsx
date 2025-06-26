import { View, Text, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import { RegistrationHeader, Steps } from '@/components/modules/authentication';
import { RCol, RInput, RKeyboardView, RRow, RText, Scroller } from '@/components/common';
import { Chip } from 'react-native-paper';
import { ageGroups, districts, mainDistricts, provinces } from '@/utils/data';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from "@expo/vector-icons"
import useTransition from '@/hooks/navigation/useTransition';
import { CrecheStyle as styles } from '@/styles';

const CreateCrechePage = () => {
    const [step, setStep] = useState(1);

    // const provinces = ['Western Cape', 'Gauteng', 'KwaZulu-Natal'];
    const facilityTypes = ['Home-based', 'Center-based', 'School-affiliated'];

    const [openingHours, setOpeningHours] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const onChange = (event: any, selectedDate?: Date) => {
        setShowPicker(Platform.OS === 'ios');
        if (selectedDate) {
            setOpeningHours(selectedDate);
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const [selectedProvince, setProvince] = useState();
    const [district, setDistrict] = useState<string[]>([]);

    const { login } = useTransition();

    console.log(selectedProvince);
    console.log(district);


    return (
        <Scroller style={styles.container}>
            {/* Progress Bar */}
            <Steps step={step} styles={styles} />

            {/* Step 1: Basic Info */}
            {step === 1 && (
                <View style={styles.stepContainer}>
                    <RegistrationHeader description='Enter basic creche information' title='Basic Information' />

                    <RKeyboardView style={{ paddingHorizontal: 0 }}>
                        <RInput placeholder='Creche Name' style={styles.input} />
                        <RInput placeholder='Registration Number (SA-CR-YYYY-XXXXX)' style={styles.input} />

                        <View style={styles.pickerContainer}>
                            <Picker>
                                {facilityTypes.map(type => (
                                    <Picker.Item key={type} label={type} value={type} />
                                ))}
                            </Picker>
                        </View>
                    </RKeyboardView>

                </View>
            )}

            {/* Step 2: Location */}
            {step === 2 && (
                <View style={styles.stepContainer}>
                    <RegistrationHeader description='Select creche location and district' title='Location Details' />

                    <View style={styles.pickerContainer}>
                        <Picker onValueChange={(val: any) => {
                            setProvince(val)
                            setDistrict(mainDistricts[val] || [])
                        }}>
                            <Picker.Item label="Select Province" value="" />
                            {provinces.map(province => (
                                <Picker.Item key={province} label={province} value={province} />
                            ))}
                        </Picker>
                    </View>

                    <View style={styles.pickerContainer}>
                        <Picker>
                            <Picker.Item label="Select District" value="" />
                            {
                                district.map((district, index) => <Picker.Item label={district} value={district} key={`${index}-${district}`} />)
                            }
                        </Picker>
                    </View>

                    <RInput placeholder='Physical Address' style={styles.input} />
                </View>
            )}

            {/* Step 3: Operational */}
            {step === 3 && (
                <View style={styles.stepContainer}>
                    <RegistrationHeader description='Enter the below information to complete the process.' title='Operation Information' />


                    <RCol>
                        <RText title='Select Age Groups' style={styles.label} />
                        <RRow style={{ gap: 5 }}>
                            {
                                ageGroups.map((age, index) => {
                                    return (
                                        <Chip mode='outlined' key={`${age}-${index}`}>{age}</Chip>
                                    )
                                })
                            }
                        </RRow>
                    </RCol>

                    <RRow style={{ gap: 5, alignItems: "center", justifyContent: "space-between", marginVertical: 8 }}>
                        <RCol style={{ minWidth: 180 }}>
                            <RText title='Opening Hours' style={styles.label} />
                            {Platform.OS === 'android' && (
                                <TouchableOpacity
                                    style={styles.timeButton}
                                    onPress={() => setShowPicker(true)}
                                >
                                    <Text>
                                        {formatTime(openingHours)}
                                    </Text>
                                    <AntDesign name='clockcircleo' />
                                </TouchableOpacity>
                            )}

                            {(showPicker || Platform.OS === 'ios') && (
                                <DateTimePicker
                                    value={openingHours}
                                    mode="time"
                                    is24Hour={true}
                                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                    onChange={onChange}
                                    style={styles.picker}
                                />
                            )}
                        </RCol>
                        <RCol style={{ minWidth: 180 }}>
                            <RText title='Closing Hours Hours' style={styles.label} />
                            {Platform.OS === 'android' && (
                                <TouchableOpacity
                                    style={styles.timeButton}
                                    onPress={() => setShowPicker(true)}
                                >
                                    <Text>
                                        {formatTime(openingHours)}
                                    </Text>
                                    <AntDesign name='clockcircleo' />
                                </TouchableOpacity>
                            )}

                            {(showPicker || Platform.OS === 'ios') && (
                                <DateTimePicker
                                    value={openingHours}
                                    mode="time"
                                    is24Hour={true}
                                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                    onChange={onChange}
                                    style={styles.picker}
                                />
                            )}
                        </RCol>
                    </RRow>
                    <RInput placeholder='Capacity' style={styles.input} keyboardType='number-pad' />
                </View>
            )}

            {/* Navigation Buttons */}
            <View style={styles.buttonContainer}>
                {step > 1 && (
                    <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={() => setStep(step - 1)}
                    >
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    style={[
                        styles.primaryButton,
                        step === 3 && styles.submitButton
                    ]}
                    onPress={() => step < 3 ? setStep(step + 1) : login()}
                >
                    <Text style={styles.buttonText}>
                        {step < 3 ? 'Next' : 'Submit'}
                    </Text>
                </TouchableOpacity>
            </View>
        </Scroller>
    );
}


export default CreateCrechePage
