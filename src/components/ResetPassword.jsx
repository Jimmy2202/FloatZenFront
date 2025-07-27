import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, password }),
        }
      );

      const data = await response.json();
      if (data.success) {
        setMsg("✅ Senha redefinida com sucesso!");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError(data.error || "Erro ao redefinir senha.");
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="bg-purple-800/[0.6] p-8 w-[50vw] sm-custom:w-[90vw] sm-custom:p-2 gap-5 flex flex-col items-center justify-center rounded-xl">
      <h1 className="font-bitcount text-white text-[150%]">REDEFINIR SENHA</h1>

      <form
        className="p-8 w-[50vw] sm-custom:w-full gap-5 flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <input
          className="w-[90%] p-2 rounded-md font-medium hover:bg-purple-950 hover:text-white transition ease-in"
          type="password"
          placeholder="Nova senha:"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="bg-purple-950 border border-black p-3 rounded-md text-white w-[50%] hover:scale-[1.1] hover:bg-purple-400 hover:text-purple-950 transition ease-in">
          Redefinir senha
        </button>
      </form>

      {msg && <p className="text-white">{msg}</p>}
      {error && <p className="text-red-400">{error}</p>}
    </div>
  );
}

export default ResetPassword;
