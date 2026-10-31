import { useEffect, useState } from "react";

function App() {
  const [apiStatus, setApiStatus] = useState("checking");

  useEffect(() => {
    const controller = new AbortController();

    async function checkApi() {
      try {
        const response = await fetch("/api/health", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`API health check failed (${response.status})`);
        }

        const result = await response.json();
        setApiStatus(result.status === "ok" ? "connected" : "unavailable");
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Could not connect to the studypot API:", error);
          setApiStatus("unavailable");
        }
      }
    }

    checkApi();
    return () => controller.abort();
  }, []);

  return (
    <main className="page">
      <header className="topbar">
        <a className="wordmark" href="/" aria-label="studypot home">
          <span className="wordmark-icon" aria-hidden="true">
            s
          </span>
          studypot
        </a>
        <span className="topbar-note">A little more focus, together.</span>
      </header>

      <section className="welcome" aria-labelledby="welcome-heading">
        <p className="eyebrow">YOUR STUDY COMMUNITY</p>
        <h1 id="welcome-heading">
          Good things grow
          <br />
          <span>when we study together.</span>
        </h1>
        <p className="intro">
          Find your people, share what you’re learning, and make your next study
          session count.
        </p>
        <div className={`api-status api-status--${apiStatus}`} role="status">
          <span className="status-dot" aria-hidden="true" />
          {apiStatus === "checking" && "Connecting to studypot"}
          {apiStatus === "connected" && "Connected to the studypot API"}
          {apiStatus === "unavailable" && "The studypot API is unavailable"}
        </div>
      </section>

      <footer className="footer">
        <span>Make room for good ideas.</span>
        <span>studypot © 2025</span>
      </footer>
    </main>
  );
}

export default App;
