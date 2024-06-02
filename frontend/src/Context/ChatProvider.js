import { createContext, useContext, useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom/cjs/react-router-dom";
import Homepage from "../pages/Homepage";
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    console.log(userInfo);
    console.log("data in context provider");
    setUser(userInfo);

    if (!userInfo) {
      //  history.push("/");
      window.location.href = "/";
    }
  }, [history]);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        notification,
        setNotification,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
