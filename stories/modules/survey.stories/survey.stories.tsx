import React, { FC, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Meta } from "@storybook/react";
import Survey from "@eGroupAI/material-module/Survey";
import SurveyBoby from "@eGroupAI/material-module/SurveyBoby";
import SurveyQuestions from "@eGroupAI/material-module/SurveyQuestions";
import Button from "@eGroupAI/material/Button";
import SurveyActions from "@eGroupAI/material-module/SurveyActions";
import Icomoon from "@eGroupAI/material/Icomoon";
import data from "./data";

export default {
  title: "Modules/Survey",
  component: Survey,
} as Meta;

export const Default: FC = () => {
  const [questions, setQuestions] = useState(data);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>();
  const handleCreateQuestion = () => {
    const questionId = uuidv4();
    setSelectedQuestionId(questionId);
    setQuestions((val) => [
      ...val,
      {
        questionId,
        questionType: "text",
        questionNo: questions.length + 1,
      },
    ]);
  };

  return (
    <Survey
      data={questions}
      onChange={(questions) => {
        setQuestions(questions);
      }}
      selectedQuestionId={selectedQuestionId}
    >
      <SurveyBoby>
        <SurveyQuestions droppableId="abc" />
        <SurveyActions>
          <Button
            variant="contained"
            startIcon={<Icomoon type="add" />}
            onClick={handleCreateQuestion}
            rounded
            color="info"
            size="large"
          >
            新增問題
          </Button>
        </SurveyActions>
      </SurveyBoby>
    </Survey>
  );
};
