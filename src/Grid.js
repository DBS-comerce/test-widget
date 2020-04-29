import React, { useEffect, useState } from "react";
import Style from "style-it";
import styles from "./styles.css";
import CardItem from "./components/CardItem";
import customSettings from "./settings";

function Grid() {
  const ITEMS_COUNT = 7;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [gridType, setGridType] = useState("firstType");

  useEffect(() => {
    fetch("https://rss.app/feeds/_fc23s6Ew1ptRupYY.json")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          const filteredItems = result.items.filter(
            (item, index) => index < ITEMS_COUNT
          );
          setItems(filteredItems);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const presets = {
    firstType: {
      containerStyles: {
        gridTemplateColumns: "repeat(5, 200px)",
        gridTemplateRows: "repeat(3, 200px)",
        gridGap: "20px",
      },
      gridAreas: {
        "1": { gridArea: "1 / 1 / 4 / 4" },
      },
      largeCardNumbers: [1],
    },
    secondType: {
      containerStyles: {
        gridTemplateColumns: "repeat(5, 0.5fr)",
        gridTemplateRows: "repeat(3, 1fr)",
        gridGap: "20px",
      },
      gridAreas: {
        "1": { gridArea: "1 / 1 / 3 / 3" },
        "2": { gridArea: "1 / 3 / 3 / 6" },
      },
      largeCardNumbers: [1, 2, 3, 4, 5, 6, 7],
    },
  };

  const settings = {
    ...customSettings,
    ...presets[gridType],
  };
  const cards = items.map((item, index) => (
    <CardItem
      key={item.url}
      settings={settings}
      item={item}
      number={(index += 1)}
    />
  ));

  return (
    <Style>
      {styles.toString()}
      <div className="rssapp-container" style={settings.containerStyles}>
        {cards}
      </div>
    </Style>
  );
}

export default Grid;
