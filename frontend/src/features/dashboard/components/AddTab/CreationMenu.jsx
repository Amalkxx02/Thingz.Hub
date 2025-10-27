import { MdOutlineMeetingRoom } from "react-icons/md";
import { FaLaptopHouse } from "react-icons/fa";
import { BsBoxes } from "react-icons/bs";
import { MdClose } from "react-icons/md";

import { useNavigate } from "react-router-dom";

import AddRoom from "./AddRoom/AddRoom";
import AddDevice from "./AddDevice/AddDevice";
import AddThingCard from "./AddUserThingCard/AddThingCard";

import { useState } from "react";

const CreationMenu = () => {
  const [tab, setTab] = useState("");
  const navigate = useNavigate();

  const iconStyle = `flex w-full gap-2 border-l-6 p-2 justify-between items-center bg-neutral-200`;
  return (
    <div className="flex size-full items-center justify-center">
      <div className="bg flex h-2/3 w-1/2 shadow">
        <div className="flex flex-col items-end justify-center gap-8 bg-neutral-100 pl-8">
          <div
            className={`${iconStyle} ${tab === "Room" ? "bg-white" : ""}`}
            onClick={() => setTab("Room")}
          >
            <div className="">
              <MdOutlineMeetingRoom />
            </div>
            <span className="">Room</span>
          </div>

          <div
            className={`${iconStyle} ${tab === "Device" ? "bg-white" : ""}`}
            onClick={() => setTab("Device")}
          >
            <div className="">
              <FaLaptopHouse />
            </div>
            <span className="">Device</span>
          </div>

          <div
            className={`${iconStyle} ${tab === "ThingCard" ? "bg-white" : ""}`}
            onClick={() => setTab("ThingCard")}
          >
            <div className="">
              <BsBoxes />
            </div>
            <span className="">Thing</span>
          </div>
          <div
            className={`${iconStyle} ${tab === "Room" ? "bg-white" : ""}`}
            onClick={() => navigate("/dashboard")}
          >
            <div className="">
              <MdClose />
            </div>
            <span className="">Close</span>
          </div>
        </div>
        <div className="flex w-full items-center justify-center overflow-auto p-4">
          {
            tab === "Room" &&
              "Room option currently unavailable will add soon" /*<AddRoom setTab={setTab} />*/
          }
          {tab === "Device" && <AddDevice />}
          {tab === "ThingCard" && <AddThingCard />}
        </div>
      </div>
    </div>
  );
};

export default CreationMenu;
