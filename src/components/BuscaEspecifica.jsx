import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { IoChevronDownCircleOutline } from "react-icons/io5";
import { IoChevronUpCircleOutline } from "react-icons/io5";
import FeedbackForm from "./FeedbackForm";

function BuscaEspecifica() {
  const [song, setSong] = useState({});
  const [curatedSong, setCuratedSong] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const [option, setOption] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [seta, setSeta] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selected, setSelected] = useState("");
  const [showTooltip, setShowTooltip] = useState(true);
  const [isHoveringText, setIsHoveringText] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const userData = JSON.parse(localStorage.getItem("user"));

  const grafoEmocional = {
    Ansiedade: {
      tempo: 70,
      energy: 0.3,
      acousticness: 0.85,
      valence: 0.4,
      instrumentalness: 0.6,
      speechiness: 0.1,
    },
    Foco: {
      tempo: 100,
      energy: 0.6,
      acousticness: 0.4,
      valence: 0.5,
      instrumentalness: 0.8,
      speechiness: 0.15,
    },
    Tristeza: {
      tempo: 60,
      energy: 0.2,
      acousticness: 0.7,
      valence: 0.2,
      instrumentalness: 0.5,
      speechiness: 0.1,
    },
    Sono: {
      tempo: 50,
      energy: 0.1,
      acousticness: 0.9,
      valence: 0.3,
      instrumentalness: 0.9,
      speechiness: 0.05,
    },
  };

  const update_history = async (song, curateData) => {
    const now = new Date();

    // Converte para o fuso horário de Brasília (America/Sao_Paulo)
    const brDate = new Date(
      now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
    );

    // Formata para o padrão MySQL: "YYYY-MM-DD HH:MM:SS"
    const pad = (n) => String(n).padStart(2, "0");
    const mysqlFormattedTimestamp = `${brDate.getFullYear()}-${pad(
      brDate.getMonth() + 1
    )}-${pad(brDate.getDate())} ${pad(brDate.getHours())}:${pad(
      brDate.getMinutes()
    )}:${pad(brDate.getSeconds())}`;

    const history = {
      user_id: userData.id,
      music_name: song.name,
      artist_name: song.artists[0].name,
      music_img: song.album.images[0].url,
      spotify_link: song.external_urls.spotify,
      timestamp: mysqlFormattedTimestamp,
    };

    console.log(history.artist_name);

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(history),
    };

    const link = "https://floatzenback.onrender.com/api/auth/history";
    const res = await fetch(link, options);
    const data = await res.json();
    console.log(data);
  };

  const fetchSong = async (option) => {
    setOption(option);
    setIsLoading(true);
    console.log(option);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ option }),
    };

    const link = "https://floatzenback.onrender.com/api/auth/music1";

    const res = await fetch(link, options);
    const track = await res.json();
    const [spotifytrack, curateData, episodes] = track;

    setEpisodes(episodes.episodes.items);
    setCuratedSong(curateData);
    setSong(spotifytrack);
    update_history(spotifytrack, curateData);
    setIsLoading(false);
    setSearched(true);
  };

  const options = ["Ansiedade", "Foco", "Tristeza", "Sono"];

  return (
    <div className="w-screen h-screen bg-[url(https://i.imgur.com/SYy4172.jpeg)] justify-center items-center mt-24 relative">
      {!isLoading && !searched && !feedback ? (
        <form className="w-full h-full bg-purple-900 flex justify-center items-center flex-col gap-4">
          {options.map((option) => (
            <button
              onClick={async (e) => {
                e.preventDefault();
                setSelected(option);
                await fetchSong(option);
              }}
              className={`w-[20vw] sm-custom:w-[40vw] p-3 rounded-2xl border hover:bg-purple-700 hover:text-white transition duration-500 ease-in-out ${
                option === selected
                  ? "bg-purple-800 border-white"
                  : "bg-white border-purple-950"
              }`}
            >
              {option}
            </button>
          ))}
        </form>
      ) : isLoading && !feedback ? (
        <div className="w-screen h-screen flex justify-center bg-transparent items-center m-auto">
          <AiOutlineLoading3Quarters className="text-white animate-spin" />
        </div>
      ) : feedback ? (
        <div className="w-screen h-screen backdrop-blur-lg bg-transparent flex justify-center items-center">
          <FeedbackForm
            songName={song.name}
            artistName={song.artists[0].name}
            userId={userData.id}
            selected_option={option}
          />
        </div>
      ) : (
        <div className="bg-[url(https://i.imgur.com/SYy4172.jpeg)] flex flex-col p-3 justify-center items-center gap-3 w-full h-fit">
          <div
            className="relative w-full flex justify-center"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(true)}
          >
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-purple-800/[0.5] backdrop-blur-sm mt-[10vh] rounded-md sm-custom:mt-20 flex sm-custom:flex-col justify-between sm-custom:justify-center items-center gap-3 p-4 w-[90vw] h-fit relative"
            >
              <div className="flex justify-start items-start bg-black/[0.4] text-purple-400 gap-3 p-4 w-fit">
                <div className="flex flex-col justify-center text-left">
                  <h1>Música : {song.name}</h1>
                  <h1>Artista: {song.artists[0].name}</h1>
                </div>
                <img
                  className="w-[20vw] h-[20vw]"
                  src={song.album.images[0].url}
                  alt=""
                />
              </div>

              <div className="flex flex-col justify-center items-center gap-3">
                <a href={song.external_urls.spotify}>
                  <button className="p-3 bg-white font-alumni text-purple rounded-lg">
                    Clique aqui para ouvir no Spotify
                  </button>
                </a>
                {curatedSong.links.youtube != null ? (
                  <a href={curatedSong.links.youtube}>
                    <button className="p-3 bg-white font-alumni text-purple rounded-lg">
                      Clique aqui para ouvir no YouTube
                    </button>
                  </a>
                ) : (
                  <a href={curatedSong.links.soundcloud}>
                    <button className="p-3 bg-white font-alumni text-purple rounded-lg">
                      Clique aqui para ouvir no SoundCloud
                    </button>
                  </a>
                )}
                <AnimatePresence>
                  {showTooltip && (
                    <motion.div
                      key="tooltip"
                      initial={{ y: 0 }}
                      animate={{
                        opacity: 1,
                        y: [-10, -12, -10],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                      }}
                      className="backdrop-blur-sm text-[10px] font-bitcount hover:cursor-pointer bg-black/[0.5] text-white p-4 rounded-xl shadow-lg min-w-[20vw] w-fit max-w-full text-center text-sm z-20"
                    >
                      <motion.p
                        onClick={() => {
                          isHoveringText
                            ? setIsHoveringText(false)
                            : setIsHoveringText(true);
                        }}
                        animate={
                          isHoveringText
                            ? {
                                scale: [1, 1.06, 1],
                                transition: { duration: 2 },
                              }
                            : { scale: 1 }
                        }
                        className="transition-all p-2 text-center"
                      >
                        {isHoveringText
                          ? `${curatedSong.explanation}`
                          : "Clique aqui para ver datalhes da recomendação."}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
          <div
            onClick={() => {
              clicked ? setClicked(false) : setClicked(true);
              seta ? setSeta(false) : setSeta(true);
            }}
            className=" hover:bg-purple-300 hover:text-purple-950 flex flex-row justify-center items-center scale-95 gap-2 hover:cursor-pointer hover:scale-110 transition ease-in-out top-[70vh] left-3 p-3 bg-purple-950 text-purple-300 shadow-2xl shadow-black"
          >
            Podcasts
            {!seta ? (
              <IoChevronDownCircleOutline />
            ) : (
              <IoChevronUpCircleOutline />
            )}
          </div>
          {clicked
            ? episodes.map((episode, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.1 * index,
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                  onClick={() => {
                    clicked ? setClicked(false) : setClicked(true);
                  }}
                  className="w-[80vw] bg-purple-600 rounded-xl p-4 flex flex-col gap-3 justify-center items-center text-left"
                >
                  <div className="flex sm-custom:flex-col break-words justify-start items-start bg-black/[0.4] text-purple-400 gap-3 p-4 h-fit max-h-[90%] w-fit max-w-[90%]">
                    <div className="flex flex-col justify-center w-full h-full text-left">
                      <h1 className="font-bold mb-5">Nome: {episode.name}</h1>
                      <p>Descrição : {episode.description}</p>
                    </div>
                    <img
                      className="w-[20vw] h-[20vw]"
                      src={episode.images[0].url}
                      alt=""
                    />
                  </div>
                  <a href={episode.external_urls.spotify}>
                    <button className="p-3 bg-white text-purple rounded-lg font-alumni shadow-md shadow-black hover:scale-105 transition duration-500 hover:bg-black hover:text-white hover:shadow-white">
                      Clique aqui para ouvir o episódio no Spotify
                    </button>
                  </a>
                </motion.div>
              ))
            : ""}
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

export default BuscaEspecifica;

/*

{episodes.map((episode, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.1 * index,
                duration: 0.5,
                ease: "easeOut",
              }}
              className="w-[80vw] bg-purple-600 rounded-xl p-4 flex flex-col gap-3 justify-center items-center text-left"
            >
              <div className="flex justify-start items-start bg-black/[0.4] text-purple-400 gap-3 p-4 w-fit">
                <div className="flex flex-col justify-center text-left">
                  <h1>Descrição : {episode.description}</h1>
                  <h1>Nome: {episode.name}</h1>
                </div>
                <img
                  className="w-[20vw] h-[20vw]"
                  src={episode.images[0].url}
                  alt=""
                />
              </div>
              <a href={episode.external_urls.spotify}>
                <button className="p-3 bg-white text-purple rounded-lg">
                  Clique aqui para ouvir o episódio no Spotify
                </button>
              </a>
            </motion.div>
          ))}

*/
