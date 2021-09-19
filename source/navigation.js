import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './SignUp';
import SignIn from './SignIn'
import HomeScreen from './HomeScreen';
import auth from '@react-native-firebase/auth'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Chat from './Chat'
import Splash from './Splash';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
const Stack = createNativeStackNavigator();
const MyStack = ({ route, navigation }) => {
    const [user, setUser] = useState('')
    useEffect(() => {
        auth().onAuthStateChanged(userexist => {
            if (userexist) {
                setUser(userexist)
                console.log(route)
            }

            else
                setUser('')
        })

    })
    return (
        <NavigationContainer>
            <Stack.Navigator
            >
                {user ?
                    <>
                        <Stack.Screen name="Home" options={{ headerShown: false }} >
                            {props => <Splash {...props} user={user} />}
                        </Stack.Screen>
                        <Stack.Screen
                            name="CHAT_APP"
                            options={({ route }) =>
                            ({
                                headerStyle: {
                                    backgroundColor: '#00bcd4',
                                },
                                headerTintColor: 'black',
                                headerTitleStyle: {
                                    fontWeight: 'bold',
                                },
                                headerRight: () =>
                                    // <Image source={{ uri: route.params.uri }} style={styles.img} />
                                    <MaterialIcons
                                        name="account-circle"
                                        size={35}
                                        color="black"
                                        onPress={() => auth().signOut()}
                                    />
                            })}
                        >
                            {props => <HomeScreen {...props} user={user} />}
                        </Stack.Screen>
                        <Stack.Screen
                            name="Chat"
                            options={({ route, navigation }) => ({
                                headerStyle: {
                                    backgroundColor: '#00bcd4',
                                },
                                headerTintColor: 'black',
                                headerTitleStyle: {
                                    fontWeight: 'bold',
                                },
                                title: route.params.name, headerLeft: () =>
                                    <View style={styles.header_view_left}>
                                        <MaterialIcons
                                            name="keyboard-arrow-left"
                                            size={35}
                                            color="black"
                                            onPress={() => navigation.navigate('CHAT_APP')}
                                        />
                                        <Image source={{ uri: route.params.uri }} style={styles.img} />
                                    </View>,
                                headerRight: () =>
                                    <View style={styles.header_view_right}>
                                        <MaterialIcons
                                            // name="more-vert"
                                            // name="keyboard-arrow-right"
                                            // name="language"
                                            // name="menu"
                                            // name={'keyboard-voice'}
                                            // name="video-call"
                                            name="phone"
                                            // name="face"
                                            size={25}
                                            style={styles.logo}
                                            color='black' />
                                        <MaterialIcons
                                            name="video-call"
                                            size={30}
                                            style={styles.logo}
                                            color="black"
                                        />
                                        <MaterialIcons
                                            name="more-vert"
                                            size={30}
                                            style={styles.logo}
                                            color="black"
                                        />
                                    </View>

                                // <MaterialIcons
                                //     name="account-circle"
                                //     size={35}
                                //     color="blue"
                                // />
                            })}
                        // <MaterialIcons
                        //     name="account-circle"
                        //     size={32}
                        //     style={{ marginRight: 10 }}
                        //     color="blue" />

                        >
                            {props => <Chat {...props} user={user} />}
                        </Stack.Screen>
                    </> :
                    <>
                        <Stack.Screen name="Home" options={{ headerShown: false }} >
                            {props => <Splash {...props} user={user} />}
                        </Stack.Screen>
                        <Stack.Screen
                            name="SignIn"
                            component={SignIn}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="SignUp"
                            component={SignUp}
                            options={{ headerShown: false }}

                        />

                    </>
                }

            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    img: {
        width: 30,
        height: 30,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'black',
        marginRight: 10,
        marginLeft: -5

    },
    left_arrow: {
        width: 25,
        height: 25,
    },
    header_view_right: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: -20
    },
    header_view_left: {

        marginLeft: -10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        marginHorizontal: 10
    }
})
export default MyStack