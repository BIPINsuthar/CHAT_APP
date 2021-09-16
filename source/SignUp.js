import React, { useState } from 'react'
import { View, Text, StyleSheet, StatusBar } from 'react-native'

export default function SignUp() {
    const [email, Setemail] = useState('')
    const [name, Setname] = useState('')
    const [pass, setPass] = useState('')
    const [image, Setimage] = useState('')
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="green" />
            <Text></Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
