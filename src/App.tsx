import React from 'react';
import Routes from './routes';
import { AuthProvider } from './contexts/auth';
import "./global/styles.css"

function App() {
 return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
