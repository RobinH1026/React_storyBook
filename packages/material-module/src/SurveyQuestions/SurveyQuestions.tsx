import React, { MouseEvent, ChangeEvent, FC, useState, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, DragDropContextProps, Draggable, Droppable, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import Question from './Question';
import QuestionEditable, { OptionType, QuestionEditableProps } from './QuestionEditable';
import { Question as QuestionTyping, QuestionType, Option } from '../Survey/types';
import SurveyContext from '../Survey/SurveyContext';

export interface SurveyQuestionsProps {
  droppableId: string,
  optionTypes?: OptionType[];
  onDragEnd?: (result: DropResult, provided: ResponderProvided, nextQuestions: QuestionTyping[]) => void,
  onNameChange?: QuestionEditableProps["onNameChange"]
  onTypeChange?: (e: ChangeEvent<HTMLInputElement>, question: QuestionTyping, nextQuestion: QuestionTyping, createdOption?: Option) => void
  onDescChange?: QuestionEditableProps["onDescChange"]
  onRequiredChange?: QuestionEditableProps["onRequiredChange"]
  onDelete?: QuestionEditableProps["onDelete"]
  onOptionChange?: (e: ChangeEvent<HTMLInputElement>, question: QuestionTyping, option: Option, nextOption: Option) => void
  onOptionDelete?: QuestionEditableProps["onOptionDelete"]
  onOptionDragEnd?: QuestionEditableProps["onOptionDragEnd"]
  onOptionCreate?: (e: MouseEvent<HTMLSpanElement>, question: QuestionTyping, index: number, createdOption?: Option) => void
  onOptionCreateOther?: (e: MouseEvent<HTMLButtonElement>, question: QuestionTyping, createdOption?: Option) => void
  onRatingStartChange?: QuestionEditableProps["onRatingStartChange"]
  onRatingEndChange?: QuestionEditableProps["onRatingEndChange"]
  onRatingStartInputChange?: QuestionEditableProps["onRatingStartInputChange"]
  onRatingEndInputChange?: QuestionEditableProps["onRatingEndInputChange"]
}

const SurveyQuestions: FC<SurveyQuestionsProps> = ({
  onDragEnd,
  droppableId,
  optionTypes,
  onNameChange,
  onTypeChange,
  onDescChange,
  onRequiredChange,
  onDelete,
  onOptionChange,
  onOptionDelete,
  onOptionDragEnd,
  onOptionCreate,
  onOptionCreateOther,
  onRatingStartChange,
  onRatingEndChange,
  onRatingStartInputChange,
  onRatingEndInputChange,
}) => {
  const { questions, setQuestions, selectedQuestionId, setSelectedQuestionId } = useContext(SurveyContext);
  const [autoFocusIndex, setAutoFocusIndex] = useState(0)
  const [autoFocusName, setAutoFocusName] = useState(false)
  
  const handleDragEnd: DragDropContextProps["onDragEnd"] = (result, provided) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    if (!questions) return;
    const sourceQuestion = questions[source.index];
    if (!sourceQuestion) return
    const nextQuestions = [...questions];
    nextQuestions.splice(source.index, 1);
    nextQuestions.splice(destination.index, 0, sourceQuestion);
    setQuestions(nextQuestions);

    if (onDragEnd) {
      onDragEnd(result, provided, nextQuestions)
    }
  };

  const handleNameChange: QuestionEditableProps["onNameChange"] = (event, question) => {
    const nextQuestions = questions.map(el => {
      if (el.questionId === question.questionId) {
        return {
          ...el,
          questionName: event.target.value,
        }
      }
      return el
    })
    setQuestions(nextQuestions)

    if (onNameChange) {
      onNameChange(event, question)
    }
  };

  const handleTypeChange: QuestionEditableProps["onTypeChange"] = (event, question) => {
    const nextQuestionType = event.target.value as QuestionType;
    let questionRatingEndValue: number;
    let questionRatingStartValue: number;
    const shouldCreateOneOption = (nextQuestionType === 'choicemulti' || nextQuestionType === 'choiceone' || nextQuestionType === 'select') && (!question.optionList || question.optionList.length === 0)

    if (nextQuestionType === 'rating') {
      questionRatingStartValue = 1;
      questionRatingEndValue = 5;
    }
    let nextQuestion: QuestionTyping = { ...question };
    let createdOption: Option | undefined
    const nextQuestions = questions.map(el => {
      if (el.questionId === question.questionId) {
        createdOption = {
          optionId: uuidv4(),
          optionName: '選項 1',
          isOther: 0
        }
        const result = {
          ...el,
          questionType: nextQuestionType,
          optionList: shouldCreateOneOption ? [createdOption] : el.optionList,
          questionRatingEndValue,
          questionRatingStartValue,
        }
        nextQuestion = { ...result }
        return result
      }
      return el
    })
    setQuestions(nextQuestions)
    if (onTypeChange) {
      onTypeChange(event, question, nextQuestion, shouldCreateOneOption ? createdOption : undefined)
    }
  }

  const handleDescChange: QuestionEditableProps["onDescChange"] = (event, question) => {
    const nextQuestions = questions.map(el => {
      if (el.questionId === question.questionId) {
        return {
          ...el,
          questionDescription: event.target.value,
        }
      }
      return el
    })
    setQuestions(nextQuestions)

    if (onDescChange) {
      onDescChange(event, question)
    }
  };

  const handleIsRequiredChange: QuestionEditableProps["onRequiredChange"] = (event, question) => {
    const nextQuestions = questions.map(el => {
      if (el.questionId === question.questionId) {
        return {
          ...el,
          isRequired: Number(event.target.checked)
        }
      }
      return el
    })
    setQuestions(nextQuestions)
    if (onRequiredChange) {
      onRequiredChange(event, question)
    }
  };

  const handleDelete: QuestionEditableProps["onDelete"] = (event, question) => {
    const nextQuestions = questions.filter(el => el.questionId !== question.questionId)
    setQuestions(nextQuestions)
    if (onDelete) {
      onDelete(event, question)
    }
  };

  const handleOptionChange: QuestionEditableProps["onOptionChange"] = (event, question, option) => {
    let nextOption: Option = { ...option };
    const nextQuestions = questions.map(el => {
      if (el.questionId === question.questionId) {
        return {
          ...el,
          optionList: el.optionList?.map(opt => {
            if (opt.optionId === option.optionId) {
              const result = {
                ...opt,
                optionName: event.target.value,
              }
              nextOption = { ...result }
              return result
            }
            return opt
          })
        }
      }
      return el
    })
    setQuestions(nextQuestions)

    if (onOptionChange) {
      onOptionChange(event, question, option, nextOption)
    }
  };

  const handleOptionDelete: QuestionEditableProps["onOptionDelete"] = (event, question, deletedOption) => {
    const nextQuestions = questions.map(el => {
      if (el.questionId === question.questionId) {
        return {
          ...el,
          optionList: el.optionList?.filter(opt => opt.optionId !== deletedOption.optionId)
        }
      }
      return el
    })
    setQuestions(nextQuestions)

    if (onOptionDelete) {
      onOptionDelete(event, question, deletedOption)
    }
  }

  const handleOptionDragEnd: QuestionEditableProps["onOptionDragEnd"] = (result, question, options) => {
    const nextQuestions = questions.map(el => {
      if (el.questionId === question.questionId) {
        return {
          ...el,
          optionList: options
        }
      }
      return el
    })
    setQuestions(nextQuestions)

    if (onOptionDragEnd) {
      onOptionDragEnd(result, question, options)
    }
  };

  const handleOptionCreate: QuestionEditableProps["onOptionCreate"] = (e, question, index) => {
    let createdOption: Option | undefined
    const nextQuestions = questions.map(el => {
      if (el.questionId === question.questionId && el.optionList) {
        createdOption = {
          optionId: uuidv4(),
          optionName: `選項 ${index}`,
          isOther: 0
        }
        return {
          ...el,
          optionList: [...el.optionList, createdOption]
        }
      }
      return el
    })
    setQuestions(nextQuestions)

    if (onOptionCreate) {
      onOptionCreate(e, question, index, createdOption)
    }
  };

  const handleOptionCreateOther: QuestionEditableProps["onOptionCreateOther"] = (e, question) => {
    let createdOption: Option | undefined
    const nextQuestions = questions.map(el => {
      if (el.questionId === question.questionId && el.optionList) {
        createdOption = {
          optionId: uuidv4(),
          optionName: '其他...',
          isOther: 1
        }
        return {
          ...el,
          optionList: [...el.optionList, createdOption]
        }
      }
      return el
    })
    setQuestions(nextQuestions)

    if (onOptionCreateOther) {
      onOptionCreateOther(e, question, createdOption)
    }
  };

  const handleRatingStartChange: QuestionEditableProps["onRatingStartChange"] = (e, question) => {
    const nextQuestions = questions.map(el => {
      if (el.questionId === question.questionId) {
        return {
          ...el,
          questionRatingStartValue: e.target.value as number,
        }
      }
      return el
    })
    setQuestions(nextQuestions)

    if (onRatingStartChange) {
      onRatingStartChange(e, question)
    }
  };

  const handleRatingEndChange: QuestionEditableProps["onRatingEndChange"] = (e, question) => {
    const nextQuestions = questions.map(el => {
      if (el.questionId === question.questionId) {
        return {
          ...el,
          questionRatingEndValue: e.target.value as number,
        }
      }
      return el
    })
    setQuestions(nextQuestions)

    if (onRatingEndChange) {
      onRatingEndChange(e, question)
    }
  };

  const handleRatingStartInputChange: QuestionEditableProps["onRatingStartInputChange"] = (e, question) => {
    const nextQuestions = questions.map(el => {
      if (el.questionId === question.questionId) {
        return {
          ...el,
          questionRatingStartName: e.target.value as string,
        }
      }
      return el
    })
    setQuestions(nextQuestions)

    if (onRatingStartInputChange) {
      onRatingStartInputChange(e, question)
    }
  };

  const handleRatingEndInputChange: QuestionEditableProps["onRatingEndInputChange"] = (e, question) => {
    const nextQuestions = questions.map(el => {
      if (el.questionId === question.questionId) {
        return {
          ...el,
          questionRatingEndName: e.target.value as string,
        }
      }
      return el
    })
    setQuestions(nextQuestions)

    if (onRatingEndInputChange) {
      onRatingEndInputChange(e, question)
    }
  };
  
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId={droppableId}>
        {(dropProvided) => (
          <div {...dropProvided.droppableProps}>
            <div ref={dropProvided.innerRef}>
              {questions.map((question, index) => (
                <Draggable
                  draggableId={question.questionId}
                  key={question.questionId}
                  index={index}
                >
                  {(dragProvided) => (
                    <div
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                    >
                      {question.questionId === selectedQuestionId ? (
                        <QuestionEditable
                          DragHandleProps={dragProvided.dragHandleProps}
                          question={question}
                          onNameChange={handleNameChange}
                          onTypeChange={handleTypeChange}
                          onDescChange={handleDescChange}
                          onRequiredChange={handleIsRequiredChange}
                          onDelete={handleDelete}
                          onOptionChange={handleOptionChange}
                          onOptionDelete={handleOptionDelete}
                          onOptionDragEnd={handleOptionDragEnd}
                          onOptionCreate={handleOptionCreate}
                          onOptionCreateOther={handleOptionCreateOther}
                          onRatingStartChange={handleRatingStartChange}
                          onRatingEndChange={handleRatingEndChange}
                          onRatingStartInputChange={handleRatingStartInputChange}
                          onRatingEndInputChange={handleRatingEndInputChange}
                          autoFocusOptionIndex={autoFocusIndex}
                          autoFocusName={autoFocusName}
                          optionTypes={optionTypes}
                        />
                      ) : (
                        <Question
                          DragHandleProps={dragProvided.dragHandleProps}
                          onClick={() =>
                            setSelectedQuestionId(question.questionId)
                          }
                          question={question}
                          onOptionClick={(el, opt, index) => {
                            setAutoFocusName(false)
                            setAutoFocusIndex(index)
                          }}
                          onQuestionNameClick={() => {
                            setAutoFocusName(true)
                          }}
                        />
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {dropProvided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default SurveyQuestions
