import { useState } from "react";
import "./App.css";
import Rules from "./components/Rules";
import Quiz from "./components/Quiz";

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);

  const toggleGameplay = () => {
    setIsGameStarted((prev) => !prev);
  };

  return (
    <>
      <div className="container">
        {isGameStarted ? <Quiz /> : <Rules toggle={toggleGameplay} />}
      </div>
    </>
  );
}

export default App;
