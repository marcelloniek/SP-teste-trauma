"use client";

import { useState } from 'react';

const preguntas = [
  "Me perturban recuerdos indeseados o pesadillas relacionados con un evento difícil o traumático que viví.",
  "Tengo reacciones emocionales intensas (miedo, angustia o ansiedad) al recordar o al ser expuesto(a) a algo relacionado con el trauma.",
  "Evito conscientemente lugares, personas o situaciones que puedan recordarme el acontecimiento traumático.",
  "Tengo dificultad para confiar en las personas o para establecer nuevas relaciones después de haber pasado por experiencias difíciles.",
  "Tengo problemas para experimentar emociones positivas o sentir placer en situaciones que antes eran agradables, después del evento traumático.",
  "Recientemente, he pensado en desistir de vivir o en dañarme físicamente debido al sufrimiento causado por recuerdos traumáticos.", // FLAG
  "Me siento frecuentemente nervioso(a), sobresaltado(a) o constantemente alerta, como si algo malo pudiera suceder nuevamente en cualquier momento.",
  "Percibo alteraciones significativas en mi sueño (insomnio o sueño agitado) relacionadas con recuerdos o pensamientos traumáticos.",
  "Tengo problemas de concentración, memoria o atención que comenzaron después de un evento emocionalmente intenso o traumático.",
  "Me he aislado emocional o socialmente debido al miedo, vergüenza o dolor que siento después de experiencias traumáticas."
];

export default function TestTrauma() {
  const [respuestas, setRespuestas] = useState(Array(10).fill(0));
  const [resultado, setResultado] = useState(null);
  const [indiceActual, setIndiceActual] = useState(0);

  const registrarRespuesta = (valor) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[indiceActual] = valor;
    setRespuestas(nuevasRespuestas);

    if (indiceActual < preguntas.length - 1) {
      setIndiceActual(indiceActual + 1);
    } else {
      calcularResultado(nuevasRespuestas);
    }
  };

  const calcularResultado = (respuestas) => {
    if (respuestas[5] >= 3) { // FLAG
      setResultado("ROJO");
    } else {
      const suma = respuestas.reduce((a, b) => a + b, 0);
      if (suma <= 20) setResultado("VERDE");
      else if (suma <= 35) setResultado("AMARILLO");
      else setResultado("ROJO");
    }
  };

  const reiniciarTest = () => {
    setRespuestas(Array(10).fill(0));
    setResultado(null);
    setIndiceActual(0);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
      {!resultado ? (
        <>
          <h2 className="text-xl font-semibold mb-4">Test de Trauma</h2>
          <p className="mb-4">{preguntas[indiceActual]}</p>
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700"
                onClick={() => registrarRespuesta(num)}
              >
                {num}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm">Pregunta {indiceActual + 1} de {preguntas.length}</p>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">Resultado: {resultado}</h2>
          {resultado === "VERDE" && <p>Manejas muy bien este tema y tienes una buena estabilidad emocional. Podrás ayudar significativamente a otras personas que necesitan apoyo.</p>}
          {resultado === "AMARILLO" && <p>Hay signos evidentes de dificultades emocionales que necesitan atención y que, con determinación y ayuda, podrán superarse.</p>}
          {resultado === "ROJO" && <p>Tus dificultades emocionales relacionadas con este tema requieren ayuda profesional inmediata. Busca rápidamente la ayuda de un médico o psicólogo.</p>}
          <button
            className="mt-4 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded hover:bg-green-600 dark:hover:bg-green-700"
            onClick={reiniciarTest}
          >
            Rehacer el test
          </button>
        </>
      )}
    </div>
  );
}
