import { useState } from "react";

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    // ✅ Allow any email ending with @gmail.com
    if (email.endsWith("@gmail.com")) {
      onLoginSuccess(); // login successful
    } else {
      setError("Email must be a valid @gmail.com address");
    }
  }

  return (
    <div
      style={{
        width: "350px",
        margin: "0 auto",
        padding: "20px",
        borderRadius: "10px",
        background: "white",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.1)"
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        {error && (
          <p style={{ color: "red", textAlign: "center" }}>{error}</p>
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            background: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
  