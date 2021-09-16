import React, { useState } from 'react'
import { View, Text, StyleSheet, StatusBar, Image, KeyboardAvoidingView, TouchableOpacityBase, TouchableOpacity } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage'
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export default function SignUp({ navigation }) {
    const [email, Setemail] = useState('')
    const [name, Setname] = useState('')
    const [pass, setPass] = useState('')
    const [image, Setimage] = useState('')
    const [next, Setnext] = useState(false)

    const pickImageAndUpload = () => {
        launchImageLibrary({ quality: 0.5 }, (fileobj) => {
            console.log(fileobj)
            const uploadTask = storage().ref().child(`/userProfile/${uuidv4()}`).putFile(fileobj.uri)
            uploadTask.on('state_changed',
                (snapshot) => {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    // Handle unsuccessful uploads
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        console.log('File available at', downloadURL);
                    });
                }
            );
        })
    }
    return (
        <KeyboardAvoidingView style={styles.container} behavior="position">
            <StatusBar barStyle="light-content" backgroundColor="green" />
            <View style={styles.logo_View}>
                <Text style={styles.header_text}>Welcome to whatsapp</Text>
                <Image source={require('../assests/images/WhatsApp.svg.webp')} style={styles.image} />
            </View>
            <View style={styles.textinput_view}>
                {!next ?
                    <>
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
                            onPress={() => Setnext(!(next))}>Next</Button>
                    </>
                    : null
                }
                {
                    next ?
                        <>
                            <TextInput
                                label="Name:"
                                value={name}
                                onChangeText={(text) => Setname(text)}
                                mode="outlined"
                                style={styles.input}
                            />
                            <Button mode="contained" style={styles.btn}
                                onPress={() => pickImageAndUpload()}>Select profile pic</Button>
                            <Button mode="contained" style={styles.btn}>SIGN UP</Button>
                        </> : null
                }


                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={styles.link}
                        onPress={() => Setnext(false)}>
                        <Text style={styles.link_text}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.link}
                        onPress={() => navigation.navigate('SignIn')}>
                        <Text style={styles.link_text}>Already have account?</Text>
                    </TouchableOpacity>
                </View>
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
