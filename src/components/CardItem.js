import React, { useEffect, useState, useRef } from "react";

function CardItem({ number, item, settings }) {
  const MAX_CARD_WIDTH = 220;
  const { gridAreas } = settings;

  const [isLarge, setIsLarge] = useState(false);

  const refContainer = useRef();
  useEffect(() => {
    console.log(refContainer.current.offsetWidth);
    if (refContainer.current.offsetWidth > MAX_CARD_WIDTH) {
      setIsLarge(true);
    }
  }, []);

  return (
    <div
      ref={refContainer}
      className={`rssapp-card card-${number}`}
      style={gridAreas[number]}
    >
      {/* {isLarge ? (
        <img
          alt="news-img"
          className="rssapp-card-img"
          src={
            "https://cdn.pixabay.com/photo/2019/10/06/10/03/team-4529717_960_720.jpg"
          }
        ></img>
      ) : null} */}

      <div className="rssapp-card-author">
        <a className="rssapp-card-author-link" href={item.url}>
          {item.author}
        </a>
        {isLarge ? (
          <div className="rssapp-card-info">6h ago • 3m read</div>
        ) : null}
      </div>
      <div className="rssapp-card-title-container">{item.title}</div>
      {isLarge ? (
        <div className="rssapp-card-title-description">
          <div dangerouslySetInnerHTML={{ __html: item.description }} />
        </div>
      ) : null}
    </div>
  );
}

export default CardItem;
