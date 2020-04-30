import React, { useEffect, useState, useRef } from "react";
import Style from "style-it";
import styles from "./styles.css";
import CardItem from "./components/CardItem";
import customSettings from "./settings";

function Grid() {
  const ITEMS_COUNT = 15;
  const MAX_CLIENT_WIDTH = 600;

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [gridType, setGridType] = useState("thirdType");
  const [isSmallContainer, setIsSmallContainer] = useState(false);

  const refContainer = useRef();

  useEffect(() => {
    console.log(refContainer.current.clientWidth);

    if (refContainer.current.clientWidth < MAX_CLIENT_WIDTH) {
      setIsSmallContainer(true);
    }
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
        gridTemplateColumns: "repeat(4, 1rf)",
        gridGap: "20px",
      },
      gridAreas: isSmallContainer
        ? {}
        : {
            "1": { gridArea: "1 / 1 / 4 / 4" },
          },
    },
    secondType: {
      containerStyles: {
        gridTemplateColumns: "repeat(5, 1rf)",
        gridTemplateRows: `repeat(${items.length / 5}, 1rf)`,
        gridGap: "20px",
      },
      gridAreas: isSmallContainer
        ? {}
        : {
            "1": { gridArea: "1 / 1 / 3 / 3" },
            "2": { gridArea: "1 / 3 / 3 / 6" },
          },
    },
    thirdType: {
      containerStyles: {
        gridTemplateColumns: "repeat(4, 200px)",
        gridGap: "20px",
      },
      gridAreas: isSmallContainer
        ? {}
        : {
            "1": { gridArea: "2 / 1 / 5 / 3" },
          },
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
      <div
        ref={refContainer}
        className="rssapp-container"
        style={settings.containerStyles}
      >
        {cards}
      </div>
    </Style>
  );
}

export default Grid;
