import { gql } from "graphql-tag";

export default gql`
  type Student {
    _id: ID!
    regno: String!
    name: String!
    marks: [Mark!]!
  }

  type Mark {
    _id: ID!
    mid: Int!
    regno: String!
    hid: Int!
    marks: Float!
  }

  type Query {
    students: [Student!]!
    marks: [Mark!]!
    student(regno: String!): Student
  }

  type Mutation {
    updateMark(regno: String!, hid: Int!, mark: Float!): Mark
  }

  type Subscription {
    marksUpdated: Mark
  }

`;
