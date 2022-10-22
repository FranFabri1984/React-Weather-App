import React from 'react'
import { useNavigate } from 'react-router-dom'
import CityList from '../Componets/CityList'
import AppFrame from '../Componets/AppFrame'
import { Paper } from '@mui/material'

const cities = [
  { city: "Buenos Aires", country: "Argentina", countryCode: "AR"},
  { city: "Rio de janeiro ", country: "Brasil", countryCode: "BR"},
  { city: "Malaga", country: "España", countryCode: "ES"},
  { city: "New York", country: "Usa", countryCode: "US"},
]

const MainPage = () => {
  
  const navigate = useNavigate()
  
  const onClickHandler = (city, countryCode, country) => {
    navigate(`/city/${countryCode}/${city}/${country}`)
  }

  return (
        <AppFrame>
          <Paper elevation={3}>
            <CityList cities={cities} onClick={onClickHandler}></CityList>
          </Paper>
        </AppFrame>
  )
}

export default MainPage