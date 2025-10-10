export async function addThingzCard(thingData,userId) {
  const response = await fetch(
    `http://127.0.0.1:8000/thingzCard/create?user_id=${userId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(thingData),
    }
  );
  if (!response.ok) throw new Error("Room already exist");

  return await response.json();
}
export async function getThingzCard(userId) {
  const response = await fetch(`http://127.0.0.1:8000/thingzCard/retrieve?user_id=${userId}`, {
    method: "GET",
  });
  if (!response.ok) throw new Error("no data");
  const data = await response.json()
  return data;
}

export async function getSensorList(userId) {
  const response = await fetch(
    `http://127.0.0.1:8000/sensors/list?user_id=${userId}`,
    {
      method: "GET",
    }
  );
  if (!response.ok) throw new Error("no data");
  const data = await response.json();
  return data;
}
export async function getActuatorList(userId) {
  const response = await fetch(
    `http://127.0.0.1:8000/actuators/list?user_id=${userId}`,
    {
      method: "GET",
    }
  );
  if (!response.ok) throw new Error("no data");
  const data = await response.json();
  return data;
}