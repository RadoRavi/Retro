import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { useState, useEffect } from "react"
import { TimeCounter } from './TimeCounter'
export const Timer = () => {
    const [time, setTime] = useState(2)
    const [start, setStart] = useState(false)
    const [key, setKey] = useState(0)
    useEffect(() => console.log("time check", time), [time])
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

const rerun =()=>{
    setStart(true)
    setKey(key+1)
    
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
                                {time > 1 && <button onClick={() => setTime(time - 1)}>-</button>}
                                <button onClick={() => setStart(true)}><p>{time}</p></button><button onClick={() => setTime(time + 1)}>+</button>
                                {key !== 0 && <button onClick={rerun}>rerun</button>}
                            </div>
}
                    </div>}
                </CountdownCircleTimer>
            </div>
        </div>
    )
}