export async function getSensorData() {
  const response = await fetch("http://127.0.0.1:8000/sensorData/get", {
    method: "GET",
  });
  if (!response.ok) throw new Error("no data");
  const data = await response.json()
  return data;
}