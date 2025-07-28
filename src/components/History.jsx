import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function History() {
  const userData = JSON.parse(localStorage.getItem("user"));
  const [array, setArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const id = userData.id;

  const dateFormated = (isoString) => {
    const data = new Date(isoString);

    // Soma 3 horas manualmente
    data.setHours(data.getHours() + 3);

    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();

    const hora = String(data.getHours()).padStart(2, "0");
    const minuto = String(data.getMinutes()).padStart(2, "0");

    return `${dia}/${mes}/${ano}, ${hora}:${minuto}`;
  };

  useEffect(() => {
    const fetchHistory = async () => {
      const userId = id;

      setLoading(true);
      const res = await fetch(
        `https://floatzenback.onrender.com/api/auth/history/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // se você estiver usando sessão
        }
      );

      const data = await res.json();
      setArray(data);
      console.log(data);
      setLoading(false);
    };

    fetchHistory();
  }, []);

  return (
    <div className="w-screen min-h-screen h-fit bg-transparent justify-center items-center flex">
      {loading ? (
        <div className="w-full h-full bg-blue flex justify-center items-center">
          <AiOutlineLoading3Quarters className="text-white animate-spin" />
        </div>
      ) : (
        <div className="w-screen bg-[url(https://i.imgur.com/SYy4172.jpeg)] min-h-screen overflow-y-auto mt-[20vh] bg-transparent flex-col flex justify-center items-center gap-3">
          {array.map((track, index) => (
            <div className="bg-transparent flex flex-col p-3 justify-center items-center gap-3 w-full h-fit">
              <div
                className="relative w-full flex justify-center"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(true)}
              >
                <motion.div
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="bg-purple-400/[0.4] backdrop-blur-sm flex justify-between items-center gap-3 p-4 w-[90vw] h-fit relative"
                >
                  <div className="flex sm-custom:flex-col justify-start items-start bg-black/[0.4] text-purple-400 gap-3 p-4 w-fit">
                    <div className="flex flex-col justify-center text-left">
                      <h1>Música : {track.music_name}</h1>
                      <h1>Artista: {track.artist_name}</h1>
                    </div>
                    <img
                      className="w-[20vw] h-[20vw]"
                      src={track.music_img}
                      alt=""
                    />
                  </div>

                  <div className="flex flex-col justify-center items-center gap-3">
                    <a href={track.spotify_link}>
                      <button className="p-3 bg-black text-purple-200 rounded-lg font-alumni shadow-md shadow-purple-200">
                        Clique aqui para ouvir no Spotify
                      </button>
                    </a>
                    <p className="font-bitcount text-white">
                      Data: {dateFormated(track.timestamp)}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;
