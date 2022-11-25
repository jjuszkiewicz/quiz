import { FC } from "react";
import { Questions } from "../components/Questions";
import { QuestionsContextProvider } from "../context/QuestionsContext";
import style from "./Quiz.module.css";

const Quiz: FC = () => {
  return (
    <QuestionsContextProvider>
      <main className={style.quiz}>
        <h1>Quiz</h1>
        <section>
          <Questions />
        </section>
      </main>
    </QuestionsContextProvider>
  );
};

export default Quiz;
