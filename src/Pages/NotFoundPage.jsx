import React from 'react'
import { Grid } from '@mui/material'
import { Link } from '@mui/material'
import { IconContext } from 'react-icons'
import { TbAlertOctagon } from 'react-icons/tb'
import { Link as RouterLink } from 'react-router-dom'
import { Typography } from '@mui/material'

const NotFoundPage = () => {
  return (
        <Grid container justifyContent="center" direction="column" className="full">
          <div className="highlight">
            <Grid item container xs={12} justifyContent="center" alignItems="center">
              <Grid item>
                <IconContext.Provider value={{ size: "6em" }}>
                  <TbAlertOctagon/>
                </IconContext.Provider>
              </Grid>
              <Grid item container direction="column" justifyContent="center" alignItems="center">
                <Typography variant="h4" color="inherit">
                  Page Not Found
                </Typography>
                <Link color="inherit" aria-label="menu" component={RouterLink} to="/main">
                  Back To Home
                </Link>
              </Grid>
            </Grid>
          </div>
        </Grid>
    )
  }

  export default NotFoundPage