import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  console.log("Home");
  useEffect(() => {
    try {
      const checkAuth = async () => {
        const resp = await fetch("http://localhost:5000/api/auth/me", {
          headers: { "Content-Type": "application/json" },
        });

        if (!resp.ok) {
          console.log("Redirected to login");
          navigate("/login");
        }
      };
      checkAuth();
    } catch (err) {
      console.error("Error:", err);
    }
  }, []);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

export default Home;
