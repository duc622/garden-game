import React, { memo } from "react";

const image = "./assets/images/tools/glove.png";

export default memo(function Glove(props) {
  const { isGetGlove, setIsGetGlove } = props;

  const handleGetGlove = () => {
    setIsGetGlove(!isGetGlove);
    isGetGlove
      ? (document.body.style.cursor = `auto`)
      : (document.body.style.cursor = `url(${image}) 40 40, auto`);
  };

  return (
    <div className="gd-bank" onClick={() => handleGetGlove()}>
      <div
        className={isGetGlove ? "" : "gd-bank-image"}
        style={{ backgroundImage: `url(${image})` }}
      ></div>
    </div>
  );
});
