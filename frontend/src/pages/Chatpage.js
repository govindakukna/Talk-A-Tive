import React, { useEffect, useState } from "react";
import axios from "axios";

const Chatpage = () => {

    const [chats , setChats] = useState([]);

  const fetchChats = async () => {

      const {data} = await axios.get("http://localhost:5000/api/chat"); // Change the URL to match your backend server
     
      setChats(data);
    
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div>
        {
            chats.map((chat)=>(
               <div key = {chat._id}>{chat.chatName}</div> 
            ))
        }
    </div>
  )
};

export default Chatpage;
