import React from 'react'
import {render} from '@testing-library/react'
import CityInfo from './CityInfo'

test('CityInfo Render', async () => {
    const city = 'Cordoba'
    const country = 'Argentina'
    // funcion para encontrar heading o cabeceras como titulos h1, h2, etc.
    const {findAllByRole} = render (<CityInfo city={city} country={country}/>)
    // resultado en un array de componentes
    const ListComponent  = await findAllByRole('heading')
    // validacion del resultado que se espera del test
    expect(ListComponent[0]).toHaveTextContent(city)
    expect(ListComponent[1]).toHaveTextContent(country)
})