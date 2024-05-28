import React, { useState } from 'react'
import { ChatState } from '../Context/ChatProvider';
import { useToast } from '@chakra-ui/react';

export const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { user, setSelectedChat, chats, setChats } = ChatState();


  const toast = useToast();

  const fetchChats = async()=>{
    try{
      
      const config = {
        hea
      }

    }catch(error){
      toast({
        title: "Invalid Email or Password",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLo;
    }
  }
    return (
    <div>MyChats</div>
  )
}
