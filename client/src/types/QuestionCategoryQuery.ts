/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QuestionCategoryQuery
// ====================================================

export interface QuestionCategoryQuery_questionCategory {
  __typename: "QuestionCategory";
  id: string;
  title: string;
}

export interface QuestionCategoryQuery {
  questionCategory: QuestionCategoryQuery_questionCategory;
}

export interface QuestionCategoryQueryVariables {
  id: string;
}
