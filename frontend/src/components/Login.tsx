import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await axios.post("http://127.0.0.1:8000/api/auth/login/", {
      username,
      password,
    });

    localStorage.setItem("token", res.data.access);
    alert("Logged in!");
  };

  return (
    <div>
      <input onChange={(e) => setUsername(e.target.value)} placeholder="username" />
      <input onChange={(e) => setPassword(e.target.value)} placeholder="password" type="password" />
      <button onClick={login}>Login</button>
    </div>
  );
}