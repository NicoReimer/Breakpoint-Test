import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
  const query = useQuery().get("q");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      axios
        .get(
          `${
            import.meta.env.VITE_API_URL
          }/api/articles?search=${encodeURIComponent(query)}`
        )
        .then((res) => setResults(res.data))
        .catch((err) => console.error(err));
    }
  }, [query]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>
        Suchergebnisse für: <em>{query}</em>
      </h2>
      {results.length === 0 ? (
        <p>Keine Artikel gefunden.</p>
      ) : (
        <ul>
          {results.map((article) => (
            <li key={article.id}>{article.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
