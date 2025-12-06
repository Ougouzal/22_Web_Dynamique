import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/resources";

export const getResources = () => axios.get(API_URL);

export const createResource = (data) => axios.post(API_URL, data);

export async function getSavedResources() {
  // Obligatoire pour Sanctum
  await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
    withCredentials: true,
  });

  return axios.get("http://127.0.0.1:8000/api/saved", {
    withCredentials: true,
  });


}


