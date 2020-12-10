import React, { useEffect, useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { Link } from 'react-router-dom';
import Select from "react-select";

import apiInstance from '../../api'
import SearchBarComponent from '../Searchbar';
import './Header.css'

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pokemons, setPokemonsData] = useState([])
  const [pokemonType, setPokemonType] = useState([]);

  const toggle = () => setIsOpen(!isOpen);

  const getPokemonsData = () => {
    apiInstance.get('/pokemon?limit=1200')
      .then((res) => setPokemonsData(res.data.results))
  }

  const handlePokemonTypeClick = (pokeType) => {
    props.history.push(`/pokewiki/type/${pokeType.value}`)
  }

  useEffect(() => {
    const currentPath = props.history.location.pathname
    if (currentPath.split('/').length > 2) {
      if (currentPath.split('/')[2] === 'type') {
        console.log('set pokemon type value- ', currentPath.split('/')[3])
        const selectedType = currentPath.split('/')[3]
        const selectedPokemonType = [{ label: selectedType, value: selectedType }]
        setPokemonType(selectedPokemonType)
      }
    } else {
      setPokemonType([])
    }
    getPokemonsData()
  }, [props.history.location.pathname])

  const pokemonTypes = [{ label: 'normal', value: 'normal' },
  { label: 'fighting', value: 'fighting' },
  { label: 'flying', value: 'flying' },
  { label: 'poison', value: 'poison' },
  { label: 'ground', value: 'ground' },
  { label: 'rock', value: 'rock' },
  { label: 'bug', value: 'bug' },
  { label: 'ghost', value: 'ghost' },
  { label: 'steel', value: 'steel' },
  { label: 'fire', value: 'fire' },
  { label: 'water', value: 'water' },
  { label: 'grass', value: 'grass' },
  { label: 'electric', value: 'electric' },
  { label: 'psychic', value: 'psychic' },
  { label: 'ice', value: 'ice' },
  { label: 'dragon', value: 'dragon' },
  { label: 'dark', value: 'dark' },
  { label: 'fairy', value: 'fairy' },
  ]

  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand tag={Link} to='/'>
        <div>
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/underground/iron-ball.png"
            alt="..."
            className="rounded-circle"
          />
        </div>
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <div className="d-flex justify-content-between w-100">
          <div>
            <Nav navbar>
              <NavItem>
                <NavLink tag={Link} to="/">PokeWiki</NavLink>
              </NavItem>
              <div className='ml-3 poketype-select-container'>
                <Select isSearchable={true} placeholder='Select Pokemon Type'
                  options={pokemonTypes}
                  onChange={handlePokemonTypeClick}
                  value={pokemonType}
                />
              </div>
            </Nav>
          </div>
          <div>
            <SearchBarComponent pokemons={pokemons} history={props.history} />
          </div>
        </div>
      </Collapse>
    </Navbar>
  );
};

export default Header;
