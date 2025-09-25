/*
export async function login(email,password) {
    const response = await fetch('http://127.0.0.1:8000/usersauth',
        {
            method:'POST',
            headers: { 'Content-Type':'application/json'},
            body: JSON.stringify({email,password}),
        })
    if (!response.ok) throw new Error('login failed'); 
    return await response.json();
}

export async function signUp(name,email,password) {
    const response = await fetch('http://127.0.0.1:8000/usersauth',
        {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({name,email,password}),
        })
    if(!response.ok) throw new Error('Sign up failed');
    return await response.json();
}
*/


