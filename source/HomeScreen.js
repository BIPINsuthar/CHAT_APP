import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import firebase from '@react-native-firebase/firestore';
import {FAB} from 'react-native-paper';
function HomeScreen({navigation, user}) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    userDetail();
  });
  const userDetail = async () => {
    const query = await firebase().collection('users').get();
    const Alluser = query.docs.map(docSnap => docSnap.data());
    setUsers(Alluser);
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#00bcd4" />
      <FlatList
        data={users}
        renderItem={({item}) =>
          user.uid == item.uid ? null : (
            <TouchableOpacity
              style={styles.box}
              onPress={() =>
                navigation.navigate('Chat', {
                  name: item.name,
                  uri: item.image,
                  uid: item.uid,
                  status:
                    typeof item.status == 'string'
                      ? item.status
                      : item.status.toDate().toString(),
                })
              }>
              <Image source={{uri: item.image}} style={styles.img} />
              <View style={{marginHorizontal: 10}}>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.text}>{item.email}</Text>
              </View>
            </TouchableOpacity>
          )
        }
      />
      <FAB
        style={styles.fab}
        icon="face-profile"
        color="black"
        onPress={() => navigation.navigate('Account')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',
  },
  box: {
    backgroundColor: 'black',
    borderBottomWidth: 2,
    borderBottomColor: '#00bcd4',
    flexDirection: 'row',
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    padding: 10,
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
  },
  text: {
    color: 'white',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
  },
});
export default HomeScreen;
