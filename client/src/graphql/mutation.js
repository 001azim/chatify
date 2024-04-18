
import { gql } from "@apollo/client";

export const SIGN_UP=gql`
mutation SignupUser($userNew: UserInput!) {
    signupUser(UserNew: $userNew) {
     first_name
     last_name
     email
     id
    }
  }

`

export const LOGIN=gql`
mutation SigninUser($login: loginInput) {
    signinUser(login: $login) {
      token
    }
  }
  

`
export const SEND_MSG=gql`
mutation CreateMessage($receiverId: Int!, $text: String!) {
  createMessage(receiverId: $receiverId, text: $text) {
    id
    text
    receiverId
    senderId
    createdAt
  }
}
`