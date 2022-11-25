import { FC, useCallback, useContext, useState } from "react";
import { QuestionsContext } from "../context/QuestionsContext";
import { Question as QuestionType } from "../interfaces/questions";
import style from "./Question.module.css";

type QuestionProps = {
  question: QuestionType;
};
export const Question: FC<QuestionProps> = ({ question }) => {
  const [value, setValue] = useState<number>();

  const { addAnswer, isNextQuestion } = useContext(QuestionsContext);

  const onAddAnswer = useCallback(() => {
    if (value) {
      addAnswer({ optionId: value, questionId: question.id });
    }
  }, [addAnswer, value]);

  const onSetValue = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setValue(Number(e.currentTarget.value));
    },
    [setValue]
  );

  return (
    <div>
      <strong>{question.task}</strong>
      <ul className={style["question"]}>
        {question.options.map((option) => (
          <li className={style["question__option"]} key={option.id}>
            <label>
              <input
                name="answer"
                type="radio"
                onChange={(e) => onSetValue(e)}
                value={option.id}
              />
              {option.value}
            </label>
          </li>
        ))}
      </ul>
      <button disabled={typeof value === "undefined"}  onClick={() => onAddAnswer()}>
        {isNextQuestion() ? "Next" : "Finish"}
      </button>
    </div>
  );
};
