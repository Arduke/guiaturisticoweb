import React, { createContext, /*useContext*/ } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
//import AuthContext from './auth';

import socket from '../services/socket'

interface Message {
    ator: string;
    message: string;
    receive: string
}

interface ChatContextData {
    messages: Array<Message> | any;
    setMessages(messages: string[]): any;
    sendMessage(autor: string, room: string, message: string): any;
    display: boolean;
    setDisplay(boolean: boolean): void;
    roomId: string;
    setRoomId(string: string): void;
    join(idroom: string): any;
}

const ChatContext = createContext<ChatContextData>({} as ChatContextData);

export const ChatProvider: React.FC = ({ children }) => {
    const [messages, setMessages] = useState<string[]>([])
    const [display, setDisplay] = useState<boolean>(false)
    const [roomId, setRoomId] = useState<string>('')


    useEffect(() => {
        socket.connect()

        socket.on("receive-message", (data: string) => {
            setMessages(prevState => ([...prevState, data]))
            console.log(data)
        })

        socket.on("joined_room", (data: string[]) => {
            setMessages(data)
            console.log("joined")
        })
    }, [])

    const sendMessage = (autor: string, room: string, message: string) => {
        socket.emit("send-message", { autor, room, message });
    }

    const join = (idroom: string) => {
        socket.emit("join", { idroom })
    }

    return (
        <ChatContext.Provider value={{
            messages,
            setMessages,
            sendMessage,
            display,
            setDisplay,
            roomId,
            setRoomId,
            join,
        }}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatContext;