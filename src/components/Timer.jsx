import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { useState, useEffect } from "react"
import { TimeCounter } from './TimeCounter'
import { useWebStatus } from '../App'
import { useWebSocket } from "../Socker"
import "./Timer.css"
import FlexBetween from './FlexBetween'
export const Timer = () => {
    const socket = useWebSocket();
    const [time, setTime] = useState(2)
    const [start, setStart] = useState(false)
    const [key, setKey] = useState(0)
    const [prop,setProp] = useState(false)
    const [appState, setAppState] = useWebStatus()
    const {admin} = appState
    console.log("admin",admin)
    useEffect(() => timeListerner(), [])
 
    function timeListerner(){
        socket.addEventListener("message", (data) => {
            //console.log("message",message)
            var res=null
            if(data){
                res = JSON.parse(data.data)
            }
            console.log("data",res.message)
            
            if (res.message === "run") {
                console.log("time",JSON.parse(res.data).time)
                setTime(JSON.parse(res.data).time)
                setProp(true)
                run()
            }else if(res.message==="rerun"){
                setTime(JSON.parse(res.data).time)
                setStart(true)
                setKey(key+1)
            }
        })
    }
    function revertCounter() {
        if (start) {
            setTimeout(() =>{
                setStart(false)
                setKey(key+1)
            }
                , time * 60 * 1000)
                

        }
    }
    useEffect(() => revertCounter(), [start])

    const sendRun =()=>{
        if(appState.admin){
        const req = {
            "message": "run",
            "time": time
        }
        socket.send(JSON.stringify(req))    
    }
    }

    const sendReRun =()=>{
        if(appState.admin){
        const req = {
            "message": "rerun",
            "time": time
        }
        socket.send(JSON.stringify(req))    
    }
    }

    const run=()=>{
        setStart(true)
    }

const rerun =()=>{
    if(appState.admin){
    const req = {
        "message": "run",
        "time": time
    }
    socket.send(JSON.stringify(req))
    setStart(true)
    setKey(key+1)
}
}
    return (
        <div>
            <div className="timer-div" style={{display:"flex",
        justifyContent:"center"}}>
                <CountdownCircleTimer
                    key={key}
                    isPlaying={start}
                    duration={time * 60}
                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                    colorsTime={[time * 60, time * 40, time * 20, 0]}
                    // onComplete={() => {
                    //     // do your stuff here
                    //     return { shouldRepeat: true, delay: 1.5 } // repeat animation in 1.5 seconds
                    // }}
                >
                    {({ remainingTime }) => <div>
                        {start ?
                            <p>{Math.floor(remainingTime)} SEC</p> :
                            <FlexBetween >
                                {(time > 1 && admin) && <a onClick={() => setTime(time - 1)}>-</a>}
                                <a onClick={() => sendRun()}><p>{time}</p></a>{admin&&<a onClick={() => setTime(time + 1)}>+</a>}
                                
                            </FlexBetween>
}{(!start && key !== 0) && <button onClick={()=>sendReRun()}>rerun</button>}
                    </div>}
                </CountdownCircleTimer>
            </div>
        </div>
    )
}