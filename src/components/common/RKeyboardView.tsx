import { KeyboardAvoidingView, Platform } from 'react-native'
import React, { FC, ReactNode } from 'react'

const RKeyboardView: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "android" ? "padding" : "height"} style={{ width: "100%", paddingHorizontal: 12, gap: 12 }}>
            {children}
        </KeyboardAvoidingView>
    )
}

export default RKeyboardView