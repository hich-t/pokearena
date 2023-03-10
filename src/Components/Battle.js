import AI from "./ai.json";
import { PokeContext } from "../Context/PokeContext";
import { useContext, useState } from "react";

const Battle = () => {
  const { value5 } = useContext(PokeContext);
  const [playerTeam, setPlayerTeam] = value5;

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

console.log(playerTeam)



  function getRandomInt2(max) {
    return Math.random() * (0.5 - 1.2);
  }
  
  const [battleTeam, setBattleTeam] = useState([
    {
      pokemon1: {
        pokemonImg: `${playerTeam[0].sprites.versions["generation-v"]["black-white"].animated.back_default}`,
        pokemonName: `${playerTeam[0].name}`,
        pokemonLevel: 100,
        pokemonHP: 300,
        pokemonType: `${playerTeam[0].types[0].type.name}`,
        pokemonAttacks: {
          attackOne: {
            name: `${playerTeam[0].moves[getRandomInt(playerTeam[0].moves.length)]}`,
            damage: `${playerTeam[0].stats[3].stat}`,
            type: "",
          },
          attackTwo: {
            name: `${playerTeam[0].moves[getRandomInt(playerTeam[0].moves.length)]}`,
            damage: `${playerTeam[0].stats[3].stat}`,
            type: "",
          },
          attackThree: {
            name: `${playerTeam[0].moves[getRandomInt(playerTeam[0].moves.length)]}`,
            damage: `${playerTeam[0].stats[3].stat}`,
            type: "",
          },
          attackFour: {
            name: `${playerTeam[0].moves[getRandomInt(playerTeam[0].moves.length)]}`,
            damage: `${playerTeam[0].stats[3].stat}`,
            type: "",
          },
        },
      },

      pokemon2: {
        pokemonImg: `${playerTeam[1].sprites.versions["generation-v"]["black-white"].animated.back_default}`,
        pokemonName: `${playerTeam[1].name}`,
        pokemonLevel: 100,
        pokemonHP: 300,
        pokemonType: "",
        pokemonAttacks: {
          attackOne: {
            name: "",
            damage: 30,
            type: "",
          },
          attackTwo: {
            name: "",
            damage: 40,
            type: "",
          },
          attackThree: {
            name: "",
            damage: 55,
            type: "rock",
          },
          attackFour: {
            name: "",
            damage: 50,
            type: "",
          },
        },
      },
      pokemon3: {
        pokemonImg: `${playerTeam[2].sprites.versions["generation-v"]["black-white"].animated.back_default}`,
        pokemonName: `${playerTeam[2].name}`,
        pokemonLevel: 100,
        pokemonHP: 300,
        pokemonType: "",
        pokemonAttacks: {
          attackOne: {
            name: "",
            damage: 30,
            type: "",
          },
          attackTwo: {
            name: "",
            damage: 40,
            type: "",
          },
          attackThree: {
            name: "",
            damage: 55,
            type: "rock",
          },
          attackFour: {
            name: "",
            damage: 50,
            type: "",
          },
        },
      },
      pokemon4: {
        pokemonImg: `${playerTeam[3].sprites.versions["generation-v"]["black-white"].animated.back_default}`,
        pokemonName: `${playerTeam[3].name}`,
        pokemonLevel: 100,
        pokemonHP: 300,
        pokemonType: "",
        pokemonAttacks: {
          attackOne: {
            name: "",
            damage: 30,
            type: "",
          },
          attackTwo: {
            name: "",
            damage: 40,
            type: "",
          },
          attackThree: {
            name: "",
            damage: 55,
            type: "rock",
          },
          attackFour: {
            name: "",
            damage: 50,
            type: "",
          },
        },
      },
    },
  ]);



console.log(playerTeam)

  
  return <>

  <div> 

pokemon IMG url =   < img src={battleTeam.pokemon1.pokemomImg} style={width:"100px"} alt="" /> 
pokemon name = {battleTeam.pokemon1.pokemomName}
pokemon HP = {battleTeam.pokemon1.pokemomHP}
pokemon ATK1 = {battleTeam.pokemon1.pokemonAttacks.attackOne}
pokemon ATK2 = {battleTeam.pokemon1.pokemonAttacks.attackTwo}
pokemon ATK3 = {battleTeam.pokemon1.pokemonAttacks.attackThree}
pokemon ATK4 = {battleTeam.pokemon1.pokemonAttacks.attackFour}
    

pokemon 2 IMG url =   < img src={battleTeam.pokemon2.pokemomImg} style={width:"100px"} alt="" /> 
pokemon2 name = {battleTeam.pokemon2.pokemomName}


  </div>
  
  
  
  </>;
};

export default Battle;
