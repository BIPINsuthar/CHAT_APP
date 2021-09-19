import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, Bubble,InputToolbar } from 'react-native-gifted-chat'
import firestore from "@react-native-firebase/firestore";
import {Text,View} from 'react-native'
 function Chat({navigation,user,route}) {
  const [messages, setMessages] = useState([]);
  const uid=route.params.uid;

  useEffect(() => {
    const docID=uid>user.uid?user.uid+"-"+uid:uid+"-"+user.uid;
    const query= firestore().collection('ChatRooms')
    .doc(docID)
    .collection('messages')
    .orderBy('createdAt','desc')
    
    query.onSnapshot((querysnap)=>{
      const allmsg=querysnap.docs.map(docsn=>
        {
          const data=docsn.data();
          if(data.createdAt)
          {
            return{
              ...docsn.data(),
              createdAt:docsn.data().createdAt.toDate(),
              }
          }
          else
          {
            return{
              ...docsn.data(),
              createdAt:new Date()
              }
          }
        
        })
      setMessages(allmsg)
    })
  }, [])
 
  const onSend = useCallback((messagesarray) => {
        console.log(messages)
      const msg=messagesarray[0];
      const mymsg={
        ...msg,
        sendBy:user.uid,
        sentTo:uid,
        createdAt:new Date()
      }
    setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg))
    const docID=uid>user.uid?user.uid+"-"+uid:uid+"-"+user.uid;

    firestore().collection('ChatRooms')
    .doc(docID)
    .collection('messages')
    .add({...mymsg,createdAt:new Date()})

  }, [])
 
  return (
    <View style={{flex:1,backgroundColor:'#d3d3d3'}}>
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      //onInputTextChanged={text => this.setCustomText(text)}
      alwaysShowSend={true}
      showUserAvatar={true}
      user={{
        _id: user.uid,
      }}
      renderBubble={(props)=>{
        return <Bubble {...props}
        wrapperStyle={{
          left:
          {
            backgroundColor:'white'
          },
          right:{
            backgroundColor:'#00bcd4'
          }
        }}/>
      }}
      renderInputToolbar={(props)=>{
        return <InputToolbar textInputStyle={{color:'black'}} {...props} containerStyle={{borderRadius:15}}/>
      }}
    />
 </View> )
}
export default Chat