import api from "../api/api";

await api.post("/register", { name, email, password });
