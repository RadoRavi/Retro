import { useWebSocket } from "../Socker"
import { Box, Grid, InputBase, TextField, Typography,Button } from '@mui/material'
import { useEffect, useState } from "react"
import "./InputContainer.css"

export const InputContainer=({myComments,setMyComments,section,haveDefault,onEdit,setOnEdit,eventListeners})=>{
console.log("section",section,"comments",myComments)
    const socket = useWebSocket();
    const [typo, setTypo] = useState(haveDefault)
    useEffect(()=>{eventListeners&&eventListeners()},[])
    console.log("haveDefault",haveDefault)
    
    function updateTypo(e) {
        
        if(haveDefault){
            
            
            setTypo(e.target.value)
            
        }else{
        setTypo(e.target.value)
        }
    }

    function sendData(event) {
        const id = event.target.id
        
        var data=null
        var randomKey=null
        if(onEdit){
            const id2 = event.target.parentElement.id
            
            data = {
                id,
                id2,
                "message":"update",
                typo
            }
        }else{
            randomKey = Math.floor(Math.random()*10000)+10000
            data = {
                id,
                "message":"hi",
                randomKey,
                typo
            }
            const updatedComments = [...myComments, randomKey];
        setMyComments(updatedComments)
        }
         
         
        
        socket.send(JSON.stringify(data))
        setTypo("")
        setOnEdit(false)
    
    }

    
    return(
        <>
        <p><input className="textarea" role="textbox" type='text' id="standard-basic" label="Standard" variant="standard" onChange={updateTypo}  placeholder={!haveDefault&&"add your reflections here"} value={typo} contenteditable/></p>
        {typo&&<a id={section} onClick={sendData} variant="outlined">{onEdit?"Update":"Send"}</a>}
        </>
    )
}