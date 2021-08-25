import React from "react";
import Routes from "./routes";
import { AuthProvider } from "./contexts/auth";
import { PoiProvider } from "./contexts/poi";
import { ChatProvider } from "./contexts/chat";
import { pwaTrackingListeners } from "./pwa/pwaEventListner";
import "./global/styles.css";

const isBrowser = typeof window !== "undefined";

if (isBrowser) {
  pwaTrackingListeners();
}

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
