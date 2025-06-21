import React, { useRef, useState, useEffect } from "react";

const palabras = [
  {
    palabra: "MAMÁ",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Mother_icon.svg/512px-Mother_icon.svg.png",
    audio: "https://www.soundjay.com/human/sounds/mama-1.mp3"
  },
  {
    palabra: "PAPÁ",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Father_icon.svg/512px-Father_icon.svg.png",
    audio: "https://www.soundjay.com/human/sounds/papa-1.mp3"
  }
];

export default function TracingPalabrasApp() {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  const currentWord = palabras[wordIndex];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "bold 100px Arial";
    ctx.fillStyle = "#cccccc";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(currentWord.palabra, canvas.width / 2, canvas.height / 2);
  }, [wordIndex]);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setDrawing(true);
  };

  const draw = (e) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.stroke();
  };

  const stopDrawing = () => {
    setDrawing(false);
  };

  const nextWord = () => {
    setWordIndex((prev) => (prev + 1) % palabras.length);
  };

  const playAudio = () => {
    const audio = new Audio(currentWord.audio);
    audio.play();
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-2xl font-bold">Aprender Palabras</h1>
      <img src={currentWord.imagen} alt={currentWord.palabra} className="w-32 h-32 object-contain" />
      <canvas
        ref={canvasRef}
        width={300}
        height={200}
        className="border-2 border-gray-300 rounded-lg bg-white touch-none"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={(e) => startDrawing(e.touches[0])}
        onTouchMove={(e) => draw(e.touches[0])}
        onTouchEnd={stopDrawing}
      />
      <div className="flex gap-4">
        <button onClick={playAudio} className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600">Escuchar</button>
        <button onClick={nextWord} className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600">Siguiente palabra</button>
      </div>
    </div>
  );
}
