import React, { useEffect, useState, useRef } from "react";

function CardItem({ number, item, settings }) {
  const MAX_CARD_WIDTH = 250;

  const [isLarge, setIsLarge] = useState(false);

  const refContainer = useRef();
  useEffect(() => {
    if (refContainer.current.offsetWidth > MAX_CARD_WIDTH) {
      setIsLarge(true);
    }
    window.addEventListener("resize", () => {
      if (refContainer.current.offsetWidth > MAX_CARD_WIDTH) {
        setIsLarge(true);
      } else {
        setIsLarge(false);
      }
    });
  }, []);

  const date = new Date(item.date).getTime();
  const currentDate = new Date().getTime();
  let timeAgo = Math.floor((currentDate - date) / 360000);
  let period = "h";
  if (timeAgo > 24) {
    timeAgo = Math.floor(timeAgo / 24);
    period = "d";
  }

  const { generalSettings, titleSettings, cardSettings, gridAreas } = settings;

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
      </div>
      <div
        className="rssapp-card-title-container"
        style={{
          color: cardSettings.cardTitleColor,
          fontSize: cardSettings.cardTitleFontSize,
        }}
      >
        {item.title}
      </div>
      {isLarge ? (
        <>
          <div className="rssapp-card-description">
            <div dangerouslySetInnerHTML={{ __html: item.description }} />
          </div>
          <div className="rssapp-card-info">
            {timeAgo > 0 && `${timeAgo}${period} ago • 3m read`}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default CardItem;
