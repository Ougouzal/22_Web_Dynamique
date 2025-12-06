export async function toggleBookmark(id) {
  await fetch("http://127.0.0.1:8000/sanctum/csrf-cookie", {
    credentials: "include",
  });

  const res = await fetch(`http://127.0.0.1:8000/api/resources/${id}/bookmark`, {
    method: "POST",
    credentials: "include",
  });

  return await res.json();
}
