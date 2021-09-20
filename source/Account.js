import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
function Account({navigation, user}) {
  const [myaccount, setMyAccount] = useState([]);
  console.log('account user::', myaccount);
  useEffect(() => {
    firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(docsnap => {
        setMyAccount(docsnap.data());
      });
  }, []);
  return (
    <View style={styles.container}>
      {/* <Text>{myaccount.name}</Text> */}
      <View style={styles.box}>
        <Image source={{uri: myaccount.image}} style={styles.img} />
        <Text style={styles.text_name}>{myaccount.name}</Text>
        <Text style={styles.text_name}>{myaccount.email}</Text>
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          auth().signOut();
        }}>
        <Text style={styles.btn_text}>LOG OUT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',
    justifyContent: 'center',
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 5,
  },
  box: {
    width: 350,
    height: 350,
    backgroundColor: '#00bcd4',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text_name: {
    fontSize: 20,
    marginVertical: 5,
    fontWeight: 'bold',
    color: 'black',
  },
  btn: {
    backgroundColor: '#00bcd4',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
  },
  btn_text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Account;
