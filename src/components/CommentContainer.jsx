import { Box, Grid, InputBase, TextField, Typography,Button } from '@mui/material'
import { useEffect, useState } from "react"
import { useWebSocket } from "../Socker"
import "./Response.css"
import { InputContainer } from './InputContainer'


export const CommentContainer=({res,myComments, setMyComments,sendData,section,eventListeners})=>{
   const socket = useWebSocket();

    function deleteComment(event){
        const randomKeu = event.target.parentElement.parentElement.id
        const id = event.target.id
       
        const data = {
            id,
            randomKeu,
            "message":"delete"
    
        }
        socket.send(JSON.stringify(data))
    }

const [onEdit,setOnEdit] = useState(false)
    return (
        <div id={res.id} className="comment">
  {onEdit?<InputContainer myComments={myComments} 
                          setMyComments={setMyComments} 
                          section={section} 
                          haveDefault={res.text}
                          onEdit={onEdit}
                          setOnEdit={setOnEdit}
                          eventListeners={eventListeners} />:<p >{res.text}</p>}
  {myComments.includes(res.id) && (<>
    {!onEdit&&
    <div className="actions">
      <a className="edit-icon" onClick={()=>setOnEdit(true)}>Edit</a>
      <a className="delete-icon" id={section}onClick={deleteComment}>Delete</a>
    </div>
}
    </>
  )}
</div>
    )
}