export async function getSensorData(userId) {

  const response = await fetch(
    `http://127.0.0.1:8000/sensorData/retrieve?user_Id=${userId}`,
    {
      method: "GET",
    }
  );
  if (!response.ok) throw new Error("no data");
  const data = await response.json();
  return data;
}
