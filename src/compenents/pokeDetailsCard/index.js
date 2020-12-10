import React from 'react'
import { Row, Col, Badge } from "reactstrap"
import { Link } from "react-router-dom"

const PokeDetailsCard = (props) => {
  const { pokemonData, pokemonSpeciesData } = props

  const IMAGE_URL = process.env.REACT_APP_IMAGE_URL
  const colorBasedOnType = { water: 'info', fire: 'warning', bug: 'success', flying: 'dark', poison: 'primary', normal: 'secondary' }
  const getFlavorText = () => {
    if (pokemonSpeciesData.flavor_text_entries.length > 0) {
      const filteredTexts = pokemonSpeciesData.flavor_text_entries.filter((entry) => entry.language.name === 'en')
      if (filteredTexts.length > 0) {
        return filteredTexts[0].flavor_text
      } else {
        return ''
      }
    } else {
      return ''
    }
  }
  return <Row className='justify-content-center ml-0 mr-0'>
    <Col md={6} sm={12} className='text-center'>
      <img src={IMAGE_URL + pokemonData.id + ".png"} />
    </Col>
    <Col md={6} sm={12}>
      <div className='mt-3'>
        <p>
          <span>{pokemonSpeciesData.flavor_text_entries ? getFlavorText() : null}</span>
        </p>
      </div>
      <div className="mt-3">
        {
          pokemonData.types && pokemonData.types.length && <p>
            <b>Type: </b>
            {
              pokemonData.types && pokemonData.types.map((type, index) => <Link key={index} to={`/pokewiki/type/${type.type.name}`} className='custom-link'>
                <Badge
                  color='info' className={`px-2 py-1 text-uppercase text-white ${colorBasedOnType[type.type.name] ? `bg-${colorBasedOnType[type.type.name]}` : 'bg-info'} ${(index + 1) !== pokemonData.types.length && 'mr-2'}`}>{type.type.name}
                </Badge>
              </Link>)
            }
          </p>
        }
        {
          pokemonSpeciesData.color && <p>
            <b>Color: </b> <span className='text-capitalize'>{pokemonSpeciesData.color.name}</span>
          </p>
        }
        {
          pokemonData.height && <p>
            <b>Height: </b> {pokemonData.height / 10} m
    </p>
        }
        {
          pokemonData.weight && <p>
            <b>Weight: </b> {pokemonData.weight / 10} kg
    </p>
        }
        {
          pokemonData.abilities && <p>
            <b>Abilities:</b> <span> {pokemonData.abilities.map((ability) => (ability.ability.name)).join(', ')}</span>
          </p>
        }
      </div>
    </Col>
  </Row>
}

export default PokeDetailsCard