 const userId = localStorage.getItem("user_id");
export async function addThingCard(thingData) {
  const response = await fetch(
    `http://127.0.0.1:8000/api/user/${userId}/thingsCard`,
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
export async function getThingsCard() {
  const response = await fetch(
    `http://127.0.0.1:8000/api/user/${userId}/thingsCard`,
    {
      method: "GET",
    }
  );
  const res = await response.json().catch(() => {});

  if (!response.ok) throw new Error("no data");

  return res;
}

export async function getThings() {
  const response = await fetch(`http://127.0.0.1:8000/api/things/${userId}`, {
    method: "GET",
  });
  const res = await response.json().catch(() => {});
  if (!response.ok) throw new Error("no data");
  return res;
}
