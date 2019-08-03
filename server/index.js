const { ApolloServer, gql } = require('apollo-server')
const db = require('./db.json')

const questions = db
// removes duplicate categories
const questionCategoryIds = Array.from(
  new Set(db.map(question => question.category.id))
)
const questionCategories = questionCategoryIds.map(
  id => db.find(question => question.category.id === id).category
)

const typeDefs = gql`
  type QuestionCategory {
    id: ID!
    title: String!
  }

  type Question {
    id: ID!
    answer: String!
    question: String!
    airdate: String!
    category: QuestionCategory!
  }

  type Query {
    questions: [Question!]!
    question(id: ID!): Question!
    questionCategories: [QuestionCategory!]!
    questionCategory(id: ID!): QuestionCategory!
  }
`

function byId(id) {
  return el => String(el.id) === String(id)
}

const resolvers = {
  Query: {
    questions() {
      return questions
    },
    question(_, { id }) {
      return questions.find(byId(id))
    },
    questionCategories() {
      return questionCategories
    },
    questionCategory(_, { id }) {
      return questionCategories.find(byId(id))
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
