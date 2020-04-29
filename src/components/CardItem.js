import React from "react";

const standardCard = ({ number, item, settings }) => (
  <div className={`rssapp-card card-${number}`}>
    <div className="rssapp-card-author">
      <a className="rssapp-card-author-link" href={item.url}>
        {item.author}
      </a>
    </div>
    <div className="rssapp-card-title-container">{item.title}</div>
  </div>
);

const largeCard = ({ number, item, settings }) => {
  const { gridAreas } = settings;
  return (
    <div className={`rssapp-card card-${number}`} style={gridAreas[number]}>
      <img
        alt="news-img"
        className="rssapp-card-img"
        src={
          "https://cdn.pixabay.com/photo/2019/10/06/10/03/team-4529717_960_720.jpg"
        }
      ></img>
      <div className="rssapp-card-author">
        <a className="rssapp-card-author-link" href={item.url}>
          {item.author}
        </a>
        <div className="rssapp-card-info">6h ago, 3m read</div>
      </div>
      <div className="rssapp-card-title-container">{item.title}</div>
      <div className="rssapp-card-title-description">{item.description}</div>
    </div>
  );
};

function CardItem(props) {
  const { settings, number } = props;
  console.log(settings);
  return settings.largeCardNumbers.includes(number)
    ? largeCard(props)
    : standardCard(props);
}

export default CardItem;
