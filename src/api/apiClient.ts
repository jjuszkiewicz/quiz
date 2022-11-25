import questions from "./questions.json";
import answers from "./answers.json";
import { Answer, Question } from "../features/interfaces/questions";

const apiClientFactory = () => {
  return {
    fetchQuestion: (): Question[] => questions,
    fetchAnswers: (): Answer[] => answers,
  };
};

export const apiClient = apiClientFactory();
