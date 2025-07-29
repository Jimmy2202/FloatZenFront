import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";

function Login({ text }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msgLogin, setMsglogin] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const [text2, setText2] = useState(text);
  const [ver, setVer] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("verified") === "true") {
      setVerified(true);
      setMsglogin("✅ Conta verificada com sucesso. Faça login.");
    }
  }, [location]);

  const checkSession = async () => {
    const response = await fetch(
      "https://floatzenback.onrender.com/api/auth/session",
      {
        credentials: "include",
      }
    );
    const data = await response.json();
  };

  const handleLogin = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    setMsglogin(
      <AiOutlineLoading3Quarters className="text-white animate-spin" />
    );
    const opt = text === "Entrar" ? "login" : "register";
    const link = `https://floatzenback.onrender.com/api/auth/${opt}`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    };

    const response = await fetch(link, options);
    const data = await response.json();

    try {
      if (data.success) {
        if (opt === "login") {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          await checkSession();
          navigate("/main");
        } else {
          setMsglogin(
            "Cadastro realizado! Verifique seu email para ativar a conta."
          );
        }
      } else {
        setMsglogin(data.message || data.error);
        if (data.message === "Usuário não encontrado") {
          setTimeout(() => {
            navigate("/register");
          }, 1500);
          setVer(false);
        }
      }
    } catch (error) {
      setError("Erro ao conectar ao servidor");
    }
  };

  useEffect(() => {
    setEmail("");
    setPassword("");
    setMsglogin("");
    setError("");
  }, [text]);

  return (
    <div className="bg-purple-800/[0.6] p-8 w-[50vw] sm-custom:w-[90vw] sm-custom:p-2 gap-2 flex flex-col items-center justify-center rounded-xl">
      <h1 className="font-bitcount text-white text-[150%]">
        {text === "Entrar" ? "LOGIN" : "CADASTRO"}
      </h1>

      <img
        src={`${import.meta.env.BASE_URL}Picsart_25-07-26_19-41-31-306.png`}
        alt=""
        className="w-[100px] h-[100px] animate-float2 transition ease-in-out"
      />

      <form
        className="p-8 w-[50vw] sm-custom:w-full gap-5 flex flex-col items-center justify-center"
        onSubmit={handleLogin}
      >
        <input
          className="w-[90%]  p-2 rounded-md font-medium hover:bg-purple-950 hover:text-white transition ease-in"
          type="email"
          placeholder="Email:"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-[90%] p-2 rounded-md font-medium hover:bg-purple-950 hover:text-white"
          type="password"
          placeholder="Senha:"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="bg-purple-950 border border-black p-3 rounded-md text-white w-[50%] hover:scale-[1.1] hover:bg-purple-400 hover:text-purple-950 transition ease-in">
          {text}
        </button>

        {text === "Entrar" && (
          <p
            className="text-sm mt-2 text-white underline cursor-pointer hover:text-purple-200"
            onClick={() => navigate("/forgot-password")}
          >
            Esqueceu sua senha?
          </p>
        )}
      </form>

      {msgLogin && <p className="text-white text-[15px]">{msgLogin}</p>}
      {error && <p className="text-red-400">{error}</p>}

      {text === "Entrar" && (
        <button
          onClick={() => navigate("/register")}
          className="text-sm mt-4 text-white underline hover:text-purple-200 transition"
        >
          Cadastre-se
        </button>
      )}
    </div>
  );
}

export default Login;
