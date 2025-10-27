import { useState, useEffect } from "react";
 const userId = localStorage.getItem("user_id");
export default function dataHandleWS() {
  const [data, setData] = useState({});

  useEffect(() => {
    const newSocket = new WebSocket(`ws://localhost:8000/ws/client/${userId}`);

    newSocket.onopen = () => console.log("WebSocket connection established.");

    newSocket.onmessage = (event) =>{
      const rowData = JSON.parse(event.data);
      
      setData(prevData=>({
        ...prevData,
        ...rowData
      }))
    };

    newSocket.onclose = () => console.log("WebSocket connection closed.");

    newSocket.onerror = (error) => console.error("WebSocket error:", error);

    return () => newSocket.close();
  }, [userId]);
  
  return data;

}
