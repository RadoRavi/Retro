import { useWebSocket } from "../Socker"
import { Box, Grid, InputBase, TextField, Typography,Button } from '@mui/material'
import { useEffect, useState } from "react"

export const InputContainer=({myComments,setMyComments,section})=>{
console.log("section",section,"comments",myComments)
    const socket = useWebSocket();
    const [onEdit,setOnEdit] = useState(false)
    
    function updateTypo(e) {
        setTypo(e.target.value)
    }

    function sendData(event) {
        const id = event.target.id
        const randomKey = Math.floor(Math.random()*10000)+10000
        const data = {
            id,
            "message":"hi",
            randomKey,
            typo
        }
        const updatedComments = [...myComments, randomKey];
        setMyComments(updatedComments)
        socket.send(JSON.stringify(data))
        setTypo("")
        setOnEdit(false)
    
    }

    const [typo, setTypo] = useState("")
    return(
        <>
        <TextField id="standard-basic" label="Standard" variant="standard" onChange={updateTypo} value={typo}/>
        <Button id={section} onClick={sendData} variant="outlined">Send</Button>
        </>
    )
}