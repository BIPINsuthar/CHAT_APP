import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './SignUp';
import SignIn from './SignIn'
const Stack = createNativeStackNavigator();
const MyStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name="Home"
                    component={SignUp}
                />
                <Stack.Screen
                    name="SignIn"
                    component={SignIn}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MyStack