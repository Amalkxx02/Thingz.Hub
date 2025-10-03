export async function signUp(userData) {
  const response = await fetch("http://127.0.0.1:8000/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  const data = await response.json().catch(() => {});
  if (!response.ok) apiErrorHelper(response, data);
  return data;
}

export async function signIn(userData) {
  const response = await fetch("http://127.0.0.1:8000/auth/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  const data = await response.json().catch(() => {});
  if (response.ok) {
    localStorage.setItem("user_id", data.user_id);
    console.log(localStorage.getItem("user_id"));
  } else if (!response.ok) apiErrorHelper(response, data);
  return data;
}
/*
export async function forgot(email) {
    const response = await fetch('http://127.0.0.1:8000/usersauth',
        {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({email}),
        })
    if(!response.ok) throw new Error('Sign up failed');
    return await response.json();
}
*/
function apiErrorHelper(response, data) {
  const error = new Error(
    typeof data.detail === "string" ? data.detail : "Something went wrong"
  );
  error.status = response.status;
  throw error;
}
