import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { useState, useEffect } from "react"
import { TimeCounter } from './TimeCounter'
import { useWebStatus } from '../App'
import { useWebSocket } from "../Socker"
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
            <div style={{display:"flex",
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
                            <p>{Math.floor(remainingTime / 60)} - {remainingTime % 60}</p> :
                            <div>
                                {(time > 1 && admin) && <button onClick={() => setTime(time - 1)}>-</button>}
                                <button onClick={() => sendRun()}><p>{time}</p></button>{admin&&<button onClick={() => setTime(time + 1)}>+</button>}
                                {key !== 0 && <button onClick={rerun}>rerun</button>}
                            </div>
}
                    </div>}
                </CountdownCircleTimer>
            </div>
        </div>
    )
}