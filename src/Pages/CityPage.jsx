import React from 'react'
import AppFrame from '../Componets/AppFrame'
import { Grid } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import convertUnits from 'convert-units'
import CityInfo from '../Componets/CityInfo'
import Weather from '../Componets/Weather'
import WeatherDetails from '../Componets/WeatherDetails'
import ForecastChart from '../Componets/ForecastChart'
import Forecast from '../Componets/Forecast'
import { LinearProgress } from '@mui/material'

const CityPage = () => {
  const [data, setData] = useState(null)
  const [foreList, setForecastItemList] = useState(null)
  const { city, countryCode, country } = useParams()
  const [temp, setTemp] = useState(0)
  const [state, setState] = useState(null)
  const [hum, setHum] = useState(0)
  const [wind, setWind] = useState(0)

  useEffect(() => {
    const getForecast = async () => {
      const appid = process.env.REACT_APP_API_KEY
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&appid=${appid}`
      const url2 = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${appid}`
      try {
        const { data } = await axios.get(url)
        const { data: data2 } = await axios.get(url2);
        const toCelsius = (temp) => Number(convertUnits(temp).from('K').to('C').toFixed(0))
        console.log(data)
        setTemp(toCelsius(data2.main.temp))
        setState(data2.weather[0].main.toLowerCase())
        setHum(data2.main.humidity)
        setWind(data2.wind.speed)
        const daysAhead = [0, 1, 2, 3, 4, 5]
        const days = daysAhead.map(d => moment().add(d, 'd'))

        const dataAux = days.map(day => {
          const tempObjArray = data.list.filter(item => {
          const dayOfYear = moment.unix(item.dt).dayOfYear()
            return dayOfYear === day.dayOfYear()
          })
          
          // Min - Max
        const temps = tempObjArray.map(item => item.main.temp)
          return ({
            dayHour: day.format('ddd'),
            min: toCelsius(Math.min(...temps)),
            max: toCelsius(Math.max(...temps))
          })
        })
        setData(dataAux)

        const interval = [0,6,8,16,24]
        const forecastItemListAux = data.list
          .filter((item, index) => interval.includes(index))
          .map(item => {
            return ({
              weekDay: moment.unix(item.dt).format('dddd'),
              hour: moment.unix(item.dt).hour(),
              state: item.weather[0].main.toLowerCase(),
              temperature: toCelsius(item.main.temp)
            })
          })
        setForecastItemList(forecastItemListAux)

      } catch (error) {
        console.log(error)
      }
    }
    getForecast()
  }, [city, countryCode])

  return (
    <AppFrame>
      <Grid container justifyContent="space-around" direction="column" spacing={2}>
        <Grid item container justifyContent="center" alignItems="flex-end" xs={12}>
          <CityInfo city={city} country={country}></CityInfo>
        </Grid>
        <Grid container justifyContent="center" item xs={12}>
          <Weather state={state} temperature={temp}></Weather>
          {
            hum && wind &&
            <WeatherDetails humidity={hum} wind={wind}></WeatherDetails>
          }

        </Grid>
        <Grid item>
          {
            !data && !foreList && <LinearProgress />
          }
        </Grid>
        <Grid item>
          {
            data && <ForecastChart data={data}></ForecastChart>
          }
        </Grid>
        <Grid item>
          {
            foreList && <Forecast forecastItemList={foreList}></Forecast>
          }
        </Grid>
      </Grid>
    </AppFrame>
  )
}

export default CityPage