import React, { createContext, useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import AuthContext from './auth';
import io from 'socket.io-client'

interface Message {
    ator: string;
    message: string;
    receive: string
}

interface ChatContextData {
    messages: Array<Message> | any;
    sendMessage(): any;
    receiveMessage(): any;
}

const ChatContext = createContext<ChatContextData>({} as ChatContextData);

export const ChatProvider: React.FC = ({ children }) => {
    const [messages, setMessages] = useState<Array<Message>>()
    const [alert, setAlert] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const { user } = useContext(AuthContext);


    let socket = io("http://localhost:7777/", { transports: ['websocket'] }) 


    const sendMessage = () => {

    }

    const receiveMessage = () => {

    }

    return (
        <ChatContext.Provider value={{
            messages,
            sendMessage,
            receiveMessage
        }}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatProvider;