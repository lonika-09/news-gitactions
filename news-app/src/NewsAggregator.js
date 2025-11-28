import { useEffect, useState } from "react";

export default function NewsAggregator() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("general");
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);

  // ✅ Use backend API instead of NewsAPI directly
  const URL = `http://localhost:8080/api/news?category=${category}&q=${query}`;

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch news");
        return res.json();
      })
      .then((data) => {
        setArticles(data.articles || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching news. Please try again later.");
        setLoading(false);
      });
  }, [category, query]);

  // --- Speech Function ---
  function speak(text) {
    window.speechSynthesis.cancel(); // stop previous speech
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      utterance.voice =
        voices.find((v) => v.lang === "en-US") || voices[0];
    }
    utterance.lang = "en-US";
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  }

  function stopSpeech() {
    window.speechSynthesis.cancel();
  }

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Loading news...
      </p>
    );

  if (error)
    return (
      <p style={{ textAlign: "center", color: "red", marginTop: "20px" }}>
        {error}
      </p>
    );

  return (
    <div style={{ padding: "20px" }}>
      {/* Search & Categories */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Search news..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") setQuery(e.target.value);
          }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        >
          <option value="general">General</option>
          <option value="business">Business</option>
          <option value="technology">Technology</option>
          <option value="science">Science</option>
          <option value="health">Health</option>
          <option value="sports">Sports</option>
          <option value="entertainment">Entertainment</option>
        </select>
      </div>

      {/* News Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {articles.length === 0 ? (
          <p>No articles found.</p>
        ) : (
          articles.map((article, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                background: "#fff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt="news"
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                />
              )}
              <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>
                {article.title}
              </h2>
              <p
                style={{
                  fontSize: "14px",
                  color: "#555",
                  marginTop: "8px",
                }}
              >
                {article.description}
              </p>
              <a
                href={article.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "10px",
                  color: "#007BFF",
                  textDecoration: "none",
                }}
              >
                Read more →
              </a>

              {/* Listen Buttons */}
              <div style={{ marginTop: "10px" }}>
                <button
                  onClick={() =>
                    speak(article.title + ". " + article.description)
                  }
                  style={{
                    marginRight: "10px",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  🔊 Listen
                </button>
                <button
                  onClick={stopSpeech}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    background: "#f44336",
                    color: "white",
                  }}
                >
                  ⏹ Stop
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
