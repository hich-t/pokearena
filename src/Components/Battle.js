import { useState, useEffect, useContext } from "react";
import { PokeContext } from "../Context/PokeContext";
import styles from '../css/styles.module.css';


const Bar = ({ value, maxValue, label }) => {
  <div className={styles.main}>
    <div className={styles.label}>{label}</div>
    <div className={styles.max}>
      <div
        className={styles.value}
        style={{ width: `${(value / maxValue) * 100}%` }}
      ></div>
    </div>
  </div>
};

const PlayerSummary = ({
  main,
  name,
  level,
  health,
  maxHealth,
  }) => {

  const red = '#821400';
  const blue = '#1953cb';

  return(
    <div
      className={styles.main}
      style={{ backgroundColor: main ? red : blue }}
    >
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.level}>Lvl {level}</div>
      </div>

      <div className={styles.health}>
        <Bar label="HP" value={health} maxValue={maxHealth} />
      </div>
    </div>
  )
}

const BattleAnnouncer = ({ message }) => {
  // const typedMessage = useTypedMessage(message);

  return (
    <div className={styles.main}>
      <div className={styles.message}>{message}</div>
    </div>
  );
};

const BattleMenu = ({ onAttack, onMagic, onHeal }) => {
  <div className={styles.main}>
    <div onClick={onAttack} className={styles.option}>
      Attack
    </div>
    <div onClick={onMagic} className={styles.option}>
      Magic
    </div>
    <div onClick={onHeal} className={styles.option}>
      Heal
    </div>
  </div>
};


const Battle = ({ onGameEnd }) => {
  const { value4 } = useContext(PokeContext);
  const [team, setTeam] = value4;

  console.log(team, "team from Battle");

  const playerStats = {
    // from team array
    level: 44,
    maxHealth: 177,
    name: "Mega Man",
    img: 'assets/megaman.png',

    magic: 32,
    attack: 50,
    defense: 30,
    magicDefense: 30,
  };

  const opponentStats = {
    level: 44,
    name: "Samus",
    maxHealth: 188,
    img: 'assets/samus.png',

    magic: 50,
    attack: 32,
    defense: 20,
    magicDefense: 48,
  };

  // Game configuration
  const [sequence, setSequence] = useState({});
  const [turn, setTurn] = useState(0);
  const [inSequence, setInSequence] = useState(false);

  const [playerHealth, setPlayerHealth] = useState(playerStats.maxHealth);
  const [opponentHealth, setOpponentHealth] = useState(opponentStats.maxHealth);
  const [announcerMessage, setAnnouncerMessage] = useState('');

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

            turn === 0
              ? setOpponentHealth((h) => (h - damage > 0 ? h - damage : 0))
              : setPlayerHealth((h) => (h - damage > 0 ? h - damage : 0)); // We don't want a negative HP.
            await wait(2000);

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
        // nextMatch(team.length > 0);
      })();
    }
  }, [playerHealth, opponentHealth, onGameEnd]);

  return (
    <>
      <div className={styles.opponent}>
        <div className={styles.summary}>
          <PlayerSummary
            main={false}
            health={opponentHealth}
            name={opponentStats.name}
            level={opponentStats.level}
            maxHealth={opponentStats.maxHealth}
          />
        </div>
      </div>

      <div className={styles.characters}>
        <div className={styles.gameHeader}>
          {playerStats.name} vs {opponentStats.name}
        </div>
        <div className={styles.gameImages}>
          <div className={styles.playerSprite}>
            <img
              alt={playerStats.name}
              src={playerStats.img}
              // className={styles[playerAnimation]}
            />
          </div>
          <div className={styles.opponentSprite}>
            <img
              alt={opponentStats.name}
              src={opponentStats.img}
              // className={styles[opponentAnimation]}
            />
          </div>
        </div>
      </div>

      <div className={styles.user}>
        <div className={styles.summary}>
          <PlayerSummary
            main={true}
            health={playerHealth}
            name={playerStats.name}
            level={playerStats.level}
            maxHealth={playerStats.maxHealth}
          />
        </div>

        <div className={styles.hud}>
          <div className={styles.hudChild}>
            <BattleAnnouncer
              message={
                announcerMessage || `What will ${playerStats.name} do?`
              }
            />
          </div>
          {!inSequence && turn === 0 && (
            <div className={styles.hudChild}>
              <BattleMenu
                onHeal={() => setSequence({ mode: 'heal', turn })}
                onMagic={() => setSequence({ mode: 'magic', turn })}
                onAttack={() => setSequence({ mode: 'attack', turn })}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Battle;
