export async function addDevice(userId,deviceData) {
  const response = await fetch(
    `http://127.0.0.1:8000/api/user/${userId}/devices`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(deviceData),
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
