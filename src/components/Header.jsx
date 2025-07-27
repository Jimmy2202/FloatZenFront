import { useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

function Header() {
  const userData = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const logout = async () => {
    const response = await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include", // 🔥 Permite enviar cookies para manter a sessão
    });
    const data = await response.json();
    console.log(data.message);
    localStorage.removeItem("user"); // limpa localStorage
    navigate("/login"); // redireciona com SPA
  };

  return (
    <header className="w-screen sm-custom_2:gap-10 sm-custom:text-[10px] sm-custom:gap-20 font-bruno h-[20vh] bg-purple-950 p-4 flex flex-row justify-center gap-32 items-center z-30 fixed top-0">
      <a href="/main" className="text-white hover:scale-105 transition ease-in">
        Menu
      </a>
      <a
        href="/history"
        className="text-white hover:scale-105 transition ease-in"
      >
        Histórico
      </a>
      <button
        onClick={logout}
        className="text-white hover:scale-105 transition ease-in"
      >
        Sair
      </button>
    </header>
  );
}

export default Header;
