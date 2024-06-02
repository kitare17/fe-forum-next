export interface AnswerInterface {
  answerName: string;
  isAnswer: boolean;
}

export interface QuestionInterface {
  name: string;
  answers: AnswerInterface[];
}

export interface QuizInterface {
  questions: QuestionInterface[];
  deckId: string;
  deckName: string;
  regionType: string;
  deckOwner: string;
}
