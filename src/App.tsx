import React from 'react';
import Routes from './routes';
import { AuthProvider } from './contexts/auth';
import { PoiProvider } from './contexts/poi';
import { ChatProvider } from './contexts/chat';
import "./global/styles.css"


function App() {
  return (
    <AuthProvider>
      <PoiProvider>
        <ChatProvider>
          <Routes />
        </ChatProvider>
      </PoiProvider>
    </AuthProvider>
  );
}

export default App;
