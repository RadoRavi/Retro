import { Box, Grid, InputBase, TextField, Typography,Button } from '@mui/material'
import { useEffect, useState } from "react"
import { useWebSocket } from "../Socker"
import "./Response.css"
import { InputContainer } from './InputContainer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faFileEdit } from '@fortawesome/free-solid-svg-icons'


export const CommentContainer=({res,myComments, setMyComments,sendData,section,eventListeners})=>{
   const socket = useWebSocket();

    function deleteComment(event){
    
        const randomKeu = event.target.parentElement.parentElement.id
        const id = event.target.id
       //18001116
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
      <a className="edit-icon" onClick={()=>setOnEdit(true)}><FontAwesomeIcon icon={faFileEdit} style={{color: "#8cb0ee",}} /></a>
      <button id={section}onClick={deleteComment} className="delete-icon" ><FontAwesomeIcon icon={faTrashCan} style={{color: "#8cb0ee",}} /></button>
   
    </div>
}
    </>
  )}
</div>
    )
}