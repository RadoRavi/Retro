import logo from './logo.svg';
import './App.css';
import { Join } from './components/Join';
import {Router,Routes,Route} from "react-dom"
import React, { createContext, useContext, useState } from 'react';
import {Feedback} from "./PageTemps/Feedback"
import {Box} from '@mui/material'
import FlexBetween from './components/FlexCenter';

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
    <Box className="app-wrapper" style={{display:"flex",height:"100%", alignItems:"center",justifyContent:"center"}}>
      <Box style={{}}></Box>
      <Box style={{backgroundColor:"blue"}}></Box>
    <Box >
      
        <statusContent.Provider value={[appState, setAppState]}>
        <feedbackContent.Provider value={[feedback, setFeedback]}>
          {appState.app==="home"&&
          <div style={{width:'50vw',height:"50vh"}}><Join></Join></div>
          }
          {appState.app==="inGroup"&&
          <Feedback></Feedback>
          }
        </feedbackContent.Provider>
        </statusContent.Provider>
      

    </Box>
    </Box>
  );
}

export default App;
