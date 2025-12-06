export async function getSavedResources() {
  // Appel API public sans authentification ni CSRF
  const res = await fetch("http://127.0.0.1:8000/api/saved");

  if (!res.ok) {
    throw new Error("Erreur lors de la récupération des ressources");
  }

  return await res.json();
}
