import { Box, Grid, InputBase, TextField, Typography,Button } from '@mui/material'
import { useEffect, useState } from "react"
import { useWebSocket } from "../Socker"
import { useFeedbackStatus,  } from "../App"
import "./Response.css"
import { InputContainer } from './InputContainer';
import { CommentContainer } from './CommentContainer';




export const Response = ({ section }) => {
    const [feedback, setFeedback] = useFeedbackStatus()
    const [likedComment, setLikedComment] = useState([])
    const [list,setList] = useState([])
    const [responses, setResponses] = useState()
    const [typo, setTypo] = useState("")
    const [result, setResult] = useState("")
    const [onEdit,setOnEdit] = useState(false)
    const [myComments,setMyComments] = useState(JSON.parse(localStorage.getItem(`myComments${section}`))?JSON.parse(localStorage.getItem(`myComments${section}`)):[])
    useEffect(() => getResponses(), [])
    useEffect(()=>localStorage.setItem(`myComments${section}`,JSON.stringify(myComments),[myComments]))
   
    const [sectionResponses, setSectionResponses] = useState([])
    const socket = useWebSocket();
    
    window.addEventListener("load", (event) => {
        setMyComments(JSON.parse(localStorage.getItem(`myComments${section}`)))
    });

    const eventListeners=()=> {
        socket.addEventListener("message", (data) => {
            console.log("dddddddddddddddddddd")
            console.log("data.message", JSON.parse(data.data).message)
            var res = JSON.parse(data.data)
            if (res.message === "hi") {
                var feed = JSON.parse(res.data)
                console.log("broadcast ------", feed[0])
                setFeedback((feed[0]))
                

                console.log("update",feedback)
                
                localStorage.setItem("feedback",JSON.stringify(feed[0]))

            } else {
                

                // const resList = []
                // res.forEach(data => {

                //     if (data.type === section) {
                //         resList.push(data)
                //     }



                // })
                // console.log("res", resList)
                // setResponses(resList)
            }
        })
    }
    function getResponses() {
        socket.addEventListener("message", (data) => {
            console.log("data.message", JSON.parse(data.data).message)
            var res = JSON.parse(data.data)
            if (res.message === "hi") {
                var feed = JSON.parse(res.data)
                console.log("broadcast", feed[0])
                console.log("+++++++++++++",res.data)
                setFeedback(feed[0])
                setFeedback(feed[0])
                localStorage.setItem("feedback",JSON.stringify(feed[0]))

            } else {

            }
        }
    )
    const req = {
        "message": "getResponse",
        "section": section
    }
    socket.send(JSON.stringify(req))
    
}
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
const propsObject ={
    myComments, setMyComments, section, 
    onEdit,
    setOnEdit
}

return (
    <Box className="box-container">

    <Box className="response-container">
        {feedback[section] && feedback[section].map(res => {
            return (
                
                <CommentContainer  res={res} myComments={myComments} setMyComments={setMyComments} sendData={sendData} section={section} eventListeners={eventListeners} likedComment={likedComment} setLikedComment={setLikedComment}></CommentContainer>
                
                
//                 <div id={res.id} className="comment">
//   {onEdit?<TextField id="standard-basic" label="Standard" variant="standard" onChange={updateTypo} defaultValue={res.text} value={typo}/>:<p >{res.text}</p>}
//   {myComments.includes(res.id) && (<>
//     {onEdit?<Button id={section} onClick={sendData} variant="outlined">Send</Button>:
//     <div className="actions">
//       <a className="edit-icon" onClick={()=>setOnEdit(true)}>Edit</a>
//       <a className="delete-icon" id={section}onClick={deleteComment}>Delete</a>
//     </div>}
//     </>
//   )}
// </div>

                // <div style={{display:"flex"}}>
                // <p id={res.id}>{res.text}</p>
                // {myComments.includes(res.id)?<><a>  edit  </a><a>  delete  </a></>:""}
                // </div>
            )
        }
        )}
       
       
    </Box>
    
    <Box  className="input-foot">
    < InputContainer {...propsObject}></InputContainer>
    </Box>
    </Box>
)
}