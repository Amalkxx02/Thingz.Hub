export async function getActuatorData(actuatorId) {
  const userId = localStorage.getItem("user_id")
  const response = await fetch(`http://127.0.0.1:8000/sensors/retrieve?user_id=${userId}?sensor_id=${actuatorId}`, {
    method: "GET",
  });
  if (!response.ok) throw new Error("no data");
  const data = await response.json()
  return data;
}