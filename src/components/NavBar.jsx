import FlexBetween from "./FlexBetween"
import { Box, Grid, TextField, Typography } from '@mui/material'
import "./NavBar.css"

export const NavBar= ()=>{
    return(
        <div className="nav-bar">
    <FlexBetween>
<Box>
    <h2>RetroSpec</h2>
</Box>
<Box>
    <FlexBetween>
        <p>GroupId: </p>
        <p>GroupPin: </p>
        <a>Previous</a>
        <a>proceed buttons</a>
    </FlexBetween>
</Box>
    </FlexBetween>
    </div>
    )
}