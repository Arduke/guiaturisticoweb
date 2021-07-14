import React from 'react';
import Routes from './routes';
import { AuthProvider } from './contexts/auth';
import { PoiProvider } from './contexts/poi';
import "./global/styles.css"

function App() {
  return (
    <AuthProvider>
      <PoiProvider>
        <Routes />
      </PoiProvider>
    </AuthProvider>
  );
}

export default App;
