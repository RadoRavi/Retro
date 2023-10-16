import {useState,useEffect} from 'react'
import { useWebSocket } from '../Socker'
import { useWebStatus } from '../App'
import { useFeedbackStatus } from '../App'
import setJsonSkeleton from "../JsonFormatter"

export const Join = ()=>{
    const socket = useWebSocket();
    const [appState, setAppState] = useWebStatus()
    const [feedback, setFeedback] = useFeedbackStatus()
    

    const [id,setId] = useState("")
    const [pin,setPin] = useState("")
    const [create,setCreate] = useState(false)
    const [join,setJoin] = useState(false)

    
    const createGroup=(event)=>{
        socket.addEventListener('message', (data) => {
            const resData = JSON.parse(data.data)
            console.log(resData.groupId)
            setId(resData.groupId)
            setPin(resData.pin)
            setJsonSkeleton(resData.groupId)
        }
        )
        const req = {
            "message":"create_group"
        }
        socket.send(JSON.stringify(req)) 
        setCreate(true)
    }

    const updateDataToLocal = ()=>{
        localStorage.setItem("feedback",JSON.stringify(feedback))
        }

    const copyToClip=async()=>{
       const text = `Please search for group id ${id} and use this pin "${pin}" to login`
            try {
              await navigator.clipboard.writeText(text);
              console.log('Content copied to clipboard');
            } catch (err) {
              console.error('Failed to copy: ', err);
            }
          
    }
    
    const joinGroup=(event)=>{
        socket.addEventListener('message', (data) => {
            console.log("joinres",data)
            var joinRes =JSON.parse(data.data)
            if(joinRes.message==="connection success"){
console.log("joined")
setJoin(true)
console.log("before done")
setAppState({...appState, app: "inGroup"});
setFeedback(joinRes.data)
localStorage.setItem("feedback",JSON.stringify(joinRes.data))
console.log("after done")




            }
            

        }
        )
        const req = {
            "message":"join_group",
            "id":id,
            "pin":pin
        }
        socket.send(JSON.stringify(req)) 
        

    }

    const reset =(event)=>{
        setJoin(false)
        setCreate(false)
    }
    return(
    <div>
        {(!create&&!join)&&
        <>
        <button onClick={createGroup}>
        Create a group
        </button>
        <button onClick={()=>setJoin(true)}>
        Join a group
        </button>
        </>}
        {create&&
        <>
        <p>This your group id:{id} and group pin: {pin}</p>
        <a onClick={()=>setJoin(true)}>Click here to join your group</a><b></b>        <a onClick={copyToClip}>Click here to copy group details to clipboard</a></>}
        {join&&
        <>

        <div>
        <label>Group code </label>
        <input onChange={e => setId(e.target.value)} value ={id}></input>
        </div>
        <div>
        <label>Group pin </label>
        <input  onChange={e => setPin(e.target.value)} value = {pin}></input>
        <div>
            <button onClick={joinGroup}>Join</button>
        </div>
        <div>
            <button onClick={reset}>Create a group</button>
            <p>appStatus {appState.app}</p>
        </div>
        </div>
        </>
        }
        
        
    </div>
    )
}

