import { FC, useContext, useEffect, useMemo, useState } from "react";
import { apiClient } from "../../api/apiClient";
import { QuestionsContext } from "../context/QuestionsContext";
import { convertResultToString } from "../utils/resultUtil";

export const QuizResult: FC = () => {
  const { answers: userAnswers } = useContext(QuestionsContext);
  const [score, setScore] = useState<number>();

  const scoreAsString = useMemo<string>(() => {
    if (typeof score === "undefined") {
      return "loading...";
    }
    return convertResultToString(score);
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
