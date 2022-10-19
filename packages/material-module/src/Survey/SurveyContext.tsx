import { createContext, SetStateAction } from 'react';
import { Question } from './types';

export type SurveyContextProps = {
  /**
   * Quesitons data.
   */
  questions: Question[]
  /**
   * Set questions data.
   */
  setQuestions: (value: SetStateAction<Question[]>) => void
  /**
   * selected questionId
   */
  selectedQuestionId?: string
  /**
   * set selected questionId
   */
  setSelectedQuestionId: (value: SetStateAction<string | undefined>) => void
};

const SurveyContext = createContext<SurveyContextProps>({
  questions: [],
  setQuestions: () => {},
  setSelectedQuestionId: () => {}
});

export default SurveyContext;
