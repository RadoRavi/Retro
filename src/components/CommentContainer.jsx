import { Box, Grid, InputBase, TextField, Typography,Button } from '@mui/material'
import { useEffect, useState } from "react"
import { useWebSocket } from "../Socker"
import "./Response.css"
import { InputContainer } from './InputContainer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan,faThumbsUp, faThumbsDown,faArrowAltCircleDown,faArrowAltCircleUp } from '@fortawesome/free-regular-svg-icons';
import { faFileEdit } from '@fortawesome/free-solid-svg-icons'
import { useWebStatus } from '../App'
import FlexCenter from './FlexCenter'

export const CommentContainer=({res,myComments, setMyComments,sendData,section,eventListeners,likedComment,setLikedComment})=>{
   const socket = useWebSocket();
   const [appState, setAppState] = useWebStatus()
   const id = res.id
   
   const vote =(event)=>{
        const id = event.currentTarget.parentElement.parentElement.id
        const section = event.currentTarget.id
       
        const data = {
            id,
            section,
            "message":"vote"
        }
        setLikedComment([likedComment].push(id))
        socket.send(JSON.stringify(data))
   }
    function deleteComment(event){
    
        const randomKeu = event.currentTarget.parentElement.parentElement.id
        const id = event.currentTarget.id
       console.log(randomKeu,id)
        const data = {
            id,
            randomKeu,
            
            "message":"delete"
    
        }
        socket.send(JSON.stringify(data))
    }

const [onEdit,setOnEdit] = useState(false)
    return (
        <div  style={{    display: 'flex',
            alignItems: "center",
            margin: "10px",
            backgroundColor: 'white',
            borderRadius: "10px",
            fontWeight: '600'}} id={res.id} className="comment">
  {onEdit?<InputContainer myComments={myComments} 
                          setMyComments={setMyComments} 
                          section={section} 
                          haveDefault={res.text}
                          onEdit={onEdit}
                          setOnEdit={setOnEdit}
                          eventListeners={eventListeners} />:<p >{res.text}</p>}
  {myComments.includes(res.id)||(appState.admin==true) && (<>
    {!onEdit&&
    <div className="actions">
        {(appState.app==="inGroup")&&<>
      <a className="edit-icon" onClick={()=>setOnEdit(true)}><FontAwesomeIcon icon={faFileEdit} style={{color: "#8cb0ee",}} /></a>
      <button id={section}onClick={deleteComment} className="delete-icon" ><FontAwesomeIcon icon={faTrashCan} style={{color: "#8cb0ee",}} /></button>
      </>
      }
    </div>
}
    </>
  )}
  {appState.app==="voting"&&<FlexCenter>
  
  <a  id={section}
          className={`up`}
          onClick={vote}
          style={{ textAlign: "left", color: `${false ? "green" : "gray"}` }}
        >
          <FontAwesomeIcon icon={faArrowAltCircleUp} />
        </a>
        <p>{res.vote}</p>
        <a  id={section}
          className={`down`}
          onClick={vote}
          style={{ paddingRight:"10px",textAlign: "left", color: `${false ? "red" : "gray"}` }}
        >
          <FontAwesomeIcon icon={faArrowAltCircleDown} />
        </a>
      </FlexCenter>}

</div>
    )
}