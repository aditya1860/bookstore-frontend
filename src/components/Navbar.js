import { Link } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  const isAdmin = user?.role === "admin";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.replace("/login");
  };

  if (!token) return null;

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>📚 Bookstore</h2>

      <div>
        {!isAdmin && (
          <Link to="/books" style={styles.link}>
            Books
          </Link>
        )}

        {isAdmin && (
          <Link to="/admin" style={styles.link}>
            Admin Panel
          </Link>
        )}

        <button onClick={logout} style={styles.logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#51617aff",
    color: "white"
  },
  logo: {
    margin: 0
  },
  link: {
    marginRight: "15px",
    color: "white",
    textDecoration: "none",
    fontWeight: "bold"
  },
  logout: {
    padding: "6px 12px",
    border: "none",
    backgroundColor: "#ef4444",
    color: "white",
    cursor: "pointer"
  }
};

export default Navbar;
