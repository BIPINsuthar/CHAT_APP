import React, { useState } from 'react'
import { View, Text, StyleSheet, StatusBar, Image, KeyboardAvoidingView, ActivityIndicator, TouchableOpacity } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import auth from '@react-native-firebase/auth'

export default function SingIn({ navigation }) {
    const [email, Setemail] = useState('')
    const [pass, setPass] = useState('')
    const [loading, setLoading] = useState(false)

    if (loading) {
        <ActivityIndicator size="large" color="green" />
    }
    const userLogin = async () => {
        setLoading(true)
        if (!email || !pass) {
            alert('please fill all the fields');
            return;
        }
        try {
            const result = await auth().signInWithEmailAndPassword(email, pass);
            setLoading(false)
            if (result.user.uid != '') {
                alert('login successfully done')
            }
        }
        catch (err) {
            alert(err)
        }

    }
    return (
        <KeyboardAvoidingView style={styles.container} behavior="position">
            <StatusBar barStyle="light-content" backgroundColor="green" />
            <View style={styles.logo_View}>
                <Text style={styles.header_text}>Welcome to whatsapp</Text>
                <Image source={require('../assests/images/WhatsApp.svg.webp')} style={styles.image} />
            </View>
            <View style={styles.textinput_view}>
                <TextInput
                    label="Email:"
                    value={email}
                    onChangeText={(text) => Setemail(text)}
                    mode="outlined"
                    style={styles.input}
                />
                <TextInput
                    label="Password:"
                    value={pass}
                    onChangeText={(text) => setPass(text)}
                    secureTextEntry={true}
                    mode="outlined"
                    style={styles.input}

                />

                <Button mode="contained" style={styles.btn}
                    onPress={() => userLogin()}
                >Sing In</Button>
                <TouchableOpacity style={styles.link}
                    onPress={() => navigation.goBack()}>
                    <Text style={styles.link_text}>Don't have account?</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: 200,
        height: 200
    },
    logo_View: {
        width: 250,
        height: 370,
        // backgroundColor: 'red',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        marginVertical: 10
    },
    textinput_view: {
        width: '90%',
        alignSelf: 'center',
    },
    btn: {
        marginVertical: 10
    },
    header_text: {
        fontSize: 20
    },
    link: {
        marginVertical: 10
    },
    link_text: {
        textAlign: 'center',
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold'
    }

})
