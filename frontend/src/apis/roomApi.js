export async function getRoom(userId) {
  const response = await fetch(
    `http://127.0.0.1:8000/room/get?user_id=${userId}`,
    {
      method: "GET",
    }
  );
  if (!response.ok) throw new Error("No room exist");

  return await response.json();
}

export async function addRoom(roomData, userId) {
  const response = await fetch(
    `http://127.0.0.1:8000/room/post?user_id=${userId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(roomData),
    }
  );
  if (!response.ok) throw new Error("Room already exist");

  return await response.json();
}
