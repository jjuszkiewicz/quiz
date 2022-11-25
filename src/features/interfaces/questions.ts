export type Question = {
  id: number;
  task: string;
  options: QuestionOption[];
};

export type QuestionOption = {
  value: string;
  id: number;
};

export type Answer = {
  questionId: number;
  optionId: number;
};
