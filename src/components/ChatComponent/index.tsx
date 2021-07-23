import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ChatContext from '../../contexts/chat';

const ChatComponent: React.FC = () => {
  const [message, setMessage] = useState<string>('')
  const { sendMessage, messages, setMessages, join } = useContext(ChatContext);

  const { idUser, idAgency } = useParams<any>()

  useEffect(() => {
    join(`${idUser}${idAgency}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idUser, idAgency])

  const handleClick = () => {
    sendMessage("gustavinho", `${idUser}${idAgency}` , message)
    setMessages([...messages, message])
  }

  return (
    <div>
      <ul>
        {messages.map((message: string, i: number) => {
          return <li key={i}>{message}</li>
        })}
      </ul>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={handleClick}>Enviar</button>
    </div>
  );
}

export default ChatComponent;