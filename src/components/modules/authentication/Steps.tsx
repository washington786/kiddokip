import { View } from 'react-native'
import React from 'react'

interface props {
    styles?: any;
    step: number;
}

const Steps = ({ step, styles }: props) => {
    return (
        <View style={styles.progressContainer}>
            {[1, 2, 3].map((i) => (
                <View
                    key={i}
                    style={[
                        styles.progressStep,
                        i <= step ? styles.activeStep : styles.inactiveStep
                    ]}
                />
            ))}
        </View>
    )
}

export default Steps