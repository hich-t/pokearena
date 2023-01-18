import { useState, useEffect, useContext } from "react";
import { PokeContext } from "../Context/PokeContext";

const Battle = ({ onGameEnd }) => {
  const { value4 } = useContext(PokeContext);
  const [team, setTeam] = value4;
  const [team2, setTeam2] = value6;

  console.log(team, "team from Battle");

  //// players configuration

  state = {
    playerName: "Blastoise",
    playerLevel: 45,
    playerHP: 200,
    playerMaxHP: 200,
    playerAttacks: {
      attackOne: { name: "Bite", damage: 10 },
      attackTwo: { name: "Surf", damage: 30 },
      attackThree: { name: "Water Gun", damage: 35 },
      attackFour: { name: "Hydro Pump", damage: 45 }
    },
    playerFaint: "",
    enemyName: "Gengar",
    enemyLevel: 43,
    enemyHP: 200,
    enemyMaxHP: 200,
    enemyAttackNames: ["Hex", "Shadow Ball", "Dream Eater", "Nightmare"],
    enemyAttackDamage: [10, 30, 35, 45],
    enemyFaint: "",
    textMessageOne: " ",
    textMessageTwo: "",
    gameOver: false
  };

  // const playerStats = {
  //   // from team array
  //   level: 44,
  //   maxHealth: 177,
  //   name: "Mega Man",
  //   // img: '/assets/megaman.png',

  //   magic: 32,
  //   attack: 50,
  //   defense: 30,
  //   magicDefense: 30,
  // };

  // const opponentStats = {
  //   level: 44,
  //   name: "Samus",
  //   maxHealth: 188,
  //   // img: '/assets/samus.png',

  //   magic: 50,
  //   attack: 32,
  //   defense: 20,
  //   magicDefense: 48,
  // };

  // Game configuration
  const [sequence, setSequence] = useState({});
  const [turn, setTurn] = useState(0);
  const [inSequence, setInSequence] = useState(false);

  const [playerHealth, setPlayerHealth] = useState(playerStats.maxHealth);
  const [opponentHealth, setOpponentHealth] = useState(opponentStats.maxHealth);

  const wait = (millisecondes) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, millisecondes);
    });

  const useAIOpponent = (turn) => {
    const [aiChoice, setAIChoice] = useState("");

    useEffect(() => {
      if (turn === 1) {
        const options = ["attack", "magic", "heal"];
        setAIChoice(options[Math.floor(Math.random() * options.length)]);
      }
    }, [turn]);

    return aiChoice;
  };

  const aiChoice = useAIOpponent(turn);

  const attack = ({ attacker, receiver }) => {
    const receivedDamage =
      attacker.attack - (attacker.level - receiver.level) * 1.25;
    const finalDamage = receivedDamage - receiver.defense / 2;
    return finalDamage;
  };

  useEffect(() => {
    const { mode, turn } = sequence;

    if (mode) {
      const attacker = turn === 0 ? playerStats : opponentStats;
      const receiver = turn === 0 ? opponentStats : playerStats;

      switch (mode) {
        case "attack": {
          const damage = attack({ attacker, receiver });

          (async () => {
            setInSequence(true);
            // setAnnouncerMessage(`${attacker.name} has chosen to attack!`);
            // await wait(1000);

            // turn === 0
            //   ? setPlayerAnimation('attack')
            //   : setOpponentAnimation('attack');
            // await wait(100);

            // turn === 0
            //   ? setPlayerAnimation('static')
            //   : setOpponentAnimation('static');
            // await wait(500);

            // turn === 0
            //   ? setOpponentAnimation('damage')
            //   : setPlayerAnimation('damage');
            // await wait(750);

            // turn === 0
            //   ? setOpponentAnimation('static')
            //   : setPlayerAnimation('static');
            // setAnnouncerMessage(`${receiver.name} felt that!`);

            turn === 0
              ? setOpponentHealth((h) => (h - damage > 0 ? h - damage : 0))
              : setPlayerHealth((h) => (h - damage > 0 ? h - damage : 0)); // We don't want a negative HP.
            await wait(2000);

            // setAnnouncerMessage(`Now it's ${receiver.name} turn!`);
            // await wait(1500);

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();

          break;
        }

        default:
          break;
      }
    }
  }, [sequence]);

  useEffect(() => {
    if (aiChoice && turn === 1 && !inSequence) {
      setSequence({ turn, mode: aiChoice });
    }
  }, [turn, aiChoice, inSequence]);

  useEffect(() => {
    if (playerHealth === 0 || opponentHealth === 0) {
      (async () => {
        await wait(1000);
        onGameEnd(playerHealth === 0 ? opponentStats : playerStats);
        nextMatch(team.length > 0);
      })();
    }
  }, [playerHealth, opponentHealth, onGameEnd]);

  return <h1>Battle!</h1>;
};

export default Battle;
