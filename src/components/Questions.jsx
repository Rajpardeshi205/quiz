import React, { useState, useEffect } from "react";
import Styled from "./Questions.module.css";

const timerSound = new Audio("/.Musics/timer.mp3");
const correctSound = new Audio("./Musics/correct.mp3");
const wrongSound = new Audio("./Musics/wrong.mp3");
const newQuestionSound = new Audio("./Musics/newquestion.mp3");
const winSound = new Audio("./Musics/7c.mp3");

import winnerImage from "/Images/img_winner.png";

const quizQuestions = [
  {
    question: "International Literacy Day is observed on ?",
    options: [
      { value: "A", text: "Sept 8" },
      { value: "B", text: "Nov 28" },
      { value: "C", text: "May 2" },
      { value: "D", text: "Sept 22" },
    ],
    correctAnswer: "A",
  },
  {
    question: "The language of Lakshadweep, a Union Territory of India, is ",
    options: [
      { value: "A", text: "Tamil" },
      { value: "B", text: "Hindi" },
      { value: "C", text: "Malayalam" },
      { value: "D", text: "Telugu" },
    ],
    correctAnswer: "C",
  },
  {
    question:
      "In which group of places the Kumbha Mela is held every twelve years ? ",
    options: [
      { value: "A", text: "Ujjain, Puri, Prayag, Haridwar" },
      { value: "B", text: "Prayag, Haridwar, Ujjain, Nasik" },
      { value: "C", text: "Rameshwaram, Puri, Badrinath, Dwarika" },
      { value: "D", text: "Chittakoot, Ujjain, Prayag, Haridwar" },
    ],
    correctAnswer: "B",
  },
  {
    question: "Bahubali festival is related to ",
    options: [
      { value: "A", text: "Islam" },
      { value: "B", text: "Hinduism" },
      { value: "C", text: "Buddhism" },
      { value: "D", text: "Jainism" },
    ],
    correctAnswer: "D",
  },
  {
    question: "September 27 is celebrated every year as ",
    options: [
      { value: "A", text: "Teachers' Day" },
      { value: "B", text: "National Integration Day" },
      { value: "C", text: "World Tourism Day" },
      { value: "D", text: "International Literacy Day" },
    ],
    correctAnswer: "C",
  },
  {
    question:
      "The death anniversary of which of the following leaders is observed as Martyrs' Day ? ",
    options: [
      { value: "A", text: "Smt. Indira Gandhi" },
      { value: "B", text: "PT. Jawaharlal Nehru" },
      { value: "C", text: "Mahatma Gandhi" },
      { value: "D", text: "Lal Bahadur Shastri" },
    ],
    correctAnswer: "C",
  },
  {
    question: "'Good Friday' is observed to commemorate the event of ",
    options: [
      { value: "A", text: "birth of Jesus Christ" },
      { value: "B", text: "crucification of Jesus Christ" },
      { value: "C", text: "birth of St. Peter" },
      { value: "D", text: "rebirth of Jesus Christ" },
    ],
    correctAnswer: "B",
  },
  {
    question: "Which of the following is observed as Sports Day every year ? ",
    options: [
      { value: "A", text: "29th August" },
      { value: "B", text: "22nd April" },
      { value: "C", text: "26th July" },
      { value: "D", text: "2nd October" },
    ],
    correctAnswer: "A",
  },
  {
    question: "Pongal is a popular festival of which state ? ",
    options: [
      { value: "A", text: "Karnataka" },
      { value: "B", text: "Kerala" },
      { value: "C", text: "Tamil Nadu" },
      { value: "D", text: "Andhra Pradesh" },
    ],
    correctAnswer: "C",
  },
  {
    question: ". Ghototkach in Mahabharat was the son of",
    options: [
      { value: "A", text: "Duryodhana" },
      { value: "B", text: "Arjuna" },
      { value: "C", text: "Yudhishthir" },
      { value: "D", text: "Bhima" },
    ],
    correctAnswer: "D",
  },
];
function Questions({ onFail }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(50);
  const [isTimeOut, setIsTimeOut] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [messageTimeoutId, setMessageTimeoutId] = useState(null);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  useEffect(() => {
    newQuestionSound.play().catch((error) => {
      console.log("Audio autoplay blocked:", error);
    });

    resetTimer();

    return () => {
      clearTimer();
    };
  }, [currentQuestionIndex]);

  const clearTimer = () => {
    clearInterval(window.quizTimerId);
    timerSound.pause();
    timerSound.currentTime = 0;
  };

  const resetTimer = () => {
    setTimer(50);
    setIsTimeOut(false);
    setIsCorrectAnswer(false);

    timerSound.loop = true;
    timerSound.play().catch((error) => {
      console.log("Audio autoplay blocked:", error);
    });

    clearTimer();

    window.quizTimerId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearTimer();
          setIsTimeOut(true);
          handleSubmit();
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const handleOptionClick = (selectedOption) => {
    if (!isSubmitted) {
      setSelectedAnswer(selectedOption);
    }
  };

  const handleSubmit = () => {
    if (isTimeOut) {
      wrongSound.play();
      alert("Time's up! You failed. Restarting...");
      onFail();
      return;
    }

    clearTimer();

    if (selectedAnswer === currentQuestion.correctAnswer) {
      correctSound.play();
      setScore((prevScore) => prevScore + 1);
      setIsSubmitted(true);
      setIsCorrectAnswer(true);

      if (messageTimeoutId) {
        clearTimeout(messageTimeoutId);
      }

      const timeoutId = setTimeout(() => {
        handleNext();
      }, 5000);

      setMessageTimeoutId(timeoutId);

      if (score + 1 === quizQuestions.length) {
        winSound.play().catch((error) => {
          console.log("Audio autoplay blocked:", error);
        });
        alert("Congratulations! You answered all questions correctly.");
      }
    } else {
      wrongSound.play();
      alert("Wrong Answer");
      onFail();
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
      resetTimer();
    }
  };

  return (
    <div className={Styled.quizContainer}>
      <h1>Interactive Quiz</h1>
      {!isSubmitted && (
        <div className={Styled.question}>
          <p>
            {currentQuestionIndex + 1}. {currentQuestion.question}
          </p>
          <div className={Styled.options}>
            {currentQuestion.options.map((option) => (
              <div
                key={option.value}
                className={`${Styled.option} ${
                  selectedAnswer === option.value ? Styled.selected : ""
                } ${
                  isSubmitted
                    ? option.value === currentQuestion.correctAnswer
                      ? Styled.correct
                      : selectedAnswer === option.value
                      ? Styled.wrong
                      : ""
                    : ""
                }`}
                data-label={option.value}
                onClick={() => handleOptionClick(option.value)}
              >
                {option.text}
              </div>
            ))}
          </div>
          <div className={Styled.timer}>Time left: {timer} seconds</div>
          <div className={Styled.buttons}>
            <button
              className={Styled.submitBtn}
              onClick={handleSubmit}
              disabled={isTimeOut}
            >
              {currentQuestionIndex < quizQuestions.length - 1
                ? "Submit"
                : "Finish"}
            </button>
            {isSubmitted && currentQuestionIndex < quizQuestions.length - 1 && (
              <button className={Styled.nextBtn} onClick={handleNext}>
                Next
              </button>
            )}
          </div>
        </div>
      )}
      {isSubmitted && currentQuestionIndex === quizQuestions.length - 1 && (
        <div className={Styled.result}>
          <h2>Quiz Completed!</h2>
          <p>
            You scored {score} out of {quizQuestions.length}!
          </p>
          {score === quizQuestions.length && (
            <div className={Styled.winner}>
              <img src={winnerImage} alt="Congratulations!" />
              <h2>YOU WON!</h2>
            </div>
          )}
        </div>
      )}
      {isSubmitted && !isTimeOut && (
        <div className={Styled.correctMessage}>
          <h2>Correct Answer!</h2>
          <p>
            The correct answer was:{" "}
            {
              currentQuestion.options.find(
                (option) => option.value === currentQuestion.correctAnswer
              ).text
            }
          </p>
        </div>
      )}
    </div>
  );
}

export default Questions;
