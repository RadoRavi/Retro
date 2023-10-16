import logo from './logo.svg';
//import './App.css';
import { Join } from './components/Join';
import {Router,Routes,Route} from "react-dom"
import React, { createContext, useContext, useState } from 'react';
import {Feedback} from "./PageTemps/Feedback"
const statusContent = createContext()
const feedbackContent = createContext()
export function useWebStatus() {
  return useContext(statusContent);
}
export function useFeedbackStatus() {
  return useContext(feedbackContent);
}

const App=()=>{
  const [appState, setAppState] = useState({"app":"home","admin":false})
  const [feedback, setFeedback] = useState(null)
 
  return (
    
    <div className="App">
      <header className="App-header">
        <statusContent.Provider value={[appState, setAppState]}>
        <feedbackContent.Provider value={[feedback, setFeedback]}>
          {appState.app==="home"&&
          <Join></Join>
          }
          {appState.app==="inGroup"&&
          <Feedback></Feedback>
          }
        </feedbackContent.Provider>
        </statusContent.Provider>
      </header>

    </div>
  );
}

export default App;
