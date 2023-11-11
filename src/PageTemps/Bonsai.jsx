import { Timer } from "../components/Timer"
import { Box, Grid, TextField, Typography } from '@mui/material'
import { useState } from "react"
import "./Feedback.css"
import { Slot } from "../components/Slot"
import { Response } from "../components/Response"
import FlexCenter from "../components/FlexCenter"


export const Bonsai = () => {


    return (

        <FlexCenter>
            

              
               <Box  className="gridSlot worm">
               <Response section={"didntwentwell"}></Response>
                 {/* <Slot text={"What went well"}>
                    
                    
                </Slot> */}

                </Box>
            <Box className="gridSlot plant" item xs={4}>
            <Response section={"wentwell"} ></Response>
                {/* <Slot text={"What didn't went well"}>
                    
                </Slot> */}
            </Box>
            <Box className="gridSlot water" item xs={4}>
            <Response section={"improve"}></Response>
                {/* <Slot text={"What can we improve"}>
                    
                </Slot> */}
            </Box>

            {/* <Grid className="timerCircle" xs={6}>
                <Box item xs={4}>
                    <Timer ></Timer>
                </Box>

            </Grid> */}


        </FlexCenter>

    )


}