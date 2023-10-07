import logo from './logo.svg';
import './App.css';
import { Join } from './components/Join';
import {Router,Routes,Route} from "react-dom"
import React, { createContext, useContext, useState } from 'react';
import {Feedback} from "./PageTemps/Feedback"
const statusContent = createContext()
export function useWebStatus() {
  return useContext(statusContent);
}

const App=()=>{
  const [appState, setAppState] = useState({"app":"home","admin":false})
 
  return (
    
    <div className="App">
      <header className="App-header">
        <statusContent.Provider value={[appState, setAppState]}>
          {appState.app==="home"&&
          <Join></Join>
          }
          {appState.app==="inGroup"&&
          <Feedback></Feedback>
          }
        
        </statusContent.Provider>
      </header>

    </div>
  );
}

export default App;
