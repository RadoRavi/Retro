import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { WebSocketContext } from './Socker';
const socket = new WebSocket('wss://localhost:8000');

socket.addEventListener('open',function(event,error){
  console.log("openmm")
  if(error){
    console.log(error)
  }
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WebSocketContext.Provider value={socket}>

    <App/>
    </WebSocketContext.Provider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
