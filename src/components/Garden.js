import React, { memo } from "react";
import GardenItem from "./GardenItem";
//
export default memo(function Garden({
  plants,
  choosePlant,
  setPlant,
  deletePlant,
  isGetShovel,
  isGetGlove,
  coinBankVal,
  setCoinBankVal,
}) {
  //
  return (
    <div className="gd-garden">
      {plants.map((plant, index) => (
        <GardenItem
          key={index}
          plant={plant}
          choosePlant={choosePlant}
          setPlant={() => setPlant(index)}
          deletePlant={() => deletePlant(index)}
          isGetGlove={isGetGlove}
          isGetShovel={isGetShovel}
          coinBankVal={coinBankVal}
          setCoinBankVal={setCoinBankVal}
        />
      ))}
    </div>
  );
});