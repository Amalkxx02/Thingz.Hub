const userId = localStorage.getItem("user_id");

export async function addDevice(deviceData) {
  const response = await fetch(
    `http://127.0.0.1:8000/device/post?user_id=${userId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(deviceData),
    }
  );
  if (!response.ok) throw new Error("Device already exist");

  return await response.json();
}
