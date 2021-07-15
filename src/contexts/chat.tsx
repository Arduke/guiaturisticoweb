import React, { createContext } from 'react';
import { useState } from 'react';

interface Message {
    ator: String;
    message: String;
    receive: String
}

interface ChatContextData {

}

const ChatContext = createContext<ChatContextData>({} as ChatContextData);

export const ChatProvider: React.FC = ({ children }) => {
    const [messages, setMessages] = useState<Array<Message>>()

    return (
        <ChatContext.Provider value={{
            messages
        }}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatProvider;