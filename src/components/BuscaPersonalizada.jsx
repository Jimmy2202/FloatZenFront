import { useState } from "react";
import Header from "./Header";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import FeedbackForm from "./FeedbackForm";

function BuscaPersonalizada() {
  let [text, setText] = useState("");
  let [loading, setLoading] = useState(false);
  let [loaded, setLoaded] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const [songs, setSongs] = useState([]);
  const userData = JSON.parse(localStorage.getItem("user"));

  const prompt = async (e) => {
    e.preventDefault();

    setLoaded(false);
    setLoading(true);
    const link = "http://localhost:5000/api/auth/ia/fetchprompt";

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ text }),
    };
    const result = await fetch(link, options);
    const data = await result.json();
    const array = JSON.parse(data);
    console.log(array);
    setSongs(array);
    setLoading(false);
    setLoaded(true);
  };

  return (
    <div className="w-screen mt-2 bg-[url(https://i.imgur.com/SYy4172.jpeg)] min-h-screen flex flex-col justify-center items-center">
      {!loaded && !loading && !feedback ? (
        <div className="bg-transparent w-[100vw] h-[100vh] bg-purple-900">
          <Header />
          <div className="w-[100vw] h-[100vh] flex justify-center items-center">
            <form
              onSubmit={prompt}
              className="w-[60vw] h-[40vh] gap-4 text-center rounded-md flex flex-col items-center justify-center"
            >
              <input
                onChange={(e) => setText(e.target.value)}
                placeholder="Digite aqui o tipo de música que quer ouvir, pode colocar artistas preferidos, estilos e etc ;)"
                className="bg-black/[0.6] p-5 sm-custom:w-[90vw] w-[60vw] h-[40vh] text-center rounded-md flex items-center justify-center hover:placeholder:text-black text-purple-200 hover:bg-purple-400/[0.4] hover:text-black transition duration-300"
              ></input>
              <button className="bg-purple-950 text-purple-400 w-fit p-3 rounded-md hover:bg-purple-300 hover:text-purple-900 transition ease-in-out">
                Enviar
              </button>
            </form>
          </div>
        </div>
      ) : loading && !loaded && !feedback ? (
        <div className="w-full h-full bg-blue flex justify-center items-center">
          <AiOutlineLoading3Quarters className="text-white animate-spin" />
        </div>
      ) : feedback ? (
        <div className="w-screen min-h-screen backdrop-blur-lg bg-transparent flex justify-center items-center">
          <FeedbackForm
            songName="Personalizado"
            artistName="Personalizado"
            userId={userData.id}
            selected_option="Personalizado"
          />
        </div>
      ) : (
        <div className="flex mt-36 flex-col gap-3 justify-center items-center w-full h-full">
          {songs.map((song, index) => (
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="p-4 w-[90vw] h-[20vh] flex flex-col justify-center items-start text-white bg-white/[0.5] backdrop-blur-md"
            >
              <h1 className="font-alumni text-[2vw] sm-custom:text-[5vw]">
                Artista: {song.artista}
              </h1>
              <p className="font-bruno text-[2.5vw]">
                <span className="font-alumni text-[2vw] sm-custom:text-[5vw">
                  Música:{" "}
                </span>
                {song.musica}
              </p>
            </motion.div>
          ))}
          <button
            onMouseEnter={() => setStars(true)}
            onMouseLeave={() => setStars(false)}
            className="p-3 w-[90vw] text-[12px] flex justify-center items-center bottom-0 left-2 bg-black hover:bg-[url(https://i.imgur.com/PXbD2e4.gif)] hover:font-bold border-[2px] hover:scale-110 transition duration-500 ease-in-out m-auto rounded-3xl text-white"
            onClick={() => setFeedback(true)}
          >
            Avaliar Recomendação
          </button>
        </div>
      )}
    </div>
  );
}

export default BuscaPersonalizada;
