import { FC, useContext, useEffect, useMemo, useState } from "react";
import { apiClient } from "../../api/apiClient";
import { QuestionsContext } from "../context/QuestionsContext";

export const QuizResult: FC = () => {
  const { answers: userAnswers } = useContext(QuestionsContext);
  const [score, setScore] = useState<number>();

  const scoreAsString = useMemo<string>(() => {
    if (typeof score === "undefined") {
      return "loading...";
    }
    if (score <= 40) {
      return "Diligent failure";
    }
    if (score > 40 && score <= 60) {
      return "Failed";
    }
    if (score > 60 && score <= 80) {
      return "Good";
    }
    if (score > 80 && score <= 90) {
      return "Very good";
    }
    return "Excellent";
  }, [score]);

  useEffect(() => {
    const answersResult = apiClient.fetchAnswers();

    const correctAnswers = userAnswers.reduce<number>((result, userAnswer) => {
      const answer = answersResult.find(
        (answer) => userAnswer.questionId === answer.questionId
      );
      return userAnswer.optionId === answer?.optionId ? result + 1 : result;
    }, 0);

    const result = Math.round((correctAnswers / answersResult.length) * 100);

    setScore(result);
  }, []);
  return (
    <div>
      Result: <strong>{scoreAsString}</strong>
    </div>
  );
};
