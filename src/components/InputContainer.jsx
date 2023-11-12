import { useWebSocket } from "../Socker"
import { Box, Grid, InputBase, TextField, Typography,Button } from '@mui/material'
import { useEffect, useState } from "react"
import FlexBetween from "./FlexBetween"
import FlexCenter from "./FlexCenter"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import "./InputContainer.css"

export const InputContainer=({myComments,setMyComments,section,haveDefault,onEdit,setOnEdit,eventListeners})=>{
console.log("section",section,"comments",myComments)
    const socket = useWebSocket();
    const [typo, setTypo] = useState(haveDefault)
    useEffect(()=>{eventListeners&&eventListeners()},[])
    
    
    function updateTypo(e) {
        console.log("tag",e.target.tagName)
        
        if(haveDefault){
            
            
            setTypo(e.target.value)
            
        }else{
        setTypo(e.target.value)
        }
    }

    function sendData(event) {
        const id = event.currentTarget.id
        
        var data=null
        var randomKey=null
        if(onEdit){            
            const id2 =event.currentTarget.parentElement.parentElement.parentElement.parentElement.id
            console.log("id",id2,"typo",typo)
            data = {
                id,
                id2,
                
                "message":"update",
                typo
            }
        }else{
            console.log("send")
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
        <div style={{display:"flex", flexDirection:"column",width:"100%"}}>
        
        
        <div className="inputContainer">            <Box sx={{width:"80%"}}>
        {onEdit? 
   <TextField
   id="standard-multiline-flexible"
   multiline
   fullWidth
   rowsMax="4"
   value={typo}
   className="multiInput"
   onChange={updateTypo}
   margin="normal"
 />:
 <TextField
  
   id="standard-multiline-flexible"
   multiline
   fullWidth
   label={!haveDefault&&"add your reflections here"}
   rowsMax="4"
   value={typo}
   className="multiInput"
   onChange={updateTypo}
   margin="normal"
   inputProps={{ style: { fontFamily: 'nunito', color: 'white' } }}
 />}
 {/* <input className="textarea" role="textbox" type='text' id="standard-basic" label="Standard" variant="standard" onChange={updateTypo}  placeholder={!haveDefault&&"add your reflections here"} value={typo} contenteditable/>} */}
        </Box>
        <FlexCenter sx={{width:"20%"}}>
        {typo&&<a id={section} className="resSend" onClick={sendData} variant="outlined"><FontAwesomeIcon icon={faPaperPlane} style={{color: "#8cb0ee",}} /></a>}
        </FlexCenter>
        </div>
        {/* {typo&&<a id={section} onClick={sendData} variant="outlined">{onEdit?"Update":<FontAwesomeIcon icon={faPaperPlane} style={{color: "#8cb0ee",}} />}</a>} */}
       
        </div>
    )
}