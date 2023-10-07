import {useEffect, useState} from "react"

export const TimeCounter = ({props})=>{
const remainingTime = props[0]
const start = props[1]
const setStart = props[2]
const time = props[3]
const setTime = props[4]
function revertCounter(x){
    if(x===0){
        console.log("time",time)
        setStart(false)
        
    }
}
useEffect(()=>revertCounter(remainingTime),[remainingTime])
    return(
        <div>
            {start?
            <p>{Math.floor(remainingTime/60)} - {remainingTime%60}</p>:
            <div>
                {time>1&&<button onClick={()=>setTime(time-1)}>-</button>}
<button onClick={()=>setStart(!start)}><p>{time}</p></button><button onClick={()=>setTime(time+1)}>+</button>
                </div>}


            
        </div>
    )
}