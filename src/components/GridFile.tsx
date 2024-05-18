import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

const GridFile = () => {
    return (

        <Grid container spacing={3}>
            <Grid item xs={8}>
                <Box sx={{ border: '1px solid' }}>
                    <Typography >Item1</Typography>
                </Box>
            </Grid>
            <Grid item xs={4} >
                <Box sx={{ border: '1px solid' }}>
                    <Typography >Item1</Typography>
                </Box>
            </Grid>

            <Grid item xs={4}>
                <Box sx={{ border: '1px solid' }}>
                    <Typography >Item1</Typography>
                </Box>
            </Grid>
            <Grid item xs={4}>
                <Box sx={{ border: '1px solid' }}>
                    <Typography >Item1</Typography>
                </Box>
            </Grid>
            <Grid item xs={4} >
                <Box sx={{ border: '1px solid' }}>
                    <Typography >Item1</Typography>
                </Box>
            </Grid>
            <Grid item xs={5} >
                <Box sx={{ border: '1px solid' }}>
                    <Typography >Item1</Typography>
                </Box>
            </Grid>
            <Grid item xs={7} >
                <Box sx={{ border: '1px solid' }}>
                    <Typography >Item1</Typography>
                </Box>
            </Grid>
        </Grid>

    )
}

export default GridFile