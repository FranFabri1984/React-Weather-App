import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@mui/material'
import { IconContext } from 'react-icons'
import IconState, { validValues } from './IconState'
import { Grid} from '@mui/material'
import { Skeleton } from '@mui/material'

const Weather = ({ temperature, state }) => {
    return (
        <Grid container item direction="row" justifyContent="center"
              alignItems="center" spacing={1}>
                <IconContext.Provider value={{ size:'4em'}}>
                {
                    state ? 
                    <IconState state={state} />
                    :
                    <Skeleton variant="circular" height={80} width={80}></Skeleton>
                }
            </IconContext.Provider>
            {
                temperature ? 
                <Typography display="inline" variant="h3">{temperature}</Typography>
                :
                <Skeleton variant="rect" height={80} width={80}></Skeleton>
            }
        </Grid>
    )
}

Weather.propTypes = {
    temperature: PropTypes.number,
    state: PropTypes.oneOf(validValues),
}

export default Weather