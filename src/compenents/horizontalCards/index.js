import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "reactstrap";

import { colorByPokeType, textColorByPokeType } from '../../utility/constants'
import "./style.css";

const HorizontalCards = (props) => {
  const { pokemons, pokeType } = props;
  const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;
  return <div className="cardsContainer py-3">
    {
      pokemons.map((pokemonData, index) => {
        const { url } = pokemonData.pokemon;
        const id = url.split("/")[url.split("/").length - 2]
        const name = pokemonData.pokemon.name
        return (
          <div key={index} className="pokemonCard">
            <Card className={`box ${colorByPokeType[pokeType]}
                 ${textColorByPokeType[pokeType] ? `text-${textColorByPokeType[pokeType]}` : null}`}>
              <Link to={`/pokewiki/${name}`} className='custom-link'>
                <div>
                  <img src={IMAGE_URL + id + ".png"} className="w-100" />
                </div>
                <h5 className='mt-3 mb-0 text-center'>{name}</h5>
              </Link>
            </Card>
          </div>
        );
      })}
  </div>
};

export default HorizontalCards;
