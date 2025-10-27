import { useState, useEffect } from "react";
export default function useFetch(api) {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const data = await api();
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchApiData()
  }, []);
  return {
    data
  };
}
