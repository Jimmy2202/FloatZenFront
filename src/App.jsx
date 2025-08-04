import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Header from "./components/Header";
import Option1 from "./components/Option1";
import BuscaPersonalizada from "./components/BuscaPersonalizada";
import Register from "./components/Register";
import BuscaEspecifica from "./components/BuscaEspecifica";
import History from "./components/History";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  const userData = JSON.parse(localStorage.getItem("user"));
  const [info, setInfo] = useState(false);

  return (
    <Routes>
      <Route
        path="/"
        element={userData ? <Navigate to="/main" /> : <Navigate to="/login" />}
      />

      <Route
        path="/forgot-password"
        element={
          <div className="flex justify-center items-center w-[100vw] h-[100vh] bg-[url(https://i.imgur.com/SYy4172.jpeg)]">
            <ForgotPassword />
          </div>
        }
      />

      <Route
        path="/reset/:token"
        element={
          <div className="flex justify-center items-center w-[100vw] h-[100vh] bg-[url(https://i.imgur.com/SYy4172.jpeg)]">
            <ResetPassword />
          </div>
        }
      />

      <Route
        path="/login"
        key="login"
        element={
          <div className="flex justify-center items-center w-[100vw] h-[100vh] bg-[url(https://i.imgur.com/SYy4172.jpeg)]">
            <Login text="Entrar" />
          </div>
        }
      />

      <Route
        path="/main"
        element={
          info ? (
            <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-[url(https://i.imgur.com/SYy4172.jpeg)] bg-bg-no-repeat">
              <div className="font-alumni w-[70vw] h-[70vh] sm-custom:p-1 p-5 relative overflow-y-auto flex flex-col justify-center gap-3 text-center backdrop-blur-md items-center">
                <button
                  onClick={() => setInfo(false)}
                  className="absolute right-2 top-2 text-pink-600"
                >
                  Fechar
                </button>
                <span className="text-white sm-custom:mt-40">
                  FloatZen foi desenvolvido para medir o impacto da música e dos
                  sons no bem-estar do usuário.
                </span>

                <span className="text-white">
                  A Busca Personalizada visa recomendar cinco músicas de acordo
                  com especificações do usuário, logo, você tem liberdade de
                  especificar livremente com suas palavras que som quer ouvir.
                  Esta recomendação não possui link para ouvir ou ver, é apenas
                  a recomendação. A cada vez que você clicar na opção, músicas
                  diferentes serão recomendadas.
                </span>

                <span className="text-white">
                  A Busca Específica visa recomendar uma música e três episódios
                  de podcast de acordo com a opção selecionada pelo usuário. São
                  4 opções pré-determinadas: Foco, Ansiedade, Sono e Tristeza.
                  Para cada opção, o sistema recomendará sons que se encaixem
                  neste estado de espírito. Cada música tem a opção de ouvi-la
                  no Spotify e no Youtube, e logo abaixo, uma breve explicação
                  do motivo da recomendação.{" "}
                </span>

                <span className="text-white">
                  O histórico salva as Recomendações Específicas.{" "}
                </span>

                <span className="text-red-600">
                  A Avaliação de cada recomendação é a parte mais importante. O
                  sistema mede o impacto das recomendações no seu bem-estar,
                  logo, é importante avaliarcom as estrelas e dar o feedback
                  sobre COMO REALMENTE O SISTEMA TE AJUDOU NO SEU ESTADO
                  EMOCIONAL. Essa avaliação é o ouro para que este projeto
                  funcione como deveria.{" "}
                </span>
              </div>
            </div>
          ) : (
            <div className="w-[100vw] h-[100vh] mt-4 flex justify-center items-center bg-[url(https://i.imgur.com/SYy4172.jpeg)] bg-bg-no-repeat">
              <Header />
              <div className="w-[100%] flex flex-col justify-between gap-10 items-center">
                <Option1 text="Busca Personalizada" />
                <Option1 text="Busca Específica" />
                <button
                  onClick={() => setInfo(true)}
                  className="p-4 bg-black border border-pink-500 text-pink-600 hover:scale-105 hover:text-black hover:bg-pink-600 transition duration-500 ease-in-out"
                >
                  Como Usar (recomendado para primeiro uso)
                </button>
              </div>
            </div>
          )
        }
      />

      <Route
        path="/history"
        element={
          <div className="w-[100vw] min-h-screen flex justify-center items-center bg-purple-600">
            <Header />
            <History />
          </div>
        }
      />

      <Route
        path="/register"
        key="register"
        element={
          <div className="flex justify-center items-center w-[100vw] h-[100vh] bg-[url(https://i.imgur.com/SYy4172.jpeg)]">
            <Register text="Registrar" />
          </div>
        }
      />

      <Route
        path="/buscapersonalizada"
        element={
          <>
            <Header />
            <BuscaPersonalizada />
          </>
        }
      />
      <Route
        path="/buscaespecifica"
        element={
          <div className="w-screen h-screen">
            <Header />
            <BuscaEspecifica />
          </div>
        }
      />
    </Routes>
  );
}

export default App;
