export interface AnswerInterface {
  answerName: string;
  isAnswer: boolean;
}

export interface QuestionInterface {
  name: string;
  answers: AnswerInterface[];
}

export interface QuizInterface {
  deckName: string;
  regionType: string;
  questions: QuestionInterface[];
  deckOwner?: string;
  deckId?: string; 
}


export interface DeckInterface {
  name?: string;
  regionType?: string;
  deckOwner?: string;
   createdAt?: string;
  updatedAt?: string;
  __v?: number;
  _id?: string;
}




export interface Answer {
    answerName: string;
    isAnswer: boolean;
    _id: string;
}

export interface Question {
    name: string;
    answers: Answer[];
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}



export interface FlashCardInterface {
    _id: string;
    questions: Question[]; // This should correctly represent the array of questions
    deckId: DeckInterface;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
