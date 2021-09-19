import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, Message } from 'react-native-gifted-chat'
import firestore from "@react-native-firebase/firestore";
 function Chat({navigation,user,route}) {
  const [messages, setMessages] = useState([]);
  const uid=route.params.uid;
  const getAllMessages= async ()=>
  {
    const docID=uid>user.uid?user.uid+"-"+uid:uid+"-"+user.uid;
    const query=await firestore().collection('ChatRooms')
    .doc(docID)
    .collection('messages')
    .orderBy('createdAt','desc')
    .get()
    const allmsg=query.docs.map(querysnap=>
     {
       return{
       ...querysnap.data(),
       createdAt:querysnap.data().createdAt.toDate()
       }
     }
     )
   setMessages(allmsg)
  }
  useEffect(() => {
   getAllMessages()
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
    .add({...mymsg,createdAt:firestore.FieldValue.serverTimestamp()})

  }, [])
 
  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: user.uid,
      }}
    />
  )
}
export default Chat