import { useNavigate } from "react-router-dom";

function Option1({ text }) {
  const navigate = useNavigate();

  const chooseRoute = () => {
    text == "Busca Personalizada"
      ? navigate("/buscapersonalizada")
      : navigate("/buscaespecifica");
  };

  return (
    <div
      onClick={chooseRoute}
      className="w-[90vw] bg-purple-800 shadow-md shadow-purple-300 rounded-xl hover:bg-purple-400 hover:shadow-purple-900 transition ease-in-out hover:scale-105 text-center h-[20vh] flex justify-center items-center hover:cursor-pointer text-white font-medium text-lg hover:text-purple-950"
    >
      {text}
    </div>
  );
}

export default Option1;
