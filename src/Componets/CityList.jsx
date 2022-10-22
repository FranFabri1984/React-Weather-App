import React from 'react'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Alert from '@mui/material/Alert'
import convertUnits from 'convert-units'
import CityInfo from './CityInfo'
import Weather from './Weather'
import { Grid } from '@mui/material'
import { List } from '@mui/material'
import { ListItem } from '@mui/material'

const renderCityAndCountry = eventOnClick => (cityAndCountry, weather) => {

  const { city, country, countryCode } = cityAndCountry

  return (
    <ListItem button key={city} onClick={() => eventOnClick(city, countryCode, country)}>
      <Grid container justifyContent="center" alignItems="center">
      <Grid item md={9} xs={12}>
        <CityInfo city={city} country={country} />
      </Grid>
      <Grid item md={3} xs={12}>
        <Weather temperature={weather && weather.temperature}
                 state={weather && weather.state} />
      </Grid>
      </Grid>
    </ListItem>
  )
}

const CityList = ({ cities, onClick }) => {
  const [allWeather, setAllWeather] = useState({})
  const [error, setError] = useState(null)

  useEffect(() => {
    const setWeather = (city, country, countryCode) => {
      const appid = process.env.REACT_APP_API_KEY
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${appid}`
      axios.get(url)
        .then(response => {
          const { data } = response
          const temperature = Number(convertUnits(data.main.temp).from("K").to("C").toFixed(0))
          const state = data.weather[0].main.toLowerCase()
          const propName = `${city}-${country}`
          const propValue = { temperature, state }
          setAllWeather(allWeather => ({ ...allWeather, [propName]: propValue }))
        })
        .catch(error => {
          if (error.response) {
            setError("Ha ocurrido un error en el servidor del clima")
          } else if (error.request) {
            setError("Verifique la conexión a internet")
          } else {
            setError("Error al cargar los datos")
          }
        })
    }

    cities.forEach(({ city, country, countryCode }) => {
      setWeather(city, country, countryCode)
    });

  }, [cities])

  return (
      <div>
          {
            error && <Alert onClose={() => setError(null)} severity="error">{error}</Alert>
          }
      <List>
          {
            cities.map(values => renderCityAndCountry(onClick)
            (values, allWeather[`${values.city}-${values.country}`]))
          }
      </List>
      </div>
  )
}

CityList.propTypes = {
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      countryCode: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
}

export default CityList