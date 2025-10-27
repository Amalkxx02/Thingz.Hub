import { useState } from "react";
import Header from "../features/dashboard/components/layout/Header/Header.jsx";
import Sidebar from "../features/dashboard/components/layout/Sidebar/Sidebar.jsx";
import ThingGrid from "../features/dashboard/components/layout/ThingGrid/ThingGrid.jsx";

const Dashboard = () => {

  return (
    <div className="flex size-full flex-col">
        <Header />
      <div className="flex size-full border-t-2">
        <Sidebar />
        <div className="size-full border-l-2 p-2 overflow-y-auto"><ThingGrid/></div>
      </div>
    </div>
  );
};

export default Dashboard;
