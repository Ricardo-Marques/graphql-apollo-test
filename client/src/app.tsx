import * as React from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

import { QuestionCategoriesQuery } from './types/QuestionCategoriesQuery'

import {
  QuestionCategoryQuery,
  QuestionCategoryQueryVariables
} from './types/QuestionCategoryQuery'

const QUESTION_CATEGORIES_QUERY = gql`
  query QuestionCategoriesQuery {
    questionCategories {
      id
      title
    }
  }
`

export default function QuestionCategoriesList() {
  return (
    <Query<QuestionCategoriesQuery> query={QUESTION_CATEGORIES_QUERY}>
      {({ data, loading }) => {
        if (loading) {
          return <div>Loading categories...</div>
        }

        if (data) {
          return data.questionCategories.map(({ id }) => (
            <QuestionCategory key={id} id={id} />
          ))
        }

        return null
      }}
    </Query>
  )
}

/**
 * It's overkill to re-request based on id
 * when I could've simply just asked for the
 * entire questionCategory in the component above,
 * but I wanted to test variables.
 */
const QUESTION_CATEGORY_QUERY = gql`
  query QuestionCategoryQuery($id: ID!) {
    questionCategory(id: $id) {
      id
      title
    }
  }
`

export function QuestionCategory(props: QuestionCategoryQueryVariables) {
  return (
    <Query<QuestionCategoryQuery, QuestionCategoryQueryVariables>
      query={QUESTION_CATEGORY_QUERY}
      variables={props}
    >
      {({ data, loading }) => {
        if (loading) {
          return <div>Loading category...</div>
        }

        if (data) {
          return <div>{data.questionCategory.title}</div>
        }

        return null
      }}
    </Query>
  )
}
