export async function fetchSensor(){
    const response = await fetch('http://127.0.0.1:8000/sensorData/get',
        {
            method:'GET',
        })
        if (!response.ok) throw new Error ("Dont have any sensor");
        return await response.json();
}
export async function createSensorCard(){
    const response = await fetch('http://127.0.0.1:8000/sensorData/post',
        {
            method:'POST',
            headers:{'content-type': 'application/json'},
            body:JSON.stringify()/* need to add the config */
        })
        if (!response.ok) throw new Error ("Dont have any sensor");
        return await response.json();
}