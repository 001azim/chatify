import { gql } from "@apollo/client";

export const MSG_SUB=gql`

subscription Subscription {
    MessageAdded {
      id
      createdAt
      senderId
      text
      receiverId
    }
  }

`