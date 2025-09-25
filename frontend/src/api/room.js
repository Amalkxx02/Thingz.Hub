export async function fetchRoom() {
    const response = await fetch('http://127.0.0.1:8000/room/get',
        {
            method:'GET',
        })
        if(!response.ok) throw new Error('No room exist');

        return await response.json();
}