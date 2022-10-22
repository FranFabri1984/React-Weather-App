import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@mui/material'
import ForecastItem from './ForecastItem'

const renderForecastItem = forecast => {

    const { weekDay, hour, state, temperature } = forecast

    return (
        <Grid
            data-testid="forecast-item-container"
            item key={`${weekDay}${hour}`}>
            <ForecastItem
                weekDay={weekDay}
                hour={hour}
                state={state}
                temperature={temperature}
            ></ForecastItem>
        </Grid>
    )
}

const Forecast = ({ forecastItemList }) => {
    return (
        <Grid container justifyContent="space-around" alignItems="center">
            {
                forecastItemList.map(forecast => renderForecastItem(forecast))
            }
        </Grid>
    )
}

Forecast.propTypes = {
    forecastItemList: PropTypes.array.isRequired,
}

export default Forecast