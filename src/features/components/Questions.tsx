import { useContext } from "react";
import { QuestionsContext } from "../context/QuestionsContext";
import { Question } from "./Question";
import { QuizResult } from "./QuizResult";

export const Questions = () => {
  const { currentQuestion, isQuizDone } = useContext(QuestionsContext);
  const question = currentQuestion();

  if (isQuizDone()) {
    return <QuizResult />;
  }
  return question ? <Question question={question} /> : <div>Loading</div>;
};
