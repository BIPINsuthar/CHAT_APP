import React,{useEffect}from 'react'
import {View,Text, Image, ImageBackground} from 'react-native'

function Splash({navigation,user})
{
    useEffect(() => {
      setTimeout(() => {
          if(user)
             navigation.navigate('CHAT_APP')
          else 
             navigation.navigate('SignIn')
      }, 4000);
    })
    return(
         <ImageBackground style={{flex:1}} source={require('../assests/images/Splash.png')}/>
    )
}

export default Splash