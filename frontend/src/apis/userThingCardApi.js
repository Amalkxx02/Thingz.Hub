export async function addUserThingCard(thingData, userId) {
  const response = await fetch(
    `http://127.0.0.1:8000/api/user/${userId}/userThingzCards`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(thingData),
    }
  );

  const res = await response.json().catch(() => {});

  if (!response.ok) throw new Error("Room already exist");

  return res;
}
export async function getUserThingCard(userId) {
  const response = await fetch(
    `http://127.0.0.1:8000/api/user/${userId}/userThingzCards`,
    {
      method: "GET",
    }
  );
  const res = await response.json().catch(() => {});

  if (!response.ok) throw new Error("no data");

  return res;
}

export async function getThingz(userId) {
  const response = await fetch(`http://127.0.0.1:8000/api/thingz/${userId}`, {
    method: "GET",
  });
  const res = await response.json().catch(() => {});
  if (!response.ok) throw new Error("no data");
  return res;
}
