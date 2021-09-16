import * as React from 'react';
import SignUp from './SignUp';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MyStack