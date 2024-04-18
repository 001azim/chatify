import { gql } from "@apollo/client";

export const GET_ALL_USERS=gql`


query Getusers {
    getusers {
      last_name
      first_name
      id
    }
  }
`
export const GET_MSG=gql`
query ViewMessages($receiverId: Int!) {
    viewMessages(receiverId: $receiverId) {
      text
      senderId
      receiverId
      id
      createdAt
    }
  }
`