import {Box, Typography} from '@mui/material'
export const Slot=({text,children})=>{
    return (
        <Box sx={{height:"90%"}}>
            <Typography sx={{textAlign:"center"}}>{text}</Typography>
        <Box sx={{
            margin:"10px",
            height:"90%",
            border: "2px solid red",
            borderRadius:"5px",
            overflow:"auto"
        }}>
    {children}
        </Box>
        </Box>
    )
}