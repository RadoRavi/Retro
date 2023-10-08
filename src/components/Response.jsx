import {Box, Grid,InputBase,TextField, Typography} from '@mui/material'
import {useEffect} from "react"
import {useWebSocket} from "../Socker"

export const Response = ({section})=>{
    const socket = useWebSocket();
function getResponses(){
     socket.addEventListener("message", (data)=>{
        const resData = JSON.parse(data.data)
        console.log("response",resData)
     })
     const req = {
        "message":"getResponse"
     }
     socket.send(JSON.stringify(req)) 
}
    return(
        <Box>
            <InputBase sx id="standard-basic" label="add your reflection" variant="standard"/>
            <button onClick={getResponses}>click</button>
        </Box>
        
    )
}