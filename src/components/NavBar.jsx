import FlexBetween from "./FlexBetween"
import { Box, Grid, TextField, Typography } from '@mui/material'
import { useWebStatus } from '../App'
import "./NavBar.css"
import { faCopy } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {copyToClip} from './Utiles'

import { useWebSocket } from '../Socker'

export const NavBar= ()=>{
    const socket = useWebSocket()
    const [appState, setAppState] = useWebStatus()
    const id = JSON.parse(localStorage.getItem("feedback")).groupId
    const pin = JSON.parse(localStorage.getItem("feedback")).pin
  const proceed=()=>{
    console.log("fgfgfgf")
    socket.addEventListener('message', (data) => {
        const resData = JSON.parse(data.data)
        if(resData.message==="voting"){
            console.log("votinggggg")
            setAppState({...appState, app:"voting"})
        }
        
    }
    )
    const req = {
        "message": "voting"
    }
    socket.send(JSON.stringify(req))
   
  }
    return(
        <div className="nav-bar">
    <FlexBetween>
<Box>
    <h2>RetroSpec</h2>
</Box>
<Box>
    <FlexBetween>
        <p>GroupId:{id} </p>
        <p>GroupPin:{pin}</p>
        <a onClick={()=>{copyToClip(id,pin)}}><FontAwesomeIcon icon={faCopy} style={{color: "#8cb0ee",}} /></a>
        {appState.admin&&
        <>
        <a>Previous</a>
        <a id="proceed" onClick={proceed}>Proceed</a>
        </>
        }
    </FlexBetween>
</Box>
    </FlexBetween>
    </div>
    )
}