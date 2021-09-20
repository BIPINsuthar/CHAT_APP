import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/firestore';
import 'react-native-get-random-values';

export default function SignUp({navigation}) {
  const [email, Setemail] = useState('');
  const [name, Setname] = useState('');
  const [pass, setPass] = useState('');
  const [image, Setimage] = useState('');
  const [next, Setnext] = useState(false);
  const [loading, setLoading] = useState(false);

  const userSingUp = async () => {
    setLoading(true);
    if (!email || !name || !pass || !email) {
      alert('please fill all the fields');
    }
    try {
      const result = await auth().createUserWithEmailAndPassword(email, pass);
      firebase().collection('users').doc(result.user.uid).set({
        name: name,
        email: result.user.email,
        uid: result.user.uid,
        image: image,
        status: 'online',
      });
      setLoading(false);
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };
  const pickImageAndUpload = () => {
    launchImageLibrary({quality: 0.5}, fileobj => {
      console.log(fileobj.assets[0].uri);
      const uploadTask = storage()
        .ref()
        .child(`/userProfile/${Date.now()}`)
        .putFile(fileobj.assets[0].uri);
      uploadTask.on(
        'state_changed',
        snapshot => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          if (progress == 100) {
            alert('uploaded successfully');
          }
        },
        error => {
          console.log('error while uploading image');
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log('File available at', downloadURL);
            Setimage(downloadURL);
          });
        },
      );
    });
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="position">
      <StatusBar barStyle="light-content" backgroundColor="#d3d3d3" />
      {loading ? <ActivityIndicator size="large" color="#00bcd4" /> : null}
      <View style={styles.logo_View}>
        <Text style={styles.header_text}>Welcome to Chat_App</Text>
        <Image
          source={require('../assests/images/images.jpg')}
          style={styles.image}
        />
      </View>
      <View style={styles.textinput_view}>
        {!next ? (
          <>
            <TextInput
              label="Email:"
              value={email}
              onChangeText={text => Setemail(text)}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Password:"
              value={pass}
              onChangeText={text => setPass(text)}
              secureTextEntry={true}
              mode="outlined"
              style={styles.input}
            />
            <Button
              mode="contained"
              style={styles.btn}
              onPress={() => Setnext(!next)}>
              Next
            </Button>
          </>
        ) : null}
        {next ? (
          <>
            <TextInput
              label="Name:"
              value={name}
              onChangeText={text => Setname(text)}
              mode="outlined"
              style={styles.input}
            />
            <Button
              mode="contained"
              style={styles.btn}
              onPress={() => pickImageAndUpload()}>
              Select profile pic
            </Button>

            <Button
              mode="contained"
              style={styles.btn}
              onPress={() => userSingUp()}
              disabled={image ? false : true}>
              SIGN UP
            </Button>
          </>
        ) : null}

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity style={styles.link} onPress={() => Setnext(false)}>
            <Text style={styles.link_text}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.link}
            onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.link_text}>Already have account?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
  },
  logo_View: {
    width: 250,
    height: 370,
    // backgroundColor: 'red',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginVertical: 10,
  },
  textinput_view: {
    width: '90%',
    alignSelf: 'center',
  },
  btn: {
    marginVertical: 10,
  },
  header_text: {
    fontSize: 20,
  },
  link: {
    marginVertical: 10,
  },
  link_text: {
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
});
