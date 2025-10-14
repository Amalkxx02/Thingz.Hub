export async function getRoom(userId) {
  const response = await fetch(
    `http://127.0.0.1:8000/api/user/${userId}/rooms`,
    {
      method: "GET",
    }
  );
  const res = await response.json().catch (()=>{})
  if (!response.ok){
    const error = new Error(typeof res.detail === "string" ? res.detail : "Something went wrong");
    error.status = response.status
    throw error;
  } 
  
  return res;
}

export async function addRoom(userId, roomData) {
  const response = await fetch(
    `http://127.0.0.1:8000/api/user/${userId}/rooms`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(roomData),
    }
  );
  const res = await response.json().catch (()=>{})
  if (!response.ok){
    const error = new Error(typeof res.detail === "string" ? res.detail : "Something went wrong");
    error.status = response.status
    throw error;
  } 
  
  return res;
}
