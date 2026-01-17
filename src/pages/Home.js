import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  const isAdmin = user?.role === "admin";

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Bookstore</h1>
      <p style={styles.subtitle}>
        Browse, search, and order books easily
      </p>

      {!token && (
        <button
          style={styles.button}
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      )}

      {token && !isAdmin && (
        <button
          style={styles.button}
          onClick={() => navigate("/books")}
        >
          Go to Books
        </button>
      )}

      {token && isAdmin && (
        <button
          style={styles.button}
          onClick={() => navigate("/admin")}
        >
          Go to Admin Dashboard
        </button>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px",
  },
  title: {
    fontSize: "36px",
  },
  subtitle: {
    fontSize: "18px",
    color: "#555",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Home;
