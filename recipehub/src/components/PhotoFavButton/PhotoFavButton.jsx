import React, { useState } from "react";

import FavIcon from "../FavIcon/favIcon";

function PhotoFavButton() {
  const [likeFlag, setLikeFlag] = useState(true);
  const likeHandler = () => {
    setLikeFlag(!likeFlag);
  };

  return (
    <div className="photo-list__fav-icon">
      <div className="photo-list__fav-icon-svg" onClick={likeHandler}>
        <FavIcon selected={likeFlag} />
      </div>
    </div>
  );
}

export default PhotoFavButton;
