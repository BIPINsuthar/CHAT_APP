import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    color: 'white',
  },
});

export default Account;
