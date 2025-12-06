import api from "../api/api";

const response = await api.post("/login", { email, password });

if (response.data.success) {
  localStorage.setItem("user", JSON.stringify(response.data.user));
  navigate("/feed");
}
