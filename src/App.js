import React, { lazy, memo, Suspense, useEffect, useState } from "react";
import LoadAllImages from "./components/LoadAllImages";
import StartGame from "./components/StartGame";
import backgrounds from "./constants/backgrounds";
import plants from "./constants/plants";
import { isEmptyObject, objectToArray } from "./helpers/commonFunctions";
const CoinBank = lazy(() => import("./components/CoinBank"));
const Garden = lazy(() => import("./components/Garden/Garden"));
const SendBank = lazy(() => import("./components/SendBank/SendBank"));
const Tools = lazy(() => import("./components/Tools"));
//
const plantsList = objectToArray(plants);
const soundPlant = new Audio("./assets/sounds/plant.ogg");
const rdSoundtrack = Math.floor(Math.random() * 3) + 1;
const soundtrack = new Audio(`./assets/sounds/st${rdSoundtrack}.mp3`);
const costTreeFood = 50;
const costWateringCan = 10;
const costBugSpray = 50;
const costMusicPlayer = 100;
//
export default memo(function App() {
  const [coinBankVal, setCoinBankVal] = useState(250); //money
  const [plants, setPlants] = useState([...Array(45).fill({})]);
  const [choosePlant, setChoosePlant] = useState(null);
  const [tool, setTool] = useState(null);
  const [bg, setBg] = useState(backgrounds[-1]);
  const [playSoundTrack, setPlaySoundtrack] = useState(false);
  const bgStart = "./assets/images/backgrounds/bg4.png";
  const quit = "./assets/images/texts/SelectorScreen_Quit1.png";
  //
  useEffect(() => {
    // if game started
    window.scrollTo(0, 1);
    const started = localStorage.getItem("game-started");
    if (started) {
      // set background image
      setBg(backgrounds[Math.floor(Math.random() * 3)]);

      // get background from localStorage
      const bg = localStorage.getItem("game-background");
      setBg(bg);

      const coinBank = localStorage.getItem("game-coin-bank");
      setCoinBankVal(parseInt(coinBank));
    }
  }, []);

  useEffect(
    () => localStorage.setItem("game-coin-bank", coinBankVal),
    [coinBankVal]
  );

  useEffect(() => {
    const everyEmpty = plants.every((o) => isEmptyObject(o));
    if (everyEmpty && coinBankVal < 50) {
      alert("Bạn đã thua vì hết tiền :))))");
      localStorage.removeItem("game-started");
      window.location.reload();
    }
  });

  useEffect(() => {
    soundtrack.load();
    soundtrack.play();
  }, [playSoundTrack]);
  //
  const handleSetPlant = (index) => {
    // check plant exists and selected
    if (!choosePlant) {
      return;
    }
    if (!isEmptyObject(plants[index])) {
      return;
    }
    // price action
    const coinPrice = coinBankVal - choosePlant.purchasePrice;
    if (coinPrice < 0) {
      return;
    }
    setCoinBankVal(coinPrice);
    // set plants
    const newPlants = [...plants];
    newPlants[index] = choosePlant;
    setPlants(newPlants);
    setChoosePlant(null);
    // play sound plant
    soundPlant.load();
    soundPlant.play();
  };

  const handleStartGame = async () => {
    const bg = backgrounds[Math.floor(Math.random() * 3)];
    setBg(bg);
    setPlaySoundtrack(true);
    // storage started
    localStorage.setItem("game-started", true);
    localStorage.setItem("game-background", bg);
  };
  const handleQuitGame = () => {
    if (confirm("Are you sure ?")) {
      localStorage.removeItem("game-started");
      localStorage.removeItem("game-background");
      localStorage.removeItem("game-coin-bank");
      window.location.reload();
    }
  };

  const handleDeletePlant = (index) => {
    // delete plants
    const newPlants = [...plants];
    newPlants[index] = {};
    setPlants(newPlants);
  };

  const backgroundImage = bg !== undefined ? `url(${bg})` : "";
  //
  return (
    <Suspense
      fallback={
        <h1
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            color: "white",
          }}
        >
          Loading...
        </h1>
      }
    >
      <LoadAllImages plantsList={plantsList} />
      <div
        className="gd-container"
        style={{ backgroundImage: `url(${bgStart})` }}
      >
        {bg !== undefined && (
          <div className="gd-quit">
            <img src={quit} onClick={handleQuitGame} />
          </div>
        )}

        {bg === undefined && <StartGame onClick={handleStartGame} />}
        <div
          onClick={() => {
            setPlaySoundtrack(true);
          }}
          className="gd-container-game"
          style={{ backgroundImage }}
        >
          <div style={{ display: bg === undefined ? "none" : "block" }}>
            <SendBank
              coinBankVal={coinBankVal}
              plants={plantsList}
              choosePlant={choosePlant}
              setChoosePlant={(plant) => {
                setChoosePlant(plant !== choosePlant ? plant : null);
              }}
              tool={tool}
            />
            <Garden
              plants={plants}
              choosePlant={choosePlant}
              setPlant={handleSetPlant}
              deletePlant={handleDeletePlant}
              tool={tool}
              coinBankVal={coinBankVal}
              setCoinBankVal={setCoinBankVal}
              costTreeFood={costTreeFood}
              costWateringCan={costWateringCan}
              costBugSpray={costBugSpray}
              costMusicPlayer={costMusicPlayer}
            />
            <CoinBank coinBankVal={coinBankVal} />
            <Tools
              tool={tool}
              setTool={setTool}
              costTreeFood={costTreeFood}
              costWateringCan={costWateringCan}
              costBugSpray={costBugSpray}
              costMusicPlayer={costMusicPlayer}
            />
          </div>
        </div>
      </div>
    </Suspense>
  );
});
