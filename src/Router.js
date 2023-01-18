import { PokeController } from "./Context/PokeContext";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import App from "./App"
import IntroBattle from "./Components/IntroBattle"
import TeamSelect from "./Components/TeamSelect"
import Battle from "./Components/Battle";

const Router = () => {

  const [winner, setWinner] = useState(undefined);

  return (
    <>
      <PokeController>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/select" element={<TeamSelect />} />
          <Route path="/intro" element={<IntroBattle />}/>
          <Route path="/battle" element={<Battle
              onGameEnd={winner => {
                setWinner(winner);
              }}
            />}
          />
        </Routes>
      </PokeController>
    </>
  );
};

export default Router;
