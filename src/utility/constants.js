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
{ label: 'fairy', value: 'fairy' }
]

const colorByPokeType = {
  'normal': 'primary',
  'fairy': 'light',
  'fighting': 'dark',
  'flying': 'light',
  'poison': 'light',
  'ground': 'light',
  'rock': 'dark',
  'bug': 'success',
  'ghost': 'dark',
  'steel': 'dark',
  'fire': 'warning',
  'water': 'info',
  'grass': 'success',
  'electric': 'dark',
  'psychic': 'dark',
  'ice': 'primary',
  'dragon': 'danger',
  'dark': 'dark'
}

const textColorByPokeType = {
  'normal': 'white',
  'fairy': 'danger',
  'fighting': 'white',
  'flying': 'danger',
  'poison': 'danger',
  'ground': 'danger',
  'rock': 'white',
  'bug': 'white',
  'ghost': 'white',
  'steel': 'white',
  'fire': '',
  'water': 'white',
  'grass': 'white',
  'electric': 'white',
  'psychic': 'white',
  'ice': 'white',
  'dragon': 'white',
  'dark': 'white'
}

export { pokemonTypes, textColorByPokeType, colorByPokeType }