import {useState} from 'react'
import { useWebSocket } from '../Socker'

export const Join = ()=>{
    const socket = useWebSocket();

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

        }
        )
        socket.send("create_group") 
        setCreate(true)
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
        setJoin(true)
    }
    return(
    <div>
        {(!create&&!join)&&
        <>
        <button onClick={createGroup}>
        Create a group
        </button>
        <button onClick={joinGroup}>
        Join a group
        </button>
        </>}
        {create&&
        <>
        <p>This your group id:{id} and group pin: {pin}</p>
        <a>Click here to join your group</a><b></b>        <a onClick={copyToClip}>Click here to copy group details to clipboard</a></>}
        {join&&
        <>

        <div>
        <label>Group code</label>
        <input></input>
        </div>
        <div>
        <label>Group pin</label>
        <input></input>
        </div></>}
        
        
    </div>
    )
}

