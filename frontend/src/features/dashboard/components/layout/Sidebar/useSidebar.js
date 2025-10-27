import useFetch from "../../../../../shared/hooks/useFetch";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function useSidebar() {
  //const { data: fetchRooms } = useFetch(getRoom);

  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate()
  const addMenu = () =>{
    navigate("/addMenu")
  }

  return {
    addMenu
  };
}
