import Styles from "./Rules.module.css";

const Rules = ({ toggle }) => {
  return (
    <div className={Styles.box}>
      <div className={Styles.rules}>
        <h1>Rules</h1>
        <p>
          1. The quiz consists of 10 questions, each one more challenging than
          the last.
        </p>
        <p>
          2. After each correct answer, the difficulty increases, testing your
          knowledge and focus.
        </p>
        <p>
          3. If you answer incorrectly, the game resets, and you’ll have to
          start from the beginning.
        </p>
        <p>
          4. Your goal is to reach and answer the 10th question correctly to win
          the game.
        </p>
        <p>5. No lifelines — it's a test of pure knowledge and perseverance.</p>
        <p>6. Keep trying until you conquer all 10 questions!</p>
        <p>7. Good luck — only the sharpest minds make it to the end!</p>
      </div>

      <button className={Styles.start_btn} onClick={toggle}>
        Start Game
      </button>
    </div>
  );
};

export default Rules;
