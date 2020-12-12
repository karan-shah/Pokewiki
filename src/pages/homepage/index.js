import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardHeader } from 'reactstrap'

import { colorByPokeType, textColorByPokeType } from '../../utils/constants'
import Banner from '../../compenents/banner'
import HorizontalCards from '../../compenents/horizontalCards'
import Loader from '../../compenents/loader'
import SomethingWentWrongComponent from '../../compenents/somethingWentWrong'

import apiInstance from '../../api'

function HomePage(props) {

  const [waterPokemons, setWaterPokemonsData] = useState([])
  const [firePokemons, setFirePokemonsData] = useState([])
  const [flyingPokemons, setFlyingPokemonsData] = useState([])
  const [grassPokemons, setGrassPokemonsData] = useState([])
  const [electricPokemons, setElectricPokemonsData] = useState([])
  const [dragonPokemons, setDragonPokemonsData] = useState([])
  const [waterPokemonLoading, setWaterPokemonLoading] = useState(true)
  const [firePokemonLoading, setFirePokemonLoading] = useState(true)
  const [flyingPokemonLoading, setFlyingPokemonLoading] = useState(true)
  const [grassPokemonsLoading, setGrassPokemonsDataLoading] = useState(true)
  const [electricPokemonsLoading, setElectricPokemonsDataLoading] = useState(true)
  const [dragonPokemonsLoading, setDragonPokemonsDataLoading] = useState(true)

  const getWaterPokemonsData = () => {
    setWaterPokemonLoading(true)
    apiInstance.get('/type/water')
      .then((res) => {
        setWaterPokemonsData(res.data.pokemon)
      }).finally(() => setWaterPokemonLoading(false))
  }
  const getFlyingPokemonsData = () => {
    setFlyingPokemonLoading(true)
    apiInstance.get('/type/flying')
      .then((res) => {
        setFlyingPokemonsData(res.data.pokemon)
      }).finally(() => setFlyingPokemonLoading(false))
  }
  const getFirePokemonsData = () => {
    setFirePokemonLoading(true)
    apiInstance.get('/type/fire')
      .then((res) => {
        setFirePokemonsData(res.data.pokemon)
      }).finally(() => setFirePokemonLoading(false))
  }
  const getGrassPokemonsData = () => {
    setGrassPokemonsDataLoading(true)
    apiInstance.get('/type/grass')
      .then((res) => {
        setGrassPokemonsData(res.data.pokemon)
      }).finally(() => setGrassPokemonsDataLoading(false))
  }
  const getElectricPokemonsData = () => {
    setElectricPokemonsDataLoading(true)
    apiInstance.get('/type/electric')
      .then((res) => {
        setElectricPokemonsData(res.data.pokemon)
      }).finally(() => setElectricPokemonsDataLoading(false))
  }
  const getDragonPokemonsData = () => {
    setDragonPokemonsDataLoading(true)
    apiInstance.get('/type/dragon')
      .then((res) => {
        setDragonPokemonsData(res.data.pokemon)
      }).finally(() => setDragonPokemonsDataLoading(false))
  }

  useEffect(() => {
    document.title = 'Pokewiki- Home'
    getWaterPokemonsData()
    getFirePokemonsData()
    getFlyingPokemonsData()
    getGrassPokemonsData()
    getElectricPokemonsData()
    getDragonPokemonsData()
  }, [])

  const LoaderComponent = () => <div><Loader /></div>

  const RenderPokemonsByType = ({ type, pokemons, loading, index }) => <Card className={`shadow ${index > 0 ? 'mt-3' : ''}`}>
    <CardHeader className='d-flex flex-row justify-content-between'>
      <h4 className='text-capitalize mb-0'>{type} Pokemons</h4>
      <Button color={colorByPokeType[type]} tag={Link} to={`/pokewiki/type/${type}`} className={`${textColorByPokeType[type] ? `text-${textColorByPokeType[type]}` : null}`}>View More</Button>
    </CardHeader>
    {
      loading ? <LoaderComponent /> : pokemons.length ? <CardBody className='px-3 pt-0 pb-2'>
        <HorizontalCards pokemons={pokemons.slice(0, 10)} pokeType={type} />
      </CardBody> : <SomethingWentWrongComponent />
    }
  </Card>

  return <div>
    <Banner />
    <div className='p-3'>
      <RenderPokemonsByType type='flying' pokemons={flyingPokemons} loading={flyingPokemonLoading} index={0} />
      <RenderPokemonsByType type='water' pokemons={waterPokemons} loading={waterPokemonLoading} index={1} />
      <RenderPokemonsByType type='fire' pokemons={firePokemons} loading={firePokemonLoading} index={2} />
      <RenderPokemonsByType type='grass' pokemons={grassPokemons} loading={grassPokemonsLoading} index={3} />
      <RenderPokemonsByType type='electric' pokemons={electricPokemons} loading={electricPokemonsLoading} index={4} />
      <RenderPokemonsByType type='dragon' pokemons={dragonPokemons} loading={dragonPokemonsLoading} index={5} />
    </div>
  </div>
}

export default HomePage