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
          <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-[url(https://i.imgur.com/SYy4172.jpeg)] bg-bg-no-repeat">
            <Header />
            <div className="w-[100%] flex flex-col justify-between gap-10 items-center">
              <Option1 text="Busca Personalizada" />
              <Option1 text="Busca Específica" />
            </div>
          </div>
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
