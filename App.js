import React from 'react'
import MyStack from './source/navigation' 
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'green',
  },
};

function App()
{
  return (
    <PaperProvider theme={theme}>
       <MyStack/>
    </PaperProvider>
  );
}

export default App