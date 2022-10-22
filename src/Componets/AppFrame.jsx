import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@mui/material'
import { AppBar } from '@mui/material'
import { Toolbar } from '@mui/material'
import { IconButton } from '@mui/material'
import { Link } from '@mui/material'
import { IconContext } from 'react-icons'
import { WiDaySunny } from 'react-icons/wi'
import { Link as LinkRouter } from 'react-router-dom'
import { Typography } from '@mui/material'

const AppFrame = ({ children }) => {
    return (
        <Grid container justifyContent="center" spacing={1}>
            <AppBar position="static">
            <Toolbar variant="dense">
            <IconButton color="inherit" aria-label="menu">
            <Link component={LinkRouter} to="/main" color="inherit" aria-label="menu">
            <IconContext.Provider value={{ size: '3em' }}>
                <WiDaySunny />
            </IconContext.Provider>
            </Link>
            </IconButton>
            <Typography variant="h6" color="inherit">
                Weather App
            </Typography>
            </Toolbar>
            </AppBar>
            <Grid item xs={12} sm={11} md={10} lg={8}>
                {children}
            </Grid>
        </Grid>
    )
}

AppFrame.propTypes = {
    children: PropTypes.node
}

export default AppFrame