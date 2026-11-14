import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUser(res.data);
      } catch (err) {
        console.error("Not logged in");
      }
    }

    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dashboard</h1>

      {user ? (
        <>
          <p style={styles.text}>Bienvenue <b>{user.username}</b> 👋</p>
          <button style={styles.logoutBtn} onClick={logout}>
            Déconnexion
          </button>
        </>
      ) : (
        <p style={styles.text}>Chargement...</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
    fontFamily: "Arial",
  },
  title: {
    fontSize: "32px",
    marginBottom: "20px",
  },
  text: {
    fontSize: "20px",
    marginBottom: "20px",
  },
  logoutBtn: {
    padding: "10px 20px",
    fontSize: "16px",
    background: "#d9534f",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  }
};

export default Dashboard;
