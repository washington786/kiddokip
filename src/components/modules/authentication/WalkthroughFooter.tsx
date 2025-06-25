import { Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { Button } from 'react-native-paper'
import { Slide } from '../../../types/slides'

interface props {
    styles: any,
    slides: Slide[],
    handleNext(): void,
    handlePrevious(): void,
    currentIndex: any
}
const WalkthroughFooter: FC<props> = ({ handleNext, slides, styles, currentIndex, handlePrevious }) => {
    return (
        <View style={styles.footer}>
            <View style={styles.dots}>
                {slides.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            currentIndex === index && styles.activeDot,
                        ]}
                    />
                ))}
            </View>

            <View style={styles.footerControls}>

                {currentIndex > 0 && (
                    <TouchableOpacity onPress={handlePrevious}>
                        <Text style={styles.linkText}>Previous</Text>
                    </TouchableOpacity>
                )}

                <Button mode="contained" onPress={handleNext} style={[currentIndex === 0 ? styles.btnFull : styles.btnMin]}>
                    {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
                </Button>
            </View>

        </View>
    )
}

export default WalkthroughFooter