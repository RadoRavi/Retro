import React, { createContext, useContext } from 'react';

// Create a WebSocket context
export const WebSocketContext = createContext();

export function useWebSocket() {
  return useContext(WebSocketContext);
}



