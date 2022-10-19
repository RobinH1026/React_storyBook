export type QuestionType =
  | 'text'
  | 'textarea'
  | 'choiceone'
  | 'choicemulti'
  | 'select'
  | 'email'
  | 'date'
  | 'titleBlock'
  | 'rating';

export type QuestionOptionType = 'radio' | 'checkbox' | 'select';

export interface Option {
  optionId: string;
  optionName: string;
  isOther: number;
}

export interface Question {
  questionId: string;
  questionName?: string;
  questionType: QuestionType;
  questionDescription?: string;
  questionNo?: number;
  isRequired?: number;
  optionList?: Option[];
  questionRatingStartValue?: number;
  questionRatingEndValue?: number;
  questionRatingStartName?: string;
  questionRatingEndName?: string;
}