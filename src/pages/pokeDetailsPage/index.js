import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";

import apiInstance from '../../api';
import PokeDetailsCard from '../../compenents/pokeDetailsCard';
import Statsbar from '../../compenents/statsbar';
import Evolution from "../../compenents/evolution";
import HorizontalCards from "../../compenents/horizontalCards";
import Loader from '../../compenents/loader'
import SomethingWentWrongComponent from '../../compenents/somethingWentWrong';

import "../../styles/custom.css";

const Pokedetails = (props) => {

  const [pokemonData, setPokemonData] = useState({})
  const [pokemonSpeciesData, setpokemonSpeciesData] = useState({})
  const [similarPokemonsData, setSimilarPokemonsData] = useState([])
  const [pokemonDataLoading, setPokemonDataLoading] = useState(true)
  const [pokemonSpeciesDataLoading, setPokemonSpeciesDataLoading] = useState(true)
  const [similarPokemonsDataLoading, setSimilarPokemonsDataLoading] = useState(true)
  const [similarPokemonStartId, setSimilarPokemonStartId] = useState(0)

  const getPokemonData = () => {
    setPokemonDataLoading(true)
    const { match } = props
    const name = match.params.name
    document.title = `Pokewiki- ${name}`
    apiInstance.get(`/pokemon/${name}/`).then((data) => {
      setPokemonData(data.data);
      getPokemonSpeciesData(data.data.species.name);
      getSimilarPokemonsData(data.data.types[0].type.name, data.data.id);
    }).finally(() => setPokemonDataLoading(false));
  }

  const getPokemonSpeciesData = (name) => {
    setPokemonSpeciesDataLoading(true);
    apiInstance.get(`/pokemon-species/${name}/`).then((data) => setpokemonSpeciesData(data.data)).finally(() => setPokemonSpeciesDataLoading(false));
  }

  const getSimilarPokemonsData = (type, pokeId) => {
    setSimilarPokemonsDataLoading(true)
    apiInstance.get(`/type/${type}`).then((data) => {
      setSimilarPokemonsData(data.data.pokemon)
      if ((pokeId + 10) <= data.data.pokemon.length) {
        setSimilarPokemonStartId(pokeId + 1)
      } else {
        setSimilarPokemonStartId(5)
      }
    }).finally(() => setSimilarPokemonsDataLoading(false));
  }

  useEffect(() => {
    getPokemonData()
  }, [props.match.params.name])

  const LoaderComponent = () => <div><Loader /></div>
  return (
    <div className='pokedetails-container'>
      <div className="p-3 container-md">
        {
          pokemonData.name ? <div className='text-center'>
            <h1 className='text-capitalize'>{pokemonData.name}</h1>
          </div> : null
        }
        <Card className="box p-0 shadow mt-3">
          {
            (pokemonDataLoading) ? <LoaderComponent /> : pokemonData.name ? <PokeDetailsCard
              pokemonData={pokemonData} pokemonSpeciesData={pokemonSpeciesData} /> : <SomethingWentWrongComponent />
          }
        </Card>
        <Card className="box p-0 shadow mt-3">
          <CardHeader className="font-weight-bold">Stats</CardHeader>
          <CardBody>
            {
              pokemonDataLoading ? <LoaderComponent /> : pokemonData.stats ? pokemonData.stats.sort((a, b) => a.base_stat > b.base_stat ? 1 : -1).map((stat, index) => <div key={index}>
                <h4 className="small font-weight-bold">
                  {stat.stat.name}<span className="float-right">{`${stat.base_stat}`}</span>
                </h4>
                <Statsbar stat={stat} />
              </div>) : <SomethingWentWrongComponent />
            }
          </CardBody>
        </Card>
        <div className='mt-3'>
          <Card className='shadow'>
            <CardHeader className='font-weight-bold'>Evolutions</CardHeader>
            {
              pokemonSpeciesDataLoading ? <LoaderComponent /> : pokemonSpeciesData.evolution_chain ?
                <Evolution url={pokemonSpeciesData.evolution_chain.url} /> : <SomethingWentWrongComponent />
            }
          </Card>
        </div>
        {
          pokemonData.types ? <div className='mt-3'>
            <Card className='shadow'>
              <CardHeader className='font-weight-bold'>Similar Pokemons</CardHeader>
              {
                similarPokemonsDataLoading ? <LoaderComponent /> : similarPokemonsData.length ? <CardBody className='px-3 pt-0 pb-2'>
                  <HorizontalCards pokemons={similarPokemonsData.slice(similarPokemonStartId, similarPokemonStartId + 10)} pokeType={pokemonData.types[0].type.name} />
                </CardBody> : <SomethingWentWrongComponent />
              }
            </Card>
          </div> : null
        }
      </div>
    </div>
  );
};

export default Pokedetails;
