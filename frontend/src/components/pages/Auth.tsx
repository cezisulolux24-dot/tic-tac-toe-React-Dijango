// src/pages/Auth.tsx
import React, { useState } from "react";
import { authProcess } from "../../api/authApi";
import type { User } from "../../types";
import { IS_SIGNUP, SIGNUP_URL } from "../../config/config";
import { AUTH_TITLE } from "../../utils/util";
import './Auth.css';

interface Props {
  onLogin: (user: User) => void;
}

const Auth: React.FC<Props> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState<boolean>(IS_SIGNUP);

  const handleSubmit = async () => {
    const data = await authProcess(SIGNUP_URL(isSignup), username, password);

    if (data.success) {
      const user = { id: data.id, username: data.username };
      onLogin(user);
    } else {
      alert(data.message);
    }
  };

  const handleSignup = () => {
    setIsSignup(!isSignup);
  }

  return (
    <div className="container-auth">
      <div className="content-auth">
        <h2 className="title-auth">
          {AUTH_TITLE[isSignup]}
        </h2>

        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          className="input-auth"
        />

        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          className="input-auth"
        />

        <button
          onClick={handleSubmit}
          className="btn-submit"
        >
          {/* {PAGE_TITLE[AUTH_STATUS]} */}
          {AUTH_TITLE[isSignup]}
        </button>

        <button
          onClick={handleSignup}
          className="btn"
        >
          Go To {AUTH_TITLE[!isSignup]}
        </button>
      </div>
    </div>
  );
};

export default Auth;