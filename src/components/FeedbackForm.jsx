import { useState } from "react";
import { motion } from "framer-motion";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useNavigate } from "react-router";

function FeedbackForm({ songName, artistName, userId, selected_option }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [emotion, setEmotion] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
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

  const handleSubmit = async () => {
    const feedback = {
      user_id: userId,
      music_name: songName,
      artist_name: artistName,
      rating,
      emotion,
      comment: text,
      timestamp: mysqlFormattedTimestamp,
      type_selected: selected_option,
    };

    await fetch("http://localhost:5000/api/auth/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(feedback),
    });

    navigate("/main");

    setSubmitted(true);
  };

  if (submitted)
    return (
      <div className="text-green-300 mt-4">Obrigado pelo seu feedback! 🌟</div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-purple-800 p-6 rounded-xl text-white shadow-lg w-[80vw] md:w-[50vw] flex flex-col gap-4 mt-20"
    >
      <h2 className="text-lg font-bold">Como você avaliaria a recomendação?</h2>
      <p>
        {
          "(Se escolheu recomendação personalizada, tente detalhar mais o feedback para análises melhores. Agradeço!)"
        }
      </p>

      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) =>
          star <= (hover || rating) ? (
            <AiFillStar
              key={star}
              className="text-yellow-400 text-3xl cursor-pointer"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            />
          ) : (
            <AiOutlineStar
              key={star}
              className="text-yellow-400 text-3xl cursor-pointer"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            />
          )
        )}
      </div>

      <label className="text-sm">
        A recomendação ajudou com o seu estado emocional?
        <input
          type="text"
          value={emotion}
          onChange={(e) => setEmotion(e.target.value)}
          placeholder="Ex: Me senti mais calmo, relaxado, nostálgico..."
          className="w-full p-2 mt-1 rounded-md text-black"
        />
      </label>

      <label className="text-sm">
        Deixe um comentário ou sugestão:
        <textarea
          rows="4"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Sua opinião é muito importante!"
          className="w-full p-2 mt-1 rounded-md text-black"
        />
      </label>

      <button
        onClick={handleSubmit}
        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-xl transition"
      >
        Enviar feedback
      </button>
    </motion.div>
  );
}

export default FeedbackForm;
