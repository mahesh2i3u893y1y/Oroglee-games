import { useEffect, useRef, useState } from "react";

const PaintingApp = () => {
  const canvasRef = useRef(null);
  const [color, setColor] = useState("#000000"); // Brush color
  const [size, setSize] = useState(5); // Brush size
  const [tool, setTool] = useState("brush"); // Current tool (brush, eraser, shape)
  const [shape, setShape] = useState("line"); // Shape type (line, rectangle, circle)
  const [isDrawing, setIsDrawing] = useState(false); // Track drawing state
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 }); // Start position for shapes
  const [drawnShapes, setDrawnShapes] = useState([]); // Store shapes for fill detection
  const toothImage = "https://cdn.pixabay.com/photo/2016/07/06/20/50/tooth-1501321_1280.png"; // Tooth image URL

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Set up the canvas
    canvas.width = 800;
    canvas.height = 600;
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, canvas.width, canvas.height); // Initial white background

    // Load and draw the tooth image when the canvas is first loaded
    const img = new Image();
    img.src = toothImage;
    img.onload = () => {
      context.drawImage(img, 200, 150, 200, 200); // Position and size of the tooth image
    };
  }, []);

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setStartPosition({ x, y });

    if (tool === "brush" || tool === "eraser") {
      context.beginPath();
      context.moveTo(x, y);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (tool === "brush") {
      context.strokeStyle = color;
      context.lineWidth = size;
      context.lineTo(x, y);
      context.stroke();
    } else if (tool === "eraser") {
      context.strokeStyle = "#FFFFFF"; // Eraser uses white color
      context.lineWidth = size;
      context.lineTo(x, y);
      context.stroke();
    }
  };

  const handleMouseUp = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (tool === "shape") {
      context.strokeStyle = color;
      context.lineWidth = size;

      if (shape === "rectangle") {
        const width = x - startPosition.x;
        const height = y - startPosition.y;
        context.strokeRect(startPosition.x, startPosition.y, width, height);
        setDrawnShapes((prevShapes) => [
          ...prevShapes,
          { type: "rectangle", x: startPosition.x, y: startPosition.y, width, height, color },
        ]);
      } else if (shape === "circle") {
        const radius = Math.sqrt(
          Math.pow(x - startPosition.x, 2) + Math.pow(y - startPosition.y, 2)
        );
        context.beginPath();
        context.arc(startPosition.x, startPosition.y, radius, 0, Math.PI * 2);
        context.stroke();
        setDrawnShapes((prevShapes) => [
          ...prevShapes,
          { type: "circle", x: startPosition.x, y: startPosition.y, radius, color },
        ]);
      } else if (shape === "line") {
        context.beginPath();
        context.moveTo(startPosition.x, startPosition.y);
        context.lineTo(x, y);
        context.stroke();
        setDrawnShapes((prevShapes) => [
          ...prevShapes,
          { type: "line", x1: startPosition.x, y1: startPosition.y, x2: x, y2: y, color },
        ]);
      }
    }

    setIsDrawing(false);
    context.closePath();
  };

  const handleFill = (e) => {
    if (tool !== "fill") return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (let shape of drawnShapes) {
      const context = canvas.getContext("2d");
      context.fillStyle = color;

      if (shape.type === "rectangle") {
        if (
          x >= shape.x &&
          x <= shape.x + shape.width &&
          y >= shape.y &&
          y <= shape.y + shape.height
        ) {
          context.fillRect(shape.x, shape.y, shape.width, shape.height);
        }
      } else if (shape.type === "circle") {
        const dx = x - shape.x;
        const dy = y - shape.y;
        if (Math.sqrt(dx * dx + dy * dy) <= shape.radius) {
          context.beginPath();
          context.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
          context.fill();
        }
      }
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Redraw the tooth image after clearing the canvas
    const img = new Image();
    img.src = toothImage;
    img.onload = () => {
      context.drawImage(img, 200, 150, 200, 200);
    };

    setDrawnShapes([]); // Clear all stored shapes
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "painting.png";
    link.href = canvas.toDataURL();
    link.click();
  };
  

  return (
    <div className="flex flex-col items-center justify-center overflow-hidden bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Painting App</h1>

      <div className="flex flex-wrap items-center space-x-4 mb-4">
        <label className="flex items-center">
          <span className="mr-2">Color:</span>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-10 h-10 border"
          />
        </label>
        <label className="flex items-center">
          <span className="mr-2">Size:</span>
          <input
            type="range"
            min="1"
            max="50"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-24"
          />
        </label>
        <select
          value={tool}
          onChange={(e) => setTool(e.target.value)}
          className="border p-2"
        >
          <option value="brush">Brush</option>
          <option value="eraser">Eraser</option>
          <option value="shape">Shape</option>
          <option value="fill">Fill</option>
        </select>
        {tool === "shape" && (
          <select
            value={shape}
            onChange={(e) => setShape(e.target.value)}
            className="border p-2"
          >
            <option value="line">Line</option>
            <option value="rectangle">Rectangle</option>
            <option value="circle">Circle</option>
          </select>
        )}
        <button
          onClick={clearCanvas}
          className="bg-red-500 text-white p-2 rounded"
        >
          Clear
        </button>
        <button
          onClick={saveCanvas}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Save
        </button>
      </div>

      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleFill}
        className="border border-black"
      ></canvas>
    </div>
  );
};

export default PaintingApp;
