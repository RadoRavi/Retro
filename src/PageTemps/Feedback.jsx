import {Timer} from "../components/Timer"
import {Box, Grid,TextField, Typography} from '@mui/material'

import "./Feedback.css"
import { Slot } from "../components/Slot"
import { Response } from "../components/Response"

export const Feedback = ()=>{
    return (

       <Grid container>
  <Grid className="gridSlot" item xs={6} >
    <Slot text={"What went well"}>
    
    <Response></Response>

    </Slot>
    
  </Grid>
  <Grid  className="gridSlot"  item xs={6}>
    <Slot text={"What didn't went well"}>
    <Response></Response>
    </Slot>
  </Grid>
  <Grid  className="gridSlot" item xs={6}>
    <Slot text={"What can we improve"}>
    <Response></Response>
    </Slot>
  </Grid>
  <Grid  className="gridSlot" item xs={6}>
    <Slot text="What we should stop doing">
    <Response></Response>
    </Slot>
  </Grid>

  <Grid className="timerCircle"  xs={6}>
  <Box   item xs={4}>
    <Timer ></Timer>
  </Box>

  </Grid>
  
  
</Grid>
        
    )

    
}