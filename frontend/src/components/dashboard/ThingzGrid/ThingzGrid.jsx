import { useEffect, useState } from "react";
import { getThingzCard } from "../../../apis/thingCardApi";
import { getSensorData } from "../../../apis/sensorApi";
import "./ThingzGrid.css";

const ThingzGrid = ({ userId }) => {
  const [cards, setCards] = useState([]);
  const [liveData, setLiveData] = useState({});

  useEffect(() => {
    const fetchAvailableThingzCard = async () => {
      try {
        const card = await getThingzCard(userId);
        setCards(card);
      } catch (error) {
        console.error("Error fetching cards list:", error);
      }
    };

    fetchAvailableThingzCard();
  }, [userId]);

  useEffect(() => {
    if (cards.length === 0) {
      return;
    }
    const intervalId = cards.map((card) => {
      const thingId = card.sensor_id;

      const pollSensor = async () => {
        try {
          const data = await getSensorData(userId);
          if (data.sensor_id === thingId) {
            setLiveData((prevData) => ({
              ...prevData,
              [thingId]: data.value
            }));
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      pollSensor();
      return setInterval(pollSensor, 1000);
    });
    return () => {
      intervalId.forEach((id) => clearInterval(id));
    };
  }, [cards, userId]);

  return (
    <div className="device-grid">
      {cards.map((card) => (
        <div key={card.sensor_id}>
          {card.config.sensorName}
          <span>{liveData[card.sensor_id]}</span>
        </div>
      ))}
    </div>
  );
};
export default ThingzGrid;
