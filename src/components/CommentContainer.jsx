import { Box, Grid, InputBase, TextField, Typography,Button } from '@mui/material'
import { useEffect, useState } from "react"


export const CommentContainer=({res,myComments,sendData})=>{

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
  {onEdit?<TextField id="standard-basic" label="Standard" variant="standard" onChange={updateTypo} defaultValue={res.text} value={typo}/>:<p >{res.text}</p>}
  {myComments.includes(res.id) && (<>
    {onEdit?<Button id={section} onClick={sendData} variant="outlined">Send</Button>:
    <div className="actions">
      <a className="edit-icon" onClick={()=>setOnEdit(true)}>Edit</a>
      <a className="delete-icon" id={section}onClick={deleteComment}>Delete</a>
    </div>}
    </>
  )}
</div>
    )
}