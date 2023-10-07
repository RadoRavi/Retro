import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import {useState} from "react"
import { TimeCounter } from './TimeCounter'
export const Timer = ()=>{
    const [time,setTime] = useState(2)
    const [start,setStart] = useState(false)

    return(
        <div>
            <div>
            <CountdownCircleTimer
    isPlaying={start}
    duration={time*60}
    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
    colorsTime={[time*60, time*40, time*20, 0]}
  >
    {({ remainingTime }) => <TimeCounter props={[remainingTime,start,setStart,time,setTime]}/>}
  </CountdownCircleTimer>
            </div>
        </div>
    )
}