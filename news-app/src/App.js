import { useState } from "react";
import Login from "./Login";
import NewsAggregator from "./NewsAggregator";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div style={{ background: "#f5f5f5", minHeight: "100vh" }}>
      {!isLoggedIn ? (
        <>
          <h1 style={{ textAlign: "center", padding: "20px", fontSize: "28px" }}>
            📰 News Aggregator - Login
          </h1>
          <Login onLoginSuccess={() => setIsLoggedIn(true)} />
        </>
      ) : (
        <>
          <h1 style={{ textAlign: "center", padding: "20px", fontSize: "28px" }}>
            📰 News Aggregator
          </h1>
          <NewsAggregator />
        </>
      )}
    </div>
  );
}

export default App;
