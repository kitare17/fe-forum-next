export interface AnswerInterface {
  answerName: string;
  isAnswer: boolean;
}

export interface QuestionInterface {
  name: string;
  answers: AnswerInterface[];
}

export interface QuizInterface {
  deckName?: string;
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
  questions: QuestionInterface[]; // Array of QuestionInterface
  deck: DeckInterface; // Assuming deckId should be replaced with the entire DeckInterface
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TestInterfaceRequest {
  testOwner: string;
  deckId: string;
  score: number;
  numberCorrectAnswer: number;
  totalQuestionTest: number;
  durationInMinutes: number;
}

export interface QuestionRequest {
  deck: string;
  answers: AnswerInterface[];
  name: string;
}

export interface QuestionResponse {
    _id: string;
    name: string;
    answers: AnswerInterface[];
    deck: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface AnswerResponse {
    _id: string;
    answerName: string;
    isAnswer: boolean;
}

export interface TestResponse {
    _id: string;
    testOwner: string;
    deckId: DeckInterface;
    score: number;
    numberCorrectAnswer: number;
    totalQuestionTest: number;
    durationInMinutes: number;
    createdAt: string; // Alternatively, you can use Date type if you will parse it into Date object
    updatedAt: string; // Alternatively, you can use Date type if you will parse it into Date object
    __v: number;
}
