import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { apiClient } from "../../api/apiClient";
import { Answer, Question } from "../interfaces/questions";

type QuestionsContextValue = {
  answers: Answer[];
  addAnswer: (answer: Answer) => void;
  isNextQuestion: () => boolean;
  currentQuestion: () => Question | undefined;
  isQuizDone: () => boolean;
};

export const QuestionsContext = createContext<QuestionsContextValue>({
  answers: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addAnswer: (answer: Answer) => {},
  isNextQuestion: () => false,
  currentQuestion: () => undefined,
  isQuizDone: () => false,
});

export const QuestionsContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [questions, setQuestion] = useState<Question[]>([]);
  const [currentQuestionNr, setCurrentQuestionNr] = useState<number>(1);
  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    const questionsResult = apiClient.fetchQuestion();
    setQuestion(questionsResult);
  }, []);

  const addAnswer = useCallback(
    (answer: Answer) => {
      setAnswers((currentAnswers) => {
        const newAnswers = [...currentAnswers];
        newAnswers.push(answer);
        return newAnswers;
      });
      setCurrentQuestionNr((prevQuestionNr) => prevQuestionNr + 1);
    },
    [setAnswers, setCurrentQuestionNr]
  );

  const isNextQuestion = useCallback(() => {
    return questions.length > currentQuestionNr;
  }, [questions, currentQuestionNr]);

  const currentQuestion = useCallback(() => {
    if (questions.length < currentQuestionNr) {
      return undefined;
    }

    return questions[currentQuestionNr - 1];
  }, [questions, currentQuestionNr]);

  const isQuizDone = useCallback(() => {
    return questions.length === answers.length;
  }, [questions, answers]);

  return (
    <QuestionsContext.Provider
      value={{
        answers,
        addAnswer,
        isNextQuestion,
        currentQuestion,
        isQuizDone,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};
