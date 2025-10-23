import { useEffect, useState } from "react";
import { getUserThingCard } from "../../../apis/userThingCardApi.js";
import dataHandleWS from "../../../apis/websocket.js";
import "./ThingCardGrid.css";

const ThingCardGrid = ({ userId }) => {
  const [userThingCards, setUserThingCards] = useState([]);
  const data = dataHandleWS(userId);


  useEffect(() => {
    const fetchThingCard = async () => {
      try {
        const thingCard = await getUserThingCard(userId);
        setUserThingCards(thingCard);
      } catch (error) {
        console.error("Error fetching thing card:", error);
      }
    };
    fetchThingCard();
  }, [userId]);

  return (
    <div className="thing-card-grid grid">
      {userThingCards && userThingCards.map((thing) => (
        <div
          key={thing.thing_id}
          className={`flex flex-col p-5 bg-[#e2c8ea] rounded-3xl ${
            thing.config.enableGraph ? "col-span-2 row-span-2" : ""
          } `}
        >
          <div className="pb-3">{thing.config.selectedSensorName}</div>
          <div className="flex">
            <div className="text-3xl">{ data[thing.thing_id]||"00"}</div>
            <div className="flex pl-2 items-end ">
              {thing.config.selectedUnit}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ThingCardGrid;
