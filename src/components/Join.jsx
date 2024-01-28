import { useState, useEffect } from 'react'
import { useWebSocket } from '../Socker'
import { useWebStatus } from '../App'
import { useFeedbackStatus } from '../App'
import setJsonSkeleton from "../JsonFormatter"
import "./Join.css"
import FlexCenter from './FlexCenter'
import FlexBetween from './FlexBetween'
import {copyToClip} from './Utiles'
import { faPinterestSquare } from '@fortawesome/free-brands-svg-icons'


export const Join = () => {
    const socket = useWebSocket();
    const [appState, setAppState] = useWebStatus()
    const [feedback, setFeedback] = useFeedbackStatus()
    


    const [id, setId] = useState("")
    const [pin, setPin] = useState("")
    const [create, setCreate] = useState(false)
    const [join, setJoin] = useState(true)
    const [copy,setCopy] = useState(false)
    const [clickAdmin,setClickAdmin] = useState(false)

    useEffect(()=>{
        if((appState.admin)){
            joinGroup()
        }
    },[clickAdmin])

    useEffect(() => {
        console.log("Updated appState:", appState);
    }, [appState]);

    const createGroup = (event) => {
        socket.addEventListener('message', (data) => {
            const resData = JSON.parse(data.data)
            console.log(resData.groupId)
            setId(resData.groupId)
            setPin(resData.pin)
            setJsonSkeleton(resData.groupId)
            
        }
        )
        const req = {
            "message": "create_group"
        }
        socket.send(JSON.stringify(req))
        setCreate(true)
        setJoin(false)
    }

    const updateDataToLocal = () => {
        localStorage.setItem("feedback", JSON.stringify(feedback))
    }

    // const copyToClip = async () => {
    //     const text = `Please search for group id ${id} and use this pin "${pin}" to login`
    //     try {
    //         await navigator.clipboard.writeText(text);
    //         console.log('Content copied to clipboard');
    //         setCopy(true)
    //         setTimeout(()=>setCopy(false),2000)
    //     } catch (err) {
    //         console.error('Failed to copy: ', err);
    //     }

    // }
    const Join = () => {
        setCreate(false)
        setJoin(true)
    }

    const joinGroup = (event) => {
        var adminLocal = localStorage.getItem("adminpin")
        var adminKey = id+"-"+pin
        
        console.log("joining",appState.admin)
        setCreate(false)
        socket.addEventListener('message', (data) => {
            console.log("joinres", data)
            var joinRes = JSON.parse(data.data)
            if (joinRes.message === "connection success") {
                console.log("joined")
                setJoin(true)
                console.log("before done",appState)
                if(adminLocal===adminKey){
                    console.log("reached here")
                    setAppState({"app":"inGroup","admin":true})
                    console.log("appState",appState)
                    //setAppState({"app":"home","admin":true})
                }else{
                    setAppState({ ...appState, app: "inGroup" });
                }
                
                setFeedback(joinRes.data)
                localStorage.setItem("feedback", JSON.stringify(joinRes.data))
                console.log("after done")




            }


        }
        )
        const req = {
            "message": "join_group",
            "id": id,
            "pin": pin
        }
        socket.send(JSON.stringify(req))


    }

    const reset = (event) => {
        setJoin(false)
        setCreate(false)
    }
    

    const adminJoin = () => {
        setClickAdmin(true)
        setAppState({"app":"home","admin":true})
        
        localStorage.setItem("id",id)
        localStorage.setItem("pin",pin)
        localStorage.setItem("adminpin", id+"-"+pin)
        console.log("admin ---1 ",appState.admin) 
        
        console.log("admin ---2 ",appState.admin) 
        if(appState.admin){
        joinGroup()
        console.log("admin ---3 ",appState.admin)
        }   
                  }
    return (
        <FlexCenter  className='login-Module'>
            
            <div>
                <div>
                    {
                        <FlexCenter>
                            <a className={create ? "selected-button" : "button"} onClick={createGroup}>
                                Create
                            </a>
                            <a className={join ? "selected-button" : "button"} onClick={Join}>
                                Join
                            </a>
                        </FlexCenter>}
                </div>
                <FlexCenter sx={{ width: "auto" }}>
                    <div>
                        {create &&
                            <>

                                <p style={{ textAlign: "center", margin: "20px 40px" }}>{(pin && id)
                                    ? `This your group id:${id} and group pin: ${pin}` : 'Something went wrong, Click on create again or reload the page'}</p>
                                {(pin && id) && <>
                                    <button onClick={() => adminJoin()}>Join your group as admin</button>
                                    <button onClick={()=>copyToClip(id,pin,setCopy)}>{copy?"Copied to Clipboard":"Copy group details to clipboard"}</button>
                                </>}
                            </>}
                        {join &&
                            <>

                                <FlexBetween>
                                    <label>Group id: </label>
                                    <input onChange={e => setId(e.target.value)} value={id}></input>
                                </FlexBetween>
                                <FlexBetween>
                                    <label>Group pin: </label>
                                    <input onChange={e => setPin(e.target.value)} value={pin}></input>
                                </FlexBetween>
                                <button className="joinButton" onClick={joinGroup}>Lets Join</button>

                            </>
                        }

                    </div>
                </FlexCenter>
            </div>
           
        </FlexCenter >
    )
}

