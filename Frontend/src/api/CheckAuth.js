export default async function checkAuth() {
  const res = await fetch("http://127.0.0.1:8000/api/me", {
    credentials: "include",
  });

  const data = await res.json();
  return data.authenticated;
}
