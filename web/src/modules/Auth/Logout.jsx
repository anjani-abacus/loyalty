import { useNavigate } from "react-router-dom";
import { logoutApi } from "../../reactQuery/services/auth/authApi";

export default function Logout() {
  const navigate = useNavigate();

  const handleClick = async () => {
    try { await logoutApi(); } catch (_) {}
    finally {
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <span onClick={handleClick} className="cursor-pointer">
      Logout
    </span>
  );
}

export const handleLogout = async () => {
  try { await logoutApi(); } catch (_) {}
  finally {
    localStorage.clear();
    location.replace("/login");
  }
};
